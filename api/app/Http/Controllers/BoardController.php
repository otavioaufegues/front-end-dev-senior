<?php

namespace App\Http\Controllers;

use App\Domain\Boards\BoardRepository;
use App\Http\Requests\CreateBoardRequest;
use Illuminate\Http\JsonResponse;

class BoardController extends Controller
{
    public function __construct(
        private readonly BoardRepository $boards,
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->boards->findAllWithStats(),
        ]);
    }

    public function show(int $boardId): JsonResponse
    {
        $board = $this->boards->findById($boardId);
        if (!$board) {
            return response()->json(['message' => 'Board not found'], 404);
        }

        return response()->json(['data' => $board]);
    }

    public function store(CreateBoardRequest $request): JsonResponse
    {
        $id = $this->boards->create($request->validated());

        return response()->json(['data' => ['id' => $id]], 201);
    }
}

