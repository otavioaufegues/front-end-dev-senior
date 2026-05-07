<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $boardId = DB::table('boards')->orderBy('id')->value('id');
        if (!$boardId) {
            return;
        }

        $statusIds = DB::table('statuses')
            ->whereIn('key', ['todo', 'in_progress', 'done'])
            ->pluck('id', 'key');

        if ($statusIds->count() !== 3) {
            return;
        }

        DB::table('tasks')->insert([
            [
                'board_id' => $boardId,
                'status_id' => $statusIds['todo'],
                'title' => 'Review new user feedback',
                'description' => 'Read the latest tickets and categorize key pain points.',
                'priority' => 'urgent',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'board_id' => $boardId,
                'status_id' => $statusIds['todo'],
                'title' => 'Define acceptance criteria',
                'description' => 'Write clear acceptance criteria for the top 3 requests.',
                'priority' => 'normal',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'board_id' => $boardId,
                'status_id' => $statusIds['in_progress'],
                'title' => 'Draft UI copy',
                'description' => 'Prepare concise copy for dashboard and kanban interactions.',
                'priority' => 'normal',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'board_id' => $boardId,
                'status_id' => $statusIds['done'],
                'title' => 'Create initial kanban statuses',
                'description' => 'Seed To Do / In Progress / Done.',
                'priority' => 'normal',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        DB::table('boards')
            ->where('id', $boardId)
            ->update(['last_activity_at' => $now, 'updated_at' => $now]);
    }
}

