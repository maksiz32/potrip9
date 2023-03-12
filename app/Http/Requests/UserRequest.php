<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'login' => 'required|string|unique:users,login|min:3|max:55',
            'register_variants_id' => 'integer',
            'first_name' => 'required|string|min:2',
            'users_role_id' => 'integer',
            'email' => 'required|string|unique:users,email|email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ]
        ];
    }
}
