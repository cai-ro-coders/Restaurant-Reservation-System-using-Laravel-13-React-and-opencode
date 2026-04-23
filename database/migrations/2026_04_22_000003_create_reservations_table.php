<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->date('reservation_date');
            $table->time('reservation_time');
            $table->tinyInteger('guest_count');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->text('special_requests')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            $table->index('reservation_date');
            $table->index(['reservation_date', 'reservation_time']);
            $table->index('status');
            $table->index('customer_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};