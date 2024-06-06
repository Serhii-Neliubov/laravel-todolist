<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['title', 'description', 'state'];
}
