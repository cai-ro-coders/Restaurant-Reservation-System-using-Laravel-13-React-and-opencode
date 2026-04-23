<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    protected $fillable = [
        'customer_id',
        'reservation_date',
        'reservation_time',
        'guest_count',
        'status',
        'special_requests',
        'confirmed_at',
        'cancelled_at',
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'reservation_time' => 'datetime:H:i',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'guest_count' => 'integer',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_COMPLETED = 'completed';

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function tables(): BelongsToMany
    {
        return $this->belongsToMany(Table::class, 'reservation_tables')
                    ->withTimestamps();
    }

    public function confirm(): void
    {
        $this->update([
            'status' => self::STATUS_CONFIRMED,
            'confirmed_at' => now(),
        ]);
    }

    public function cancel(): void
    {
        $this->update([
            'status' => self::STATUS_CANCELLED,
            'cancelled_at' => now(),
        ]);
    }

    public function complete(): void
    {
        $this->update([
            'status' => self::STATUS_COMPLETED,
        ]);
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', self::STATUS_CONFIRMED);
    }

    public function scopeForDate($query, $date)
    {
        return $query->where('reservation_date', $date);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('reservation_date', '>=', now()->toDateString())
                  ->whereIn('status', [self::STATUS_PENDING, self::STATUS_CONFIRMED]);
    }
}