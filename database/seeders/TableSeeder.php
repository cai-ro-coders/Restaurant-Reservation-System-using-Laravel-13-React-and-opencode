<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            [
                'table_number' => 'T1',
                'capacity' => 2,
                'location' => 'indoor',
                'description' => 'Intimate table for couples',
                'is_active' => true,
            ],
            [
                'table_number' => 'T2',
                'capacity' => 2,
                'location' => 'indoor',
                'description' => 'Window side table',
                'is_active' => true,
            ],
            [
                'table_number' => 'T3',
                'capacity' => 4,
                'location' => 'indoor',
                'description' => 'Main dining area',
                'is_active' => true,
            ],
            [
                'table_number' => 'T4',
                'capacity' => 4,
                'location' => 'indoor',
                'description' => 'Center table',
                'is_active' => true,
            ],
            [
                'table_number' => 'T5',
                'capacity' => 4,
                'location' => 'indoor',
                'description' => 'Near kitchen',
                'is_active' => true,
            ],
            [
                'table_number' => 'T6',
                'capacity' => 6,
                'location' => 'indoor',
                'description' => 'Family style table',
                'is_active' => true,
            ],
            [
                'table_number' => 'T7',
                'capacity' => 6,
                'location' => 'indoor',
                'description' => 'Group dining',
                'is_active' => true,
            ],
            [
                'table_number' => 'T8',
                'capacity' => 8,
                'location' => 'indoor',
                'description' => 'Large party table',
                'is_active' => true,
            ],
            [
                'table_number' => 'O1',
                'capacity' => 2,
                'location' => 'outdoor',
                'description' => 'Patio seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'O2',
                'capacity' => 4,
                'location' => 'outdoor',
                'description' => 'Garden view',
                'is_active' => true,
            ],
            [
                'table_number' => 'O3',
                'capacity' => 4,
                'location' => 'outdoor',
                'description' => 'Covered patio',
                'is_active' => true,
            ],
            [
                'table_number' => 'O4',
                'capacity' => 6,
                'location' => 'outdoor',
                'description' => 'Large patio table',
                'is_active' => true,
            ],
            [
                'table_number' => 'VIP1',
                'capacity' => 4,
                'location' => 'vip',
                'description' => 'Private VIP booth',
                'is_active' => true,
            ],
            [
                'table_number' => 'VIP2',
                'capacity' => 6,
                'location' => 'vip',
                'description' => 'Premium VIP seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'VIP3',
                'capacity' => 8,
                'location' => 'vip',
                'description' => 'VIP private room',
                'is_active' => true,
            ],
            [
                'table_number' => 'B1',
                'capacity' => 2,
                'location' => 'bar',
                'description' => 'Bar counter seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'B2',
                'capacity' => 2,
                'location' => 'bar',
                'description' => 'Bar counter seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'B3',
                'capacity' => 2,
                'location' => 'bar',
                'description' => 'Bar counter seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'B4',
                'capacity' => 2,
                'location' => 'bar',
                'description' => 'Bar counter seating',
                'is_active' => true,
            ],
            [
                'table_number' => 'P1',
                'capacity' => 12,
                'location' => 'private',
                'description' => 'Private dining room',
                'is_active' => true,
            ],
        ];

        foreach ($tables as $table) {
            Table::create($table);
        }
    }
}