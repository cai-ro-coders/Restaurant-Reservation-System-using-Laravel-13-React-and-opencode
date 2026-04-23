<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/reservations', 'admin/reservations')->name('reservations');