<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TodosService;

class TodoController extends Controller
{
    protected $todosService;

    public function __construct(TodosService $todosService)
    {
        $this->todosService = $todosService;
    }

    public function getAll()
    {
        $todos = $this->todosService->getAll();
        return response()->json($todos);
    }

    public function add(Request $request)
    {
        $todo = $this->todosService->add($request);
        return response()->json($todo);
    }

    public function update($id, Request $request)
    {
        $todo = $this->todosService->update($id, $request);

        if ($todo) {
            return response()->json(['message' => 'Todo updated!', 'todo' => $todo]);
        } else {
            return response()->json(['message' => 'Todo not found!'], 404);
        }
    }

    public function delete($id)
    {
        $deleted = $this->todosService->delete($id);

        if ($deleted) {
            return response()->json(['message' => 'Todo deleted!']);
        } else {
            return response()->json(['message' => 'Todo not found!'], 404);
        }
    }

    public function search($value)
    {
        $todos = $this->todosService->search($value);
        return response()->json($todos);
    }
}
