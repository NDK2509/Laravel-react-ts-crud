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
        Schema::create('weight_histories', function (Blueprint $table) {
            $table->unsignedInteger("cat_id");
            $table->unsignedInteger("weight");
            $table->foreign("cat_id")->references("id")->on("cats");
            $table->timestamps();
            $table->primary(["cat_id", "created_at"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weight_histories');
    }
};
