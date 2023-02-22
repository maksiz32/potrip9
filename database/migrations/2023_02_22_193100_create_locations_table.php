<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Country;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(Country::class)
                ->comment('Связь с таблицей клиенты, если это VIP или коммерческий пользователь');
            $table
                ->bigInteger('regions_id')
                ->comment('Ссылка на объект более высшего уровня');
            $table
                ->tinyInteger('level')
                ->comment('Уровень вложенности объекта таблицы');
            $table->string('name');
            $table
                ->string('description')
                ->nullable();
            $table
                ->string('picture')
                ->nullable()
                ->comment('Адрес картинки. Первоначально введен для картинки с гербом');
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
        Schema::dropIfExists('locations');
    }
};
