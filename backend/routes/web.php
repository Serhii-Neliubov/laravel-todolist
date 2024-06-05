<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/todos', function () {
    return 'Todos';
});

Route::post('/todos', function () {
    return 'Todo created!';
});

Route::put('/todos/:id', function () {
    return 'Todo updated!';
});

Route::delete('/todos/:id', function () {
    return 'Todo deleted!';
});
