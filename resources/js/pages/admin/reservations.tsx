import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Calendar,
    Clock,
    Users,
    CheckCircle,
    XCircle,
    AlertCircle,
} from 'lucide-react';

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface Table {
    id: number;
    table_number: string;
    capacity: number;
    location: string;
}

interface Reservation {
    id: number;
    customer_id: number;
    customer: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    reservation_date: string;
    reservation_time: string;
    guest_count: number;
    status: string;
    special_requests: string | null;
    tables: Array<{ id: number; table_number: string; capacity: number }>;
    created_at: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
    completed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
};

function StatusBadge({ status }: { status: string }) {
    const style = statusStyles[status] || statusStyles.pending;
    const Icon = style.icon;
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
            <Icon className="h-3 w-3" />
            <span className="capitalize">{status}</span>
        </span>
    );
}

function Modal({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-medium text-[#1A1A1A]">{title}</h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-[#FAF8F5]">
                        <X className="h-5 w-5 text-[#5A5A5A]" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [availableTables, setAvailableTables] = useState<Table[]>([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        reservation_date: '',
        reservation_time: '',
        guest_count: '2',
        table_ids: [] as number[],
        special_requests: '',
        status: 'pending',
        auto_approve: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchReservations = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                ...(search && { search }),
                ...(statusFilter && { status: statusFilter }),
                ...(dateFilter && { date: dateFilter }),
            });
            const response = await fetch(`/api/reservations?${params}`);
            const data = await response.json();
            setReservations(data.reservations);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('/api/reservations/customers');
            const data = await response.json();
            setCustomers(data.customers);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    const fetchAvailableTables = async () => {
        if (!formData.reservation_date || !formData.reservation_time || !formData.guest_count) {
            setAvailableTables([]);
            return;
        }
        try {
            const params = new URLSearchParams({
                date: formData.reservation_date,
                time: formData.reservation_time,
                guests: formData.guest_count,
            });
            const response = await fetch(`/api/reservations/tables?${params}`);
            const data = await response.json();
            setAvailableTables(data.tables);
        } catch (error) {
            console.error('Failed to fetch tables:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [search, statusFilter, dateFilter]);

    useEffect(() => {
        if (isModalOpen) {
            fetchCustomers();
            if (selectedReservation) {
                setFormData({
                    customer_id: selectedReservation.customer_id.toString(),
                    reservation_date: selectedReservation.reservation_date.split('T')[0],
                    reservation_time: selectedReservation.reservation_time.substring(0, 5),
                    guest_count: selectedReservation.guest_count.toString(),
                    table_ids: selectedReservation.tables.map((t) => t.id),
                    special_requests: selectedReservation.special_requests || '',
                    status: selectedReservation.status,
                    auto_approve: false,
                });
            } else {
                setFormData({
                    customer_id: '',
                    reservation_date: '',
                    reservation_time: '',
                    guest_count: '2',
                    table_ids: [],
                    special_requests: '',
                    status: 'pending',
                    auto_approve: false,
                });
            }
        }
    }, [isModalOpen, selectedReservation]);

    const openCreateModal = () => {
        setSelectedReservation(null);
        setFormData({
            customer_id: '',
            reservation_date: '',
            reservation_time: '',
            guest_count: '2',
            table_ids: [],
            special_requests: '',
            status: 'pending',
            auto_approve: false,
        });
        setAvailableTables([]);
        setIsModalOpen(true);
    };

    const openEditModal = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const openDeleteModal = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsDeleteModalOpen(true);
    };

    const handleTableChange = () => {
        fetchAvailableTables();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = {
                ...formData,
                table_ids: formData.table_ids,
            };
            if (selectedReservation) {
                await fetch(`/api/reservations/${selectedReservation.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } else {
                await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }
            setIsModalOpen(false);
            fetchReservations(pagination?.current_page);
        } catch (error) {
            console.error('Failed to save reservation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedReservation) return;
        setIsSubmitting(true);
        try {
            await fetch(`/api/reservations/${selectedReservation.id}`, {
                method: 'DELETE',
            });
            setIsDeleteModalOpen(false);
            fetchReservations(pagination?.current_page);
        } catch (error) {
            console.error('Failed to delete reservation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePageChange = (page: number) => {
        fetchReservations(page);
    };

    return (
        <>
            <Head title="Reservations | Asian Food" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-[#1A1A1A]">
                            Reservations
                        </h1>
                        <p className="mt-1 text-[#5A5A5A]">
                            Manage restaurant reservations
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 rounded-lg bg-[#C9A962] px-4 py-2 text-sm font-medium text-white hover:bg-[#B8943F]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Reservation
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 rounded-xl border border-[#E8E4DE] bg-white p-4 shadow-sm">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5A5A]" />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#C9A962]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-[#E8E4DE] py-2 pl-4 pr-8 text-sm outline-none focus:border-[#C9A962]"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="rounded-lg border border-[#E8E4DE] py-2 pl-4 pr-4 text-sm outline-none focus:border-[#C9A962]"
                    />
                </div>

                <div className="rounded-xl border border-[#E8E4DE] bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E8E4DE] bg-[#FAF8F5]">
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Customer
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Date & Time
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Guests
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Tables
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center">
                                            <div className="flex justify-center">
                                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C9A962] border-t-transparent" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : reservations.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-[#5A5A5A]"
                                        >
                                            No reservations found
                                        </td>
                                    </tr>
                                ) : (
                                    reservations.map((reservation) => (
                                        <tr
                                            key={reservation.id}
                                            className="border-b border-[#E8E4DE] last:border-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium text-[#1A1A1A]">
                                                        {reservation.customer.first_name}{' '}
                                                        {reservation.customer.last_name}
                                                    </p>
                                                    <p className="text-sm text-[#5A5A5A]">
                                                        {reservation.customer.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="h-4 w-4 text-[#5A5A5A]" />
                                                    <span>
                                                        {new Date(
                                                            reservation.reservation_date
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {reservation.reservation_time.substring(
                                                            0,
                                                            5
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Users className="h-4 w-4 text-[#5A5A5A]" />
                                                    <span>{reservation.guest_count}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {reservation.tables.map(
                                                        (table) => (
                                                            <span
                                                                key={table.id}
                                                                className="rounded bg-[#FAF8F5] px-2 py-0.5 text-xs"
                                                            >
                                                                {table.table_number}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={reservation.status} />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(reservation)
                                                        }
                                                        className="rounded p-1 hover:bg-[#FAF8F5]"
                                                    >
                                                        <Pencil className="h-4 w-4 text-[#5A5A5A]" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(reservation)
                                                        }
                                                        className="rounded p-1 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination && pagination.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-[#E8E4DE] px-4 py-3">
                            <p className="text-sm text-[#5A5A5A]">
                                Showing {pagination.from} to {pagination.to} of{' '}
                                {pagination.total} results
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(pagination.current_page - 1)
                                    }
                                    disabled={pagination.current_page === 1}
                                    className="rounded border border-[#E8E4DE] px-3 py-1 text-sm disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        handlePageChange(pagination.current_page + 1)
                                    }
                                    disabled={pagination.current_page === pagination.last_page}
                                    className="rounded border border-[#E8E4DE] px-3 py-1 text-sm disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedReservation ? 'Edit Reservation' : 'Add Reservation'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Customer *
                        </label>
                        <select
                            value={formData.customer_id}
                            onChange={(e) =>
                                setFormData({ ...formData, customer_id: e.target.value })
                            }
                            required
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                        >
                            <option value="">Select customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.first_name} {customer.last_name} -{' '}
                                    {customer.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Date *
                            </label>
                            <input
                                type="date"
                                value={formData.reservation_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        reservation_date: e.target.value,
                                    })
                                }
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Time *
                            </label>
                            <input
                                type="time"
                                value={formData.reservation_time}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        reservation_time: e.target.value,
                                    })
                                }
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Guests *
                            </label>
                            <select
                                value={formData.guest_count}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        guest_count: e.target.value,
                                    });
                                    handleTableChange();
                                }}
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedReservation && (
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                    Status *
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {!selectedReservation && (
                        <>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleTableChange}
                                    disabled={
                                        !formData.reservation_date ||
                                        !formData.reservation_time
                                    }
                                    className="text-sm text-[#C9A962] disabled:opacity-50"
                                >
                                    Check available tables
                                </button>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                    Select Tables *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableTables.map((table) => (
                                        <label
                                            key={table.id}
                                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                                                formData.table_ids.includes(table.id)
                                                    ? 'border-[#C9A962] bg-[#FAF8F5]'
                                                    : 'border-[#E8E4DE]'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.table_ids.includes(
                                                    table.id
                                                )}
                                                onChange={(e) => {
                                                    const updated = e.target.checked
                                                        ? [
                                                              ...formData.table_ids,
                                                              table.id,
                                                          ]
                                                        : formData.table_ids.filter(
                                                              (id) =>
                                                                  id !==
                                                                  table.id
                                                          );
                                                    setFormData({
                                                        ...formData,
                                                        table_ids: updated,
                                                    });
                                                }}
                                                className="rounded border-[#C9A962] text-[#C9A962]"
                                            />
                                            {table.table_number} ({table.capacity})
                                        </label>
                                    ))}
                                </div>
                                {availableTables.length === 0 &&
                                    formData.reservation_date &&
                                    formData.reservation_time && (
                                        <p className="mt-2 text-sm text-[#5A5A5A]">
                                            No available tables for the selected date and
                                            time.
                                        </p>
                                    )}
                            </div>

                            <div>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.auto_approve}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                auto_approve: e.target.checked,
                                            })
                                        }
                                        className="rounded border-[#C9A962] text-[#C9A962]"
                                    />
                                    <span className="text-sm text-[#1A1A1A]">
                                        Auto-approve reservation
                                    </span>
                                </label>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Special Requests
                        </label>
                        <textarea
                            value={formData.special_requests}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    special_requests: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            placeholder="Any special requests or dietary requirements..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="rounded-lg border border-[#E8E4DE] px-4 py-2 text-sm text-[#5A5A5A]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-[#C9A962] px-4 py-2 text-sm font-medium text-white hover:bg-[#B8943F] disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'Saving...'
                                : selectedReservation
                                ? 'Update'
                                : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Reservation"
            >
                <div className="space-y-4">
                    <p className="text-[#5A5A5A]">
                        Are you sure you want to delete this reservation for{' '}
                        <span className="font-medium text-[#1A1A1A]">
                            {selectedReservation?.customer.first_name}{' '}
                            {selectedReservation?.customer.last_name}
                        </span>
                        ? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="rounded-lg border border-[#E8E4DE] px-4 py-2 text-sm text-[#5A5A5A]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Reservations.layout = {
    breadcrumbs: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Reservations', href: '/reservations' },
    ],
};