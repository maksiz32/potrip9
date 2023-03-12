<?php

use App\Http\Controllers\Api\PointController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CountryApiController;
use Illuminate\Http\Request;

Route::post('/registrate', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/', [CountryApiController::class, 'index']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'index']);
    });

    Route::group(['prefix' => 'points'], function () {
        Route::post('/', [PointController::class, 'index']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
