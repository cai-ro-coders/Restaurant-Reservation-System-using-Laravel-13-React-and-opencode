<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $today = now()->toDateString();
        $weekAgo = now()->subDays(6)->toDateString();
        
        $todayReservations = Reservation::where('reservation_date', $today)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();
        
        $totalToday = $todayReservations->count();
        $totalConfirmed = $todayReservations->where('status', 'confirmed')->count();
        $totalGuestsExpected = $todayReservations->sum('guest_count');
        
        $availableCapacity = Table::active()->sum('capacity');
        
        $bookedTables = DB::table('reservation_tables')
            ->join('reservations', 'reservation_tables.reservation_id', '=', 'reservations.id')
            ->where('reservations.reservation_date', $today)
            ->whereIn('reservations.status', ['pending', 'confirmed'])
            ->distinct()
            ->count('table_id');
        
        $weeklyStats = Reservation::whereBetween('reservation_date', [$weekAgo, $today])
            ->select('reservation_date', DB::raw('COUNT(*) as total'), DB::raw('SUM(guest_count) as guests'))
            ->groupBy('reservation_date')
            ->get();
        
        $statusDistribution = Reservation::where('reservation_date', $today)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');
        
        $recentReservations = Reservation::where('reservation_date', '>=', $today)
            ->orderBy('reservation_date')
            ->orderBy('reservation_time')
            ->with('customer')
            ->limit(10)
            ->get();
        
        return response()->json([
            'today' => [
                'total_reservations' => $totalToday,
                'confirmed' => $totalConfirmed,
                'pending' => $totalToday - $totalConfirmed,
                'guests_expected' => $totalGuestsExpected,
                'available_capacity' => $availableCapacity,
                'capacity_used_percent' => $availableCapacity > 0 ? round(($totalGuestsExpected / $availableCapacity) * 100) : 0,
                'tables_booked' => $bookedTables,
            ],
            'weekly_stats' => $weeklyStats,
            'status_distribution' => [
                'confirmed' => $statusDistribution['confirmed'] ?? 0,
                'pending' => $statusDistribution['pending'] ?? 0,
                'cancelled' => $statusDistribution['cancelled'] ?? 0,
                'completed' => $statusDistribution['completed'] ?? 0,
            ],
            'recent_reservations' => $recentReservations->map(function ($r) {
                return [
                    'id' => $r->id,
                    'customer' => $r->customer->first_name . ' ' . $r->customer->last_name,
                    'date' => $r->reservation_date,
                    'time' => $r->reservation_time,
                    'guests' => $r->guest_count,
                    'status' => $r->status,
                ];
            }),
        ]);
    }
}