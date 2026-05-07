<?php

namespace App\Domain\Tasks;

interface TaskRepository
{
    /**
     * @return list<array{
     *   id:int,
     *   board_id:int,
     *   status: array{ id:int, key:string, name:string, position:int },
     *   title:string,
     *   description:?string,
     *   priority:string,
     *   created_at:string,
     *   updated_at:string
     * }>
     */
    public function listByBoardId(int $boardId): array;

    /**
     * @param array{title:string, description?:?string, priority?:string, status_key?:string} $data
     */
    public function create(int $boardId, array $data): int;

    public function updateStatus(int $taskId, string $newStatusKey): void;
}

