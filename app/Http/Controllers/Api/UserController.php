<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UsersRoleResource;
use App\Models\User;
use App\Models\UsersRole;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json(User::query()
                                    ->with('roles')
                                    ->orderBy('id', 'desc')
                                    ->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
     */
    public function store(UserRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
    {
        $newUserData = $request->validated();
        $newUserData['password'] = bcrypt($newUserData['password']);

        $newUser = User::create($newUserData);

        return response(UserResource::collection($newUser), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     */
    public function show(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric|exists:users,id'
        ]);

        if ($validated['id']) {
            $user = User::query()
                ->where('id', $validated['id'])
                ->first();

            return response()->json($user);
        }

        return response("User don't found", 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     */
    public function update(Request $request)
    {
        $updatedUser = $request->validate([
            'id' => 'numeric|exists:users,id',
            'login' => 'sometimes|required|string|min:3|max:55|unique:users,login',
            'first_name' => 'string|min:2',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($request->id),
            ],
            'password' => [
                  'confirmed',
                  Password::min(8)
                      ->letters()
                      ->symbols()
                ],
        ]);

        if (isset($updatedUser['password'])) {
            $updatedUser['password'] = bcrypt($updatedUser['password']);
        }

        /** @var User $user */
        $user = User::where('id', $updatedUser['id'])->limit(1)->first();
        $user->update($updatedUser);

        return response()->json(['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return Response
     */
    public function destroy(User $user): Response
    {
        $user->delete();

        return response('User successfully deleted', 204);
    }

    /**
     * @param int $id
     * @return Response
     */
    public function blockUser(int $id): Response
    {
        $userBlock = User::select('is_block')->where('id', $id)->first();
        if (!$userBlock) {
            return response("Bad request", 400);
        }

        $userBlock = !((bool) $userBlock->is_block);
        User::where('id', $id)->update([
            'is_block' => $userBlock,
        ]);

        return response("User access is changed", 201);
    }

    public function getUserRoles(): \Illuminate\Http\JsonResponse
    {
        return response()->json(UsersRoleResource::collection(UsersRole::all()));
    }

    public function storeUser(User $user)
    {
        //
    }
}
