<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Reservation;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $vip = $request->get('vip', '');
        
        $query = Customer::query();
        
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }
        
        if ($vip !== '' && $vip !== 'all') {
            $query->where('is_vip', $vip === 'vip');
        }
        
        $customers = $query->orderBy('first_name')
            ->orderBy('last_name')
            ->paginate(10)
            ->appends($request->query());
        
        return response()->json([
            'customers' => $customers->items(),
            'pagination' => [
                'current_page' => $customers->currentPage(),
                'last_page' => $customers->lastPage(),
                'per_page' => $customers->perPage(),
                'total' => $customers->total(),
                'from' => $customers->firstItem(),
                'to' => $customers->lastItem(),
            ],
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
            'is_vip' => 'boolean',
        ]);
        
        $customer = Customer::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'is_vip' => $validated['is_vip'] ?? false,
        ]);
        
        return response()->json([
            'message' => 'Customer created successfully',
            'customer' => $customer,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
            'is_vip' => 'boolean',
        ]);
        
        $customer->update($validated);
        
        return response()->json([
            'message' => 'Customer updated successfully',
            'customer' => $customer,
        ]);
    }
    
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        
        $reservationCount = Reservation::where('customer_id', $id)->count();
        if ($reservationCount > 0) {
            return response()->json([
                'message' => 'Cannot delete customer with existing reservations',
            ], 422);
        }
        
        $customer->delete();
        
        return response()->json(['message' => 'Customer deleted successfully']);
    }
}