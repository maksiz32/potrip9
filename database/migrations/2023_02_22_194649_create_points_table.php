<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Location;
use App\Models\PointsType;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('points', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Location::class);
            $table->foreignIdFor(PointsType::class);
            $table
                ->boolean('visible')
                ->default(false);
            $table->string('slug');
            $table->string('name');
            $table->string('address');
            $table->string('date_made');
            $table->string('now');
            $table->string('condition');
            $table->double('gps_x');
            $table->double('gps_y');
            $table
                ->string('description')
                ->nullable();
            $table
                ->date('verify')
                ->nullable()
                ->default(null)
                ->comment('Дата верификации объекта или NULL');
            $table
                ->boolean('is_commertion')
                ->comment('Отметка если объект коммерческий партнер проекта');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('points');
    }
};
