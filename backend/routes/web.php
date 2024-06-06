<?php

// use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/', function() {
    return view('welcome');
});

// use Illuminate\Http\Request;

/* Route::get('/token', function (Request $request) {
    $token = $request->session()->token();

    $token = csrf_token();
    return response()->json(['token' => $token]);
}); */

Route::get('/todos', [TodoController::class, 'getAll']);
Route::post('/todos', [TodoController::class, 'add'])
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'delete']);
