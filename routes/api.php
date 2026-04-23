<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

Route::post('/reservation/submit', [PublicController::class, 'submitReservation']);

Route::get('/tables', [TableController::class, 'index']);
Route::post('/tables', [TableController::class, 'store']);
Route::put('/tables/{id}', [TableController::class, 'update']);
Route::delete('/tables/{id}', [TableController::class, 'destroy']);

Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/customers', [ReservationController::class, 'customers']);
Route::get('/reservations/tables', [ReservationController::class, 'availableTables']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);