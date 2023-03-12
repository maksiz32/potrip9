<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function index()
    {
        if (Auth::check()) {
            return redirect('/api/');
        }

        return view('auth.auth');
    }

    public function register(UserRequest $request)
    {
        $newUserData = $request->validated();

        /** @var User $user */
        $user = User::create([
            'login' => $newUserData['login'],
            'register_variants_id' => 1,
            'first_name' => $newUserData['first_name'],
            'users_role_id' => 1,
            'email' => $newUserData['email'],
            'password' => bcrypt($newUserData['password']),
        ]);

        $token = $user->createToken('PoTripToken')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(Request $request)
    {
        $loginFields = $request->validate([
            'login' => 'required|string|exists:users,login',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($loginFields)) {
            return response([
                'login' => 'Login or password is not correct',
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response([
                'login' => 'Login is not correct',
            ], 401);
        }

        if (!Hash::check($loginFields['password'], $user->password)) {
            return response([
                'password' => 'Password is not correct',
            ], 401);
        }

        $token = $user->createToken('PoTripToken')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('Log out', 204);
    }
}
