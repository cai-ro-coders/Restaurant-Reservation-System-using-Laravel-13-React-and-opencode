<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Customer;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $status = $request->get('status', '');
        $date = $request->get('date', '');
        
        $query = Reservation::with(['customer', 'tables']);
        
        if ($search) {
            $query->whereHas('customer', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }
        
        if ($status) {
            $query->where('status', $status);
        }
        
        if ($date) {
            $query->where('reservation_date', $date);
        }
        
        $reservations = $query->orderBy('reservation_date', 'desc')
            ->orderBy('reservation_time', 'desc')
            ->paginate(10)
            ->appends($request->query());
        
        return response()->json([
            'reservations' => $reservations->items(),
            'pagination' => [
                'current_page' => $reservations->currentPage(),
                'last_page' => $reservations->lastPage(),
                'per_page' => $reservations->perPage(),
                'total' => $reservations->total(),
                'from' => $reservations->firstItem(),
                'to' => $reservations->lastItem(),
            ],
        ]);
    }
    
    public function customers()
    {
        $customers = Customer::orderBy('first_name')
            ->orderBy('last_name')
            ->get(['id', 'first_name', 'last_name', 'email', 'phone']);
        
        return response()->json(['customers' => $customers]);
    }
    
    public function availableTables(Request $request)
    {
        $date = $request->get('date');
        $time = $request->get('time');
        $guests = $request->get('guests', 2);
        
        if (!$date || !$time) {
            return response()->json(['tables' => []]);
        }
        
        $bookedTableIds = DB::table('reservation_tables')
            ->join('reservations', 'reservation_tables.reservation_id', '=', 'reservations.id')
            ->where('reservations.reservation_date', $date)
            ->where('reservations.reservation_time', $time)
            ->whereIn('reservations.status', ['pending', 'confirmed'])
            ->pluck('reservation_tables.table_id');
        
        $tables = Table::active()
            ->where('capacity', '>=', $guests)
            ->whereNotIn('id', $bookedTableIds)
            ->orderBy('capacity')
            ->orderBy('table_number')
            ->get();
        
        return response()->json(['tables' => $tables]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required',
            'guest_count' => 'required|integer|min:1|max:20',
            'table_ids' => 'required|array|min:1',
            'table_ids.*' => 'exists:tables,id',
            'special_requests' => 'nullable|string',
            'auto_approve' => 'boolean',
        ]);
        
        $status = $request->get('auto_approve') ? 'confirmed' : 'pending';
        $confirmedAt = $request->get('auto_approve') ? now() : null;
        
        $reservation = Reservation::create([
            'customer_id' => $validated['customer_id'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'guest_count' => $validated['guest_count'],
            'status' => $status,
            'special_requests' => $validated['special_requests'] ?? null,
            'confirmed_at' => $confirmedAt,
        ]);
        
        $reservation->tables()->attach($validated['table_ids']);
        
        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation' => $reservation->load(['customer', 'tables']),
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);
        
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required',
            'guest_count' => 'required|integer|min:1|max:20',
            'table_ids' => 'required|array|min:1',
            'table_ids.*' => 'exists:tables,id',
            'special_requests' => 'nullable|string',
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);
        
        $reservation->update([
            'customer_id' => $validated['customer_id'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'guest_count' => $validated['guest_count'],
            'status' => $validated['status'],
            'special_requests' => $validated['special_requests'] ?? null,
            'confirmed_at' => $validated['status'] === 'confirmed' && !$reservation->confirmed_at ? now() : $reservation->confirmed_at,
            'cancelled_at' => $validated['status'] === 'cancelled' && !$reservation->cancelled_at ? now() : $reservation->cancelled_at,
        ]);
        
        $reservation->tables()->sync($validated['table_ids']);
        
        return response()->json([
            'message' => 'Reservation updated successfully',
            'reservation' => $reservation->load(['customer', 'tables']),
        ]);
    }
    
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->tables()->detach();
        $reservation->delete();
        
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}