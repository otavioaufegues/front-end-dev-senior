<?php

namespace App\Http\Requests;

use App\Domain\Statuses\StatusKey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status_key' => ['required', 'string', Rule::in(StatusKey::values())],
        ];
    }
}

