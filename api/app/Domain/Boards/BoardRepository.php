<?php

namespace App\Domain\Boards;

interface BoardRepository
{
    /**
     * Dashboard projection.
     *
     * @return list<array{
     *   id:int,
     *   name:string,
     *   description: ?string,
     *   theme_color:string,
     *   icon:string,
     *   last_activity_at:?string,
     *   tasks_count_total:int,
     *   tasks_count_by_status: array{todo:int, in_progress:int, done:int}
     * }>
     */
    public function findAllWithStats(): array;

    /**
     * @return array{id:int, name:string, description:?string, theme_color:string, icon:string, last_activity_at:?string}|null
     */
    public function findById(int $boardId): ?array;

    /**
     * @param array{name:string, description?:?string, theme_color:string, icon:string} $data
     * @return int Newly created board id
     */
    public function create(array $data): int;
}

