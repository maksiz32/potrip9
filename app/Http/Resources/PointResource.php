<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PointResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        // Отображать только разрешенные точки and only the records recorded here
        if ($this->visible) {
            return [
                'id' => $this->id,
                'slug' => $this->slug,
                'name' => $this->name,
                'address' => $this->address,
                'date_made' => $this->date_made,
                'now' => $this->now,
                'condition' => $this->condition,
                'gps_x' => $this->gps_x,
                'gps_y' => $this->gps_y,
                'description' => $this->description,
                'is_commertion' => $this->is_commertion,
            ];
        }

        return [];
    }
}
