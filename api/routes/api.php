<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/boards', [BoardController::class, 'index']);
Route::post('/boards', [BoardController::class, 'store']);
Route::get('/boards/{boardId}', [BoardController::class, 'show']);
Route::delete('/boards/{boardId}', [BoardController::class, 'destroy']);

Route::get('/boards/{boardId}/tasks', [TaskController::class, 'index']);
Route::post('/boards/{boardId}/tasks', [TaskController::class, 'store']);
Route::patch('/tasks/{taskId}/status', [TaskController::class, 'updateStatus']);
