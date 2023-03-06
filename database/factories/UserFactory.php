<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'external_id' => fake()->numberBetween(1, 5),
            'register_variants_id' => fake()->numberBetween(1, 3),
            'login' => fake()->userName,
            'first_name' => fake()->firstName,
            'secondary_name' => fake()->lastName,
            'users_role_id' => fake()->numberBetween(2, 4),
            'email' => fake()->email,
            'city' => fake()->city,
            'password' => Hash::make('123'),
        ];
    }
}
