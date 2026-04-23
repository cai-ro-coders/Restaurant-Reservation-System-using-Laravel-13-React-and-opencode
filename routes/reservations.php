<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/customers', [ReservationController::class, 'customers']);
Route::get('/reservations/tables', [ReservationController::class, 'availableTables']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);