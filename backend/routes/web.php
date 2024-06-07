<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/todos', [TodoController::class, 'getAll']);
Route::post('/todos', [TodoController::class, 'add']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'delete']);
Route::get('/todos/search/{value}', [TodoController::class, 'search']);
