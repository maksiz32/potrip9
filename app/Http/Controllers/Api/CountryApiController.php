<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryApiRequest;
use App\Http\Resources\CountryResource;
use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Http;

class CountryApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $currentCountry = null;
        $coordinates = $request->validate([
            'latitude' => 'sometimes|required|numeric',
            'longitude' => 'sometimes|required|numeric',
        ]);

        if (
            $coordinates
            && $coordinates['latitude']
            && $coordinates['longitude']
        ) {
            // Get country by user's coordinates if it is possible
            $currentCountry = CountryResource::getCountryByGPSCoordinates($coordinates);
        }

        if (!$currentCountry) {
            // If we haven't GPS data then we must try to get country by IP-address
            $currentCountryResponse = \Location::get($request->ip());
            if ($currentCountryResponse) {
                $countryEng = $currentCountryResponse->countryName;
                $countryCode = strtoupper($currentCountryResponse->countryCode);
                $currentCountry = CountryResource::getCountryByNameOrCode($countryEng, $countryCode);
            }
        }

        return response()->json(['countries' => Country::all(), 'currentCountry' => $currentCountry]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // country_code приводить к верхнему регистру
    }

    /**
     * Display the specified resource.
     *
     * @param Country $country
     * @return JsonResponse
     */
    public function show(Country $country): JsonResponse
    {
        // Make response with regions check
//        return response()->json(['response' => 'Please, check the region', 'ff' => $country]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
