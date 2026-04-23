<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('category', 50);
            $table->string('image_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_available')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            $table->index('category');
            $table->index('is_featured');
            $table->index('display_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};