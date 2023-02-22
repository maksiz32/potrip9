<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_variants', function (Blueprint $table) {
            $table->id();
            $table->string('name_eng');
            $table->string('name_cur_language');
            $table
                ->string('picture')
                ->nullable();
            $table
                ->string('description')
                ->nullable();
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
        Schema::dropIfExists('register_variants');
    }
};
