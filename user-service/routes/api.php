<?php

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function (Request $request) {
    if (Auth::attempt($request->only(['email', 'password'])) === false) {
        return response()->json(['error' => __('Unauthorized')], 401);
    }

    /** @var \App\Models\User $user */
    $user = Auth::user();
    $token = $user->createToken('login');

    return response()->json([
        'token' => $token->plainTextToken,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ],
        'message' => __('Login successful')
    ]);
})->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/users', ClientController::class);
});

Route::get('/test', fn () => 'Ok')
    ->withoutMiddleware(ThrottleRequests::class . ':api');

