import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
    CalendarDays,
    CheckCircle2,
    Users,
    Armchair,
    Clock,
    TrendingUp,
    TrendingDown,
    Utensils,
} from 'lucide-react';

interface DashboardStats {
    today: {
        total_reservations: number;
        confirmed: number;
        pending: number;
        guests_expected: number;
        available_capacity: number;
        capacity_used_percent: number;
        tables_booked: number;
    };
    weekly_stats: Array<{ reservation_date: string; total: number; guests: number }>;
    status_distribution: {
        confirmed: number;
        pending: number;
        cancelled: number;
        completed: number;
    };
    recent_reservations: Array<{
        id: number;
        customer: string;
        date: string;
        time: string;
        guests: number;
        status: string;
    }>;
}

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendValue,
}: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ElementType;
    trend?: 'up' | 'down';
    trendValue?: string;
}) {
    return (
        <div className="rounded-xl border border-[#E8E4DE] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium tracking-wider text-[#5A5A5A] uppercase">
                        {title}
                    </p>
                    <p className="mt-2 font-serif text-3xl font-medium text-[#1A1A1A]">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="mt-1 text-sm text-[#5A5A5A]">{subtitle}</p>
                    )}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5]">
                    <Icon className="h-5 w-5 text-[#C9A962]" />
                </div>
            </div>
            {trend && trendValue && (
                <div className="mt-4 flex items-center gap-1">
                    {trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                        className={`text-sm ${
                            trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {trendValue}
                    </span>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        confirmed: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-gray-100 text-gray-800',
    };
    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                styles[status] || 'bg-gray-100 text-gray-800'
            }`}
        >
            {status}
        </span>
    );
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<{
        reservations: number[];
        guests: number[];
        labels: string[];
    }>({ reservations: [], guests: [], labels: [] });

    const reservationsChartRef = useRef<Chart | null>(null);
    const guestsChartRef = useRef<Chart | null>(null);
    const statusChartRef = useRef<Chart | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/dashboard/stats');
                const data = await response.json();
                setStats(data);

                const weeklyLabels = [];
                const weeklyReservations = [];
                const weeklyGuests = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    weeklyLabels.push(
                        date.toLocaleDateString('en-US', { weekday: 'short' })
                    );
                    const dayStat = data.weekly_stats.find(
                        (s: { reservation_date: string }) => s.reservation_date === dateStr
                    );
                    weeklyReservations.push(dayStat?.total || 0);
                    weeklyGuests.push(dayStat?.guests || 0);
                }
                setChartData({
                    labels: weeklyLabels,
                    reservations: weeklyReservations,
                    guests: weeklyGuests,
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    useEffect(() => {
        if (!stats || !chartData.labels.length) return;

        const canvas = document.getElementById(
            'reservationsChart'
        ) as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (reservationsChartRef.current) {
            reservationsChartRef.current.destroy();
        }

        reservationsChartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Reservations',
                        data: chartData.reservations,
                        backgroundColor: '#C9A962',
                        borderRadius: 6,
                        barThickness: 24,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#E8E4DE' },
                    },
                    x: {
                        grid: { display: false },
                    },
                },
            },
        });

        return () => {
            if (reservationsChartRef.current) {
                reservationsChartRef.current.destroy();
                reservationsChartRef.current = null;
            }
        };
    }, [stats, chartData]);

    useEffect(() => {
        if (!stats) return;

        const canvas = document.getElementById('guestsChart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (guestsChartRef.current) {
            guestsChartRef.current.destroy();
        }

        guestsChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Guests',
                        data: chartData.guests,
                        borderColor: '#1A1A1A',
                        backgroundColor: 'rgba(201, 169, 98, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#C9A962',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#E8E4DE' },
                    },
                    x: {
                        grid: { display: false },
                    },
                },
            },
        });

        return () => {
            if (guestsChartRef.current) {
                guestsChartRef.current.destroy();
                guestsChartRef.current = null;
            }
        };
    }, [stats, chartData]);

    useEffect(() => {
        if (!stats) return;

        const canvas = document.getElementById('statusChart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (statusChartRef.current) {
            statusChartRef.current.destroy();
        }

        statusChartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
                datasets: [
                    {
                        data: [
                            stats.status_distribution.confirmed,
                            stats.status_distribution.pending,
                            stats.status_distribution.cancelled,
                            stats.status_distribution.completed,
                        ],
                        backgroundColor: ['#22C55E', '#EAB308', '#EF4444', '#6B7280'],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 16,
                        },
                    },
                },
                cutout: '65%',
            },
        });

        return () => {
            if (statusChartRef.current) {
                statusChartRef.current.destroy();
                statusChartRef.current = null;
            }
        };
    }, [stats]);

    if (loading) {
        return (
            <>
                <Head title="Dashboard | Asian Food" />
                <div className="flex h-full flex-1 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C9A962] border-t-transparent" />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Dashboard | Asian Food" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-[#1A1A1A]">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-[#5A5A5A]">
                        Welcome back! Here&apos;s your restaurant overview.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Today's Reservations"
                        value={stats?.today.total_reservations || 0}
                        subtitle="All statuses"
                        icon={CalendarDays}
                    />
                    <StatCard
                        title="Confirmed"
                        value={stats?.today.confirmed || 0}
                        subtitle={`${stats?.today.pending || 0} pending`}
                        icon={CheckCircle2}
                    />
                    <StatCard
                        title="Guests Expected"
                        value={stats?.today.guests_expected || 0}
                        subtitle={`${stats?.today.capacity_used_percent || 0}% capacity used`}
                        icon={Users}
                    />
                    <StatCard
                        title="Tables Booked"
                        value={stats?.today.tables_booked || 0}
                        subtitle={`of ${stats?.today.available_capacity || 0} available`}
                        icon={Armchair}
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6 shadow-sm lg:col-span-2">
                        <h2 className="font-serif text-xl text-[#1A1A1A]">
                            Weekly Reservations
                        </h2>
                        <div className="mt-6 h-64">
                            <canvas id="reservationsChart" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6 shadow-sm">
                        <h2 className="font-serif text-xl text-[#1A1A1A]">
                            Status Distribution
                        </h2>
                        <div className="mt-6 h-64">
                            <canvas id="statusChart" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6 shadow-sm lg:col-span-2">
                        <h2 className="font-serif text-xl text-[#1A1A1A]">
                            Guests Trend
                        </h2>
                        <div className="mt-6 h-64">
                            <canvas id="guestsChart" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6 shadow-sm">
                        <h2 className="font-serif text-xl text-[#1A1A1A]">
                            Recent Reservations
                        </h2>
                        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                            {stats?.recent_reservations.slice(0, 6).map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="flex items-center justify-between border-b border-[#E8E4DE] pb-3 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5]">
                                            <Utensils className="h-4 w-4 text-[#C9A962]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1A1A1A]">
                                                {reservation.customer}
                                            </p>
                                            <p className="text-sm text-[#5A5A5A]">
                                                {reservation.guests} guests •{' '}
                                                {new Date(
                                                    reservation.time
                                                ).toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusBadge status={reservation.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { label: 'Dashboard', href: '/dashboard' },
    ],
};