<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'location_id' => 'sometimes|required|integer|exists:locations,id',
            'points_type_id' => 'sometimes|required|integer|exists:points_types,id',
            'visible' => 'sometimes|required|boolean',
            'slug' => 'required|string|lowercase',
            'name' => 'sometimes|required|string|unique:points,name,' . $this->id,
            'address' => 'sometimes|required|string',
            'date_made' => 'sometimes|sometimes|string',
            'now' => 'sometimes|string',
            'condition' => 'sometimes|string',
            'gps_x' => 'numeric',
            'gps_y' => 'numeric',
            'description' => 'sometimes|string',
            'is_commertion' => 'sometimes|boolean',
        ];
    }
}
