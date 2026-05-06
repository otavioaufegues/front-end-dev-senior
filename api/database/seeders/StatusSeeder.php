<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('statuses')->upsert([
            [
                'key' => 'todo',
                'name' => 'To Do',
                'position' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'in_progress',
                'name' => 'In Progress',
                'position' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'done',
                'name' => 'Done',
                'position' => 3,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['key'], ['name', 'position', 'updated_at']);
    }
}

