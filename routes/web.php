<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AdminController;
use App\Http\Controllers\Auth\AuthController;

Route::get('/auth', [AuthController::class, 'index'])->name('login');
//
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/', function () {
        return view('welcome');
    });
});
//Route::get('/search', [])->name('object-search');


//Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {
//    Route::get('/', [AdminController::class, 'index'])
//        ->middleware('auth')
//        ->name('admin_panel');
//});
