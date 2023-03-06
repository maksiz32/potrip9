<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory()->create([
             'id' => 1,
             'register_variants_id' => 1,
             'login' => 'Maksim',
             'first_name' => fake()->firstName,
             'secondary_name' => fake()->lastName,
             'users_role_id' => 1,
             'email' => 'manzulin32@gmail.com',
             'city' => fake()->city,
             'password' => Hash::make('123456Qw'),
         ]);

        \App\Models\User::factory(10)->create();
    }
}
