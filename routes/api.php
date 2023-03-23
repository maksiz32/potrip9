<?php

use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PointController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CountryApiController;
use Illuminate\Http\Request;

Route::post('/registrate', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
//    Route::post('/', [CountryApiController::class, 'index']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['prefix' => 'users'], function () {
//        Route::apiResource('/', UserController::class);
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        Route::post('/{id}/block', [UserController::class, 'blockUser']);
    });

    Route::group(['prefix' => 'points'], function () {
        Route::post('/', [PointController::class, 'index']);
    });

    Route::group(['prefix' => 'countries'], function () {
        Route::put('/', [CountryApiController::class, 'index']);
//        Route::get('/{id}', [CountryApiController::class, 'show']);
    });

    Route::group(['prefix' => 'locations'], function () {
        Route::get('/{id}', [LocationController::class, 'getAllByCountry']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
