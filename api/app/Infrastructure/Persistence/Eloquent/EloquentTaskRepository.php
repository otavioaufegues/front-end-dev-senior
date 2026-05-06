<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Statuses\StatusKey;
use App\Domain\Statuses\StatusRepository;
use App\Domain\Tasks\TaskRepository;
use App\Models\Board;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class EloquentTaskRepository implements TaskRepository
{
    public function __construct(
        private readonly StatusRepository $statuses,
    ) {
    }

    public function listByBoardId(int $boardId): array
    {
        return Task::query()
            ->where('tasks.board_id', $boardId)
            ->join('statuses', 'statuses.id', '=', 'tasks.status_id')
            ->orderBy('statuses.position')
            ->orderByDesc('tasks.updated_at')
            ->get([
                'tasks.id',
                'tasks.board_id',
                'tasks.title',
                'tasks.description',
                'tasks.priority',
                'tasks.created_at',
                'tasks.updated_at',
                'statuses.id as status_id',
                'statuses.key as status_key',
                'statuses.name as status_name',
                'statuses.position as status_position',
            ])
            ->map(static fn ($r): array => [
                'id' => (int) $r->id,
                'board_id' => (int) $r->board_id,
                'status' => [
                    'id' => (int) $r->status_id,
                    'key' => (string) $r->status_key,
                    'name' => (string) $r->status_name,
                    'position' => (int) $r->status_position,
                ],
                'title' => (string) $r->title,
                'description' => $r->description !== null ? (string) $r->description : null,
                'priority' => (string) $r->priority,
                'created_at' => $r->created_at->toISOString(),
                'updated_at' => $r->updated_at->toISOString(),
            ])
            ->all();
    }

    public function create(int $boardId, array $data): int
    {
        $statusKey = $data['status_key'] ?? StatusKey::Todo->value;
        if (!in_array($statusKey, StatusKey::values(), true)) {
            throw new \InvalidArgumentException("Invalid status key: {$statusKey}");
        }

        $statusId = $this->statuses->getIdByKey($statusKey);

        return (int) DB::transaction(function () use ($boardId, $statusId, $data): int {
            $task = new Task();
            $task->board_id = $boardId;
            $task->status_id = $statusId;
            $task->title = $data['title'];
            $task->description = $data['description'] ?? null;
            $task->priority = $data['priority'] ?? 'normal';
            $task->save();

            Board::query()
                ->whereKey($boardId)
                ->update(['last_activity_at' => now()]);

            return (int) $task->id;
        });
    }

    public function updateStatus(int $taskId, string $newStatusKey): void
    {
        if (!in_array($newStatusKey, StatusKey::values(), true)) {
            throw new \InvalidArgumentException("Invalid status key: {$newStatusKey}");
        }

        $newStatusId = $this->statuses->getIdByKey($newStatusKey);

        DB::transaction(function () use ($taskId, $newStatusId): void {
            $task = Task::query()->lockForUpdate()->findOrFail($taskId);
            $task->status_id = $newStatusId;
            $task->save();

            Board::query()
                ->whereKey($task->board_id)
                ->update(['last_activity_at' => now()]);
        });
    }
}

