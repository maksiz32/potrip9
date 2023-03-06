<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Country;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
         'id' => 1,
         'register_variants_id' => 1,
         'login' => 'Maksim',
         'first_name' => fake()->firstName,
         'secondary_name' => fake()->lastName,
         'users_role_id' => 1,
         'email' => 'manzulin32@gmail.com',
         'city' => fake()->city,
         'password' => Hash::make('123456Qw'),
        ])
            ->tokens()->create([
                'tokenable_type' => User::class,
                'tokenable_id' => '1',
                'name' => 'PoTripToken',
                'token' => hash('sha256', 'N7fp6GTjO9CJD1QIhqv0Ty1ZZbJeS3tFIbToFJZQ'),
                'abilities' => ["*"],
            ]);

        User::factory(10)->create();

        Country::factory(10)->create();
    }
}
