<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Boards\BoardRepository;
use App\Models\Board;
use Illuminate\Support\Facades\DB;

class EloquentBoardRepository implements BoardRepository
{
    public function findAllWithStats(): array
    {
        $rows = Board::query()
            ->leftJoin('tasks', 'tasks.board_id', '=', 'boards.id')
            ->leftJoin('statuses', 'statuses.id', '=', 'tasks.status_id')
            ->groupBy('boards.id')
            ->orderByDesc('boards.last_activity_at')
            ->orderByDesc('boards.updated_at')
            ->get([
                'boards.id',
                'boards.name',
                'boards.description',
                'boards.theme_color',
                'boards.icon',
                'boards.last_activity_at',
                DB::raw('COUNT(tasks.id) AS tasks_count_total'),
                DB::raw("COALESCE(SUM(CASE WHEN statuses.key = 'todo' THEN 1 ELSE 0 END), 0) AS tasks_count_todo"),
                DB::raw("COALESCE(SUM(CASE WHEN statuses.key = 'in_progress' THEN 1 ELSE 0 END), 0) AS tasks_count_in_progress"),
                DB::raw("COALESCE(SUM(CASE WHEN statuses.key = 'done' THEN 1 ELSE 0 END), 0) AS tasks_count_done"),
            ]);

        return $rows
            ->map(static fn ($r): array => [
                'id' => (int) $r->id,
                'name' => (string) $r->name,
                'description' => $r->description !== null ? (string) $r->description : null,
                'theme_color' => (string) $r->theme_color,
                'icon' => (string) $r->icon,
                'last_activity_at' => $r->last_activity_at?->toISOString(),
                'tasks_count_total' => (int) $r->tasks_count_total,
                'tasks_count_by_status' => [
                    'todo' => (int) $r->tasks_count_todo,
                    'in_progress' => (int) $r->tasks_count_in_progress,
                    'done' => (int) $r->tasks_count_done,
                ],
            ])
            ->all();
    }

    public function findById(int $boardId): ?array
    {
        $board = Board::query()->find($boardId, [
            'id',
            'name',
            'description',
            'theme_color',
            'icon',
            'last_activity_at',
        ]);

        if (!$board) {
            return null;
        }

        return [
            'id' => (int) $board->id,
            'name' => (string) $board->name,
            'description' => $board->description !== null ? (string) $board->description : null,
            'theme_color' => (string) $board->theme_color,
            'icon' => (string) $board->icon,
            'last_activity_at' => $board->last_activity_at?->toISOString(),
        ];
    }

    public function create(array $data): int
    {
        $board = new Board();
        $board->name = $data['name'];
        $board->description = $data['description'] ?? null;
        $board->theme_color = $data['theme_color'];
        $board->icon = $data['icon'];
        $board->last_activity_at = now();
        $board->save();

        return (int) $board->id;
    }

    public function delete(int $boardId): bool
    {
        return Board::query()
            ->whereKey($boardId)
            ->delete() > 0;
    }
}
