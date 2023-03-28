<?php

namespace App\Http\Resources;

use App\Models\Country;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;

class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    /**
     * @param string $name
     * @param string $countryCode
     * @return mixed
     */
    public static function getCountryByNameOrCode (string $name, string $countryCode): mixed
    {
        return Country::where('name_eng', $name)
                ->orWhere('country_code', $countryCode)
                ->first();
    }

    /**
     * @param array $coordinates
     * @return mixed|null
     */
    public static function getCountryByGPSCoordinates(array $coordinates): mixed
    {
        $response = Http::get('https://nominatim.openstreetmap.org/reverse.php', [
            'format' => 'json',
            'lat' => $coordinates['latitude'],
            'lon' => $coordinates['longitude'],
            'zoom' => 3,
            'accept-language' => 'en',
        ]);
        $response = $response->object();
        if (!$response) {
            return null;
        }

        $countryEng = $response->address->country;
        $countryCode = strtoupper($response->address->country_code);

        return self::getCountryByNameOrCode($countryEng, $countryCode);
    }
}
