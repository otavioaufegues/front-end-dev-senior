<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Statuses\StatusKey;
use App\Domain\Statuses\StatusRepository;
use App\Models\Status;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EloquentStatusRepository implements StatusRepository
{
    public function listOrdered(): array
    {
        return Status::query()
            ->orderBy('position')
            ->get(['id', 'key', 'name', 'position'])
            ->map(static fn (Status $s): array => [
                'id' => $s->id,
                'key' => $s->key,
                'name' => $s->name,
                'position' => $s->position,
            ])
            ->all();
    }

    public function getIdByKey(StatusKey|string $key): int
    {
        $keyValue = $key instanceof StatusKey ? $key->value : $key;

        try {
            return (int) Status::query()
                ->where('key', $keyValue)
                ->valueOrFail('id');
        } catch (ModelNotFoundException $e) {
            throw new \InvalidArgumentException("Invalid status key: {$keyValue}", 0, $e);
        }
    }
}

