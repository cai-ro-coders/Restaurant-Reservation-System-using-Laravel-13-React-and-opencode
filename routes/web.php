<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('reservations', 'admin/reservations')->name('reservations');
    Route::inertia('customers', 'admin/customers')->name('customers');
    Route::inertia('tables', 'admin/tables')->name('tables');
});

require __DIR__.'/settings.php';
