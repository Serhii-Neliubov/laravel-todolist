<?php

namespace App\Services;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodosService
{
    public function getAll()
    {
        try {
            return Todo::all();
        } catch (\Exception $e) {
            Log::error('Error fetching todos: ' . $e->getMessage());
            throw $e;
        }
    }

    public function add(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'state' => 'nullable|string',
        ]);

        try {
            return Todo::create($request->only(['title', 'description', 'state']));
        } catch (\Exception $e) {
            Log::error('Error adding todo: ' . $e->getMessage());
            throw $e;
        }
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'state' => 'nullable|string',
        ]);

        try {
            $todo = Todo::find($id);

            if ($todo) {
                $todo->update($request->only(['title', 'description', 'state']));
                return $todo;
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Error updating todo: ' . $e->getMessage());
            throw $e;
        }
    }

    public function delete($id)
    {
        try {
            $todo = Todo::find($id);
            if ($todo) {
                $todo->delete();
                return true;
            }

            return false;
        } catch (\Exception $e) {
            Log::error('Error deleting todo: ' . $e->getMessage());
            throw $e;
        }
    }

    public function search($value)
    {
        try {
            if ($value == '') {
                return Todo::all();
            }

            return Todo::where('title', 'like', '%' . $value . '%')->get();
        } catch (\Exception $e) {
            Log::error('Error searching todos: ' . $e->getMessage());
            throw $e;
        }
    }
}
