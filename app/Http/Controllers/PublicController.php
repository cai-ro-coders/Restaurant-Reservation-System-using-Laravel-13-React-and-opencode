<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicController extends Controller
{
    public function submitReservation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required',
            'guests' => 'required|integer|min:1|max:20',
            'specialRequests' => 'nullable|string',
        ]);

        $nameParts = explode(' ', $validated['name'], 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
        
        $customer = Customer::where('email', $validated['email'])->first();
        
        if (!$customer) {
            $customer = Customer::create([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
            ]);
        }
        
        $table = Table::active()
            ->where('capacity', '>=', $validated['guests'])
            ->orderBy('capacity')
            ->first();
        
        if (!$table) {
            return response()->json([
                'success' => false,
                'message' => 'No tables available for the selected date and time. Please try a different time.',
            ], 422);
        }
        
        $existingBookings = DB::table('reservation_tables')
            ->join('reservations', 'reservation_tables.reservation_id', '=', 'reservations.id')
            ->where('reservations.reservation_date', $validated['date'])
            ->where('reservations.reservation_time', $validated['time'])
            ->whereIn('reservations.status', ['pending', 'confirmed'])
            ->pluck('reservation_tables.table_id')
            ->toArray();
        
        $availableTable = Table::active()
            ->where('capacity', '>=', $validated['guests'])
            ->whereNotIn('id', $existingBookings)
            ->orderBy('capacity')
            ->first();
        
        if (!$availableTable) {
            return response()->json([
                'success' => false,
                'message' => 'No tables available for the selected date and time. Please try a different time.',
            ], 422);
        }
        
        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'reservation_date' => $validated['date'],
            'reservation_time' => $validated['time'],
            'guest_count' => $validated['guests'],
            'status' => 'pending',
            'special_requests' => $validated['specialRequests'] ?? null,
        ]);
        
        $reservation->tables()->attach($availableTable->id);
        
        return response()->json([
            'success' => true,
            'message' => 'Reservation submitted successfully!',
            'reservation' => [
                'id' => $reservation->id,
                'date' => $reservation->reservation_date,
                'time' => $reservation->reservation_time,
                'guests' => $reservation->guest_count,
                'table' => $availableTable->table_number,
            ],
        ]);
    }
}