<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        if (Reservation::count() > 0) {
            return;
        }
        
        $customers = Customer::all();
        $tables = Table::active()->get();

        $reservations = [
            [
                'customer_id' => 1,
                'reservation_date' => now()->addDays(2)->toDateString(),
                'reservation_time' => '19:00:00',
                'guest_count' => 2,
                'status' => 'confirmed',
                'special_requests' => 'Birthday celebration - please prepare a small cake',
                'confirmed_at' => now(),
            ],
            [
                'customer_id' => 2,
                'reservation_date' => now()->addDays(3)->toDateString(),
                'reservation_time' => '20:00:00',
                'guest_count' => 4,
                'status' => 'confirmed',
                'special_requests' => 'Anniversary dinner - quiet table preferred',
                'confirmed_at' => now()->subDay(),
            ],
            [
                'customer_id' => 3,
                'reservation_date' => now()->addDays(1)->toDateString(),
                'reservation_time' => '18:30:00',
                'guest_count' => 2,
                'status' => 'pending',
                'special_requests' => null,
                'confirmed_at' => null,
            ],
            [
                'customer_id' => 4,
                'reservation_date' => now()->addDays(5)->toDateString(),
                'reservation_time' => '19:30:00',
                'guest_count' => 4,
                'status' => 'confirmed',
                'special_requests' => 'Vegetarian menu options needed',
                'confirmed_at' => now(),
            ],
            [
                'customer_id' => 5,
                'reservation_date' => now()->addDays(7)->toDateString(),
                'reservation_time' => '19:00:00',
                'guest_count' => 6,
                'status' => 'confirmed',
                'special_requests' => 'Business dinner - private room if available',
                'confirmed_at' => now()->subDays(2),
            ],
            [
                'customer_id' => 6,
                'reservation_date' => now()->addDays(2)->toDateString(),
                'reservation_time' => '12:30:00',
                'guest_count' => 2,
                'status' => 'confirmed',
                'special_requests' => 'Brunch reservation',
                'confirmed_at' => now(),
            ],
            [
                'customer_id' => 7,
                'reservation_date' => now()->subDays(1)->toDateString(),
                'reservation_time' => '19:00:00',
                'guest_count' => 4,
                'status' => 'completed',
                'special_requests' => 'First time visiting',
                'confirmed_at' => now()->subDays(2),
            ],
            [
                'customer_id' => 8,
                'reservation_date' => now()->subDays(3)->toDateString(),
                'reservation_time' => '20:00:00',
                'guest_count' => 2,
                'status' => 'completed',
                'special_requests' => null,
                'confirmed_at' => now()->subDays(4),
            ],
            [
                'customer_id' => 9,
                'reservation_date' => now()->addDays(10)->toDateString(),
                'reservation_time' => '18:00:00',
                'guest_count' => 8,
                'status' => 'pending',
                'special_requests' => 'Large party - need multiple tables',
                'confirmed_at' => null,
            ],
            [
                'customer_id' => 10,
                'reservation_date' => now()->addDays(4)->toDateString(),
                'reservation_time' => '19:30:00',
                'guest_count' => 2,
                'status' => 'cancelled',
                'special_requests' => 'Food blogger - interested in chef table',
                'cancelled_at' => now()->subDay(),
            ],
        ];

        $reservationRecordIds = [];

        foreach ($reservations as $reservationData) {
            $reservation = Reservation::create($reservationData);
            $reservationRecordIds[$reservation->id] = $reservation->guest_count;
        }

        $reservationTableAssignments = [
            1 => ['T1'],
            2 => ['VIP1'],
            3 => ['T2'],
            4 => ['T3'],
            5 => ['VIP2', 'VIP3'],
            6 => ['O2'],
            7 => ['T4'],
            8 => ['T5'],
            9 => ['T8', 'T7'],
            10 => ['T6'],
        ];

        foreach ($reservationTableAssignments as $reservationId => $tableNumbers) {
            $reservation = Reservation::find($reservationId);
            if ($reservation) {
                foreach ($tableNumbers as $tableNumber) {
                    $table = Table::where('table_number', $tableNumber)->first();
                    if ($table) {
                        $reservation->tables()->attach($table->id);
                    }
                }
            }
        }
    }
}