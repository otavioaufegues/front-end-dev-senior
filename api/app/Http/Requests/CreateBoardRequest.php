<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBoardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:1', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'theme_color' => ['required', 'string', 'min:1', 'max:32'],
            'icon' => ['required', 'string', 'min:1', 'max:64'],
        ];
    }
}

