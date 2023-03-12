<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 */
class Point extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'points_type_id',
        'visible',
        'slug',
        'name',
        'address',
        'date_made',
        'now',
        'condition',
        'gps_x',
        'gps_y',
        'description',
        'is_commertion',
    ];

}
