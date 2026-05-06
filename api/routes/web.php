<?php

use Illuminate\Support\Facades\Route;

Route::get('/api/mock-data', function () {
    return response()->json([
        'data' => [
            ['id' => 1, 'name' => 'Todo 1', 'role' => 'Frontend'],
            ['id' => 2, 'name' => 'Todo 2', 'role' => 'Backend'],
        ],
    ]);
});