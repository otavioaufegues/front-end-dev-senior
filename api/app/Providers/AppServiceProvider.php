<?php

namespace App\Providers;

use App\Domain\Boards\BoardRepository;
use App\Domain\Statuses\StatusRepository;
use App\Domain\Tasks\TaskRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentBoardRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentStatusRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentTaskRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(BoardRepository::class, EloquentBoardRepository::class);
        $this->app->bind(StatusRepository::class, EloquentStatusRepository::class);
        $this->app->bind(TaskRepository::class, EloquentTaskRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
