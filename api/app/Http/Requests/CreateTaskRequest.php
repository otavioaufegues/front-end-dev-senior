<?php

namespace App\Http\Requests;

use App\Domain\Statuses\StatusKey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:1', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'priority' => ['sometimes', 'string', Rule::in(['normal', 'urgent'])],
            'status_key' => ['sometimes', 'string', Rule::in(StatusKey::values())],
        ];
    }
}

