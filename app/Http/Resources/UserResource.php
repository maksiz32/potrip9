<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'login' => $this->login,
            'external_id' => $this->external_id,
            'register_variants_id' => $this->register_variants_id,
            'first_name' => $this->first_name,
            'email' => $this->email,
            'city' => $this->city,
            'site' => $this->site,
            'address' => $this->address,
            'created_at' => $this->created_at->format('d-m-Y H:i:s'),
            'is_block' => $this->is_block,
            'users_role_id' => $this->users_role_id,
            'secondary_name' => $this->secondary_name,
            'fathers_name' => $this->fathers_name,
            'description' => $this->description,
            'notes' => $this->notes,
            'settings' => $this->settings,
        ];
    }
}
