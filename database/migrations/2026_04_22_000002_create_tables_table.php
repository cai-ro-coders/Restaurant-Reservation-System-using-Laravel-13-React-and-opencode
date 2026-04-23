<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_number', 10)->unique();
            $table->tinyInteger('capacity');
            $table->enum('location', ['indoor', 'outdoor', 'vip', 'bar', 'private'])->default('indoor');
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('location');
            $table->index('capacity');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};