<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoardSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('boards')->insert([
            [
                'name' => 'Customer Feedback',
                'description' => 'Track user reports, feature requests and urgent issues.',
                'theme_color' => '#6C5CE7',
                'icon' => 'message-square',
                'last_activity_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Marketing Sprint',
                'description' => 'Plan, execute and review the next campaign.',
                'theme_color' => '#00B894',
                'icon' => 'megaphone',
                'last_activity_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}

