<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function getAll()
    {
        $todos = Todo::all();

        return response()->json($todos);
    }

    public function add(Request $request)
    {
        $todo = Todo::create($request->only(['title', 'description', 'state']));
        return response()->json($todo);
    }

    public function update($id, Request $request)
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->update($request->only(['title', 'description', 'state']));
            return response()->json(['message' => 'Todo updated!', 'todo' => $todo]);
        } else {
            return response()->json(['message' => 'Todo not found!'], 404);
        }
    }

    public function delete($id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->delete();
            return response()->json(['message' => 'Todo deleted!']);
        } else {
            return response()->json(['message' => 'Todo not found!'], 404);
        }
    }

    public function search($value)
        {
            $todos = Todo::where('title', 'like', '%' . $value . '%')->get();
            return response()->json($todos);

            if($value == '') {
                $todos = Todo::all();
                return response()->json($todos);
            }
        }
}
