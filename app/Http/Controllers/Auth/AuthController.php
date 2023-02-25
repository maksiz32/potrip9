<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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

    public function register(Request $request)
    {
        $newUserData = $request->validate([
            'login' => 'required|string|unique:users,login',
            'register_variants_id' => 'required|integer',
            'first_name' => 'required|string',
            'users_role_id' => 'required|integer',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'login' => $newUserData['login'],
            'register_variants_id' => $newUserData['register_variants_id'],
            'first_name' => $newUserData['first_name'],
            'users_role_id' => $newUserData['users_role_id'],
            'email' => $newUserData['email'],
            'password' => bcrypt($newUserData['password']),
        ]);

        $token = $user->createToken('PoTripToken');

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $loginFields = $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('login', $loginFields['login'])->first();

        if (!$user || !Hash::check($loginFields['password'], $user->password)) {
            return response([
                'message' => 'Bad request',
            ], 401);
        }

        $token = $user->createToken('PoTripToken');

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out',
        ];
    }
}
