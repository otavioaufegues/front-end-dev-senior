<?php

namespace App\Domain\Statuses;

interface StatusRepository
{
    /**
     * @return list<array{id:int, key:string, name:string, position:int}>
     */
    public function listOrdered(): array;

    public function getIdByKey(StatusKey|string $key): int;
}

