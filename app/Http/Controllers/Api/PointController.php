<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PointRequest;
use App\Http\Resources\PointResource;
use App\Models\Point;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PointController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return PointResource::collection(Point::paginate(10));
    }

    public function requestForCreate()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PointRequest $request
     * @return Response
     */
    public function store(PointRequest $request)
    {
        if (Point::create($request->validated())) {
            return response()->json('Новая достопримечательность успешно создана', 201);
        }

        return response()->json('Ошибка при создании новой достопримечательности', 400);
    }

    /**
     * Display the specified resource.
     *
     * @param Point $point
     * @return PointResource
     */
    public function show(Point $point): PointResource
    {
        return new PointResource($point);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PointRequest $request
     * @param Point $point
     * @return PointResource
     */
    public function update(PointRequest $request, Point $point): PointResource
    {
        $point->update($request->validated());

        return new PointResource($point);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Point $point)
    {
        $point->delete();

        return response()->json('Достопримечательность удалена');
    }
}
