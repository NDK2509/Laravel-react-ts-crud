<?php

use App\Http\Controllers\CatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("/cats")->group(function () {
    Route::get("", [CatController::class, "all"]);
    Route::get("/{id}", [CatController::class, "get"]);
    Route::post("", [CatController::class, "create"]);
    Route::put("/{id}", [CatController::class, "update"]);
    Route::delete("/{id}", [CatController::class, "delete"]);
});