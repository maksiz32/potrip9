<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Password;

use function PHPUnit\Framework\returnValue;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(
            User::query()
            ->orderBy('id', 'desc')
            ->paginate(10)
        );
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
     * @param User $user
     * @return UserResource
     */
    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     * @return UserResource
     */
    public function update(Request $request, User $user): UserResource
    {
        $updatedUser = $request->validate([
            'login' => 'sometimes|required|string|min:3|max:55|unique:users,login',
            'first_name' => 'string|min:2',
            'email' => 'email|unique:users,email,' . $this->id,
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
        $user->update($updatedUser);

        return new UserResource($user);
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
}
