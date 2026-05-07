<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('board_id')
                ->constrained('boards')
                ->cascadeOnDelete();

            $table->foreignId('status_id')
                ->constrained('statuses')
                ->restrictOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            // For UI indicator (e.g. urgent badges / colored bar)
            $table->string('priority', 16)->default('normal'); // normal | urgent

            $table->timestamps();

            $table->index(['board_id', 'status_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

