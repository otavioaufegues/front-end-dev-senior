<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();

            // Stable identifier used by backend/frontend (e.g. todo, in_progress, done)
            $table->string('key', 32)->unique();
            $table->string('name', 64);
            $table->unsignedSmallInteger('position');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};

