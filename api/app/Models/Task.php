<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $fillable = [
        'board_id',
        'status_id',
        'title',
        'description',
        'priority',
    ];

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
}

