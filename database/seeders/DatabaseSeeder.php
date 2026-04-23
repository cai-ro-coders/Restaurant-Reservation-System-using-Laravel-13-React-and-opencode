<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,
            TableSeeder::class,
            ReservationSeeder::class,
            MenuItemSeeder::class,
            GallerySeeder::class,
        ]);
    }
}