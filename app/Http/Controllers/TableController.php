<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $location = $request->get('location', '');
        
        $query = Table::query();
        
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('table_number', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        if ($location) {
            $query->where('location', $location);
        }
        
        $tables = $query->orderBy('table_number')
            ->paginate(10)
            ->appends($request->query());
        
        return response()->json([
            'tables' => $tables->items(),
            'pagination' => [
                'current_page' => $tables->currentPage(),
                'last_page' => $tables->lastPage(),
                'per_page' => $tables->perPage(),
                'total' => $tables->total(),
                'from' => $tables->firstItem(),
                'to' => $tables->lastItem(),
            ],
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|unique:tables,table_number|max:10',
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'required|in:indoor,outdoor,vip,bar,private',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        
        $table = Table::create([
            'table_number' => $validated['table_number'],
            'capacity' => $validated['capacity'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);
        
        return response()->json([
            'message' => 'Table created successfully',
            'table' => $table,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);
        
        $validated = $request->validate([
            'table_number' => 'required|string|max:10|unique:tables,table_number,' . $id,
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'required|in:indoor,outdoor,vip,bar,private',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        
        $table->update($validated);
        
        return response()->json([
            'message' => 'Table updated successfully',
            'table' => $table,
        ]);
    }
    
    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        
        $table->delete();
        
        return response()->json(['message' => 'Table deleted successfully']);
    }
}