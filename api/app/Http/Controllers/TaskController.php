<?php

namespace App\Http\Controllers;

use App\Domain\Tasks\TaskRepository;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskStatusRequest;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskRepository $tasks,
    ) {
    }

    public function index(int $boardId): JsonResponse
    {
        return response()->json([
            'data' => $this->tasks->listByBoardId($boardId),
        ]);
    }

    public function store(int $boardId, CreateTaskRequest $request): JsonResponse
    {
        $id = $this->tasks->create($boardId, $request->validated());

        return response()->json(['data' => ['id' => $id]], 201);
    }

    public function updateStatus(int $taskId, UpdateTaskStatusRequest $request): JsonResponse
    {
        $this->tasks->updateStatus($taskId, $request->validated()['status_key']);

        return response()->json(['data' => true]);
    }
}

