import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Armchair,
    MapPin,
    Users,
} from 'lucide-react';

interface Table {
    id: number;
    table_number: string;
    capacity: number;
    location: string;
    description: string | null;
    is_active: boolean;
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

const locationOptions = [
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'vip', label: 'VIP' },
    { value: 'bar', label: 'Bar' },
    { value: 'private', label: 'Private' },
];

const locationStyles: Record<string, string> = {
    indoor: 'bg-blue-100 text-blue-800',
    outdoor: 'bg-green-100 text-green-800',
    vip: 'bg-amber-100 text-amber-800',
    bar: 'bg-purple-100 text-purple-800',
    private: 'bg-rose-100 text-rose-800',
};

function LocationBadge({ location }: { location: string }) {
    return (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${locationStyles[location] || 'bg-gray-100 text-gray-800'}`}>
            {location}
        </span>
    );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isActive ? 'Active' : 'Inactive'}
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
            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
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

export default function Tables() {
    const [tables, setTables] = useState<Table[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [formData, setFormData] = useState({
        table_number: '',
        capacity: '2',
        location: 'indoor',
        description: '',
        is_active: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchTables = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                ...(search && { search }),
                ...(locationFilter && { location: locationFilter }),
            });
            const response = await fetch(`/api/tables?${params}`);
            const data = await response.json();
            setTables(data.tables);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch tables:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, [search, locationFilter]);

    const openCreateModal = () => {
        setSelectedTable(null);
        setError('');
        setFormData({
            table_number: '',
            capacity: '2',
            location: 'indoor',
            description: '',
            is_active: true,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (table: Table) => {
        setSelectedTable(table);
        setError('');
        setFormData({
            table_number: table.table_number,
            capacity: table.capacity.toString(),
            location: table.location,
            description: table.description || '',
            is_active: table.is_active,
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (table: Table) => {
        setSelectedTable(table);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const method = selectedTable ? 'PUT' : 'POST';
            const url = selectedTable ? `/api/tables/${selectedTable.id}` : '/api/tables';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.message || 'Failed to save table');
                return;
            }
            
            setIsModalOpen(false);
            fetchTables(pagination?.current_page);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedTable) return;
        setIsSubmitting(true);
        try {
            await fetch(`/api/tables/${selectedTable.id}`, {
                method: 'DELETE',
            });
            setIsDeleteModalOpen(false);
            fetchTables(pagination?.current_page);
        } catch (error) {
            console.error('Failed to delete table:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePageChange = (page: number) => {
        fetchTables(page);
    };

    return (
        <>
            <Head title="Tables | Asian Food" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-[#1A1A1A]">
                            Tables
                        </h1>
                        <p className="mt-1 text-[#5A5A5A]">
                            Manage restaurant tables
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 rounded-lg bg-[#C9A962] px-4 py-2 text-sm font-medium text-white hover:bg-[#B8943F]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Table
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 rounded-xl border border-[#E8E4DE] bg-white p-4 shadow-sm">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5A5A]" />
                        <input
                            type="text"
                            placeholder="Search by table number..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#C9A962]"
                        />
                    </div>
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="rounded-lg border border-[#E8E4DE] py-2 pl-4 pr-8 text-sm outline-none focus:border-[#C9A962]"
                    >
                        <option value="">All Locations</option>
                        {locationOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="rounded-xl border border-[#E8E4DE] bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E8E4DE] bg-[#FAF8F5]">
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Table
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Capacity
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Location
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Description
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
                                ) : tables.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-[#5A5A5A]"
                                        >
                                            No tables found
                                        </td>
                                    </tr>
                                ) : (
                                    tables.map((table) => (
                                        <tr
                                            key={table.id}
                                            className="border-b border-[#E8E4DE] last:border-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Armchair className="h-4 w-4 text-[#C9A962]" />
                                                    <span className="font-medium text-[#1A1A1A]">
                                                        {table.table_number}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Users className="h-3 w-3 text-[#5A5A5A]" />
                                                    <span>{table.capacity}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <LocationBadge location={table.location} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="max-w-[200px] truncate text-sm text-[#5A5A5A]">
                                                    {table.description || '-'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge isActive={table.is_active} />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(table)
                                                        }
                                                        className="rounded p-1 hover:bg-[#FAF8F5]"
                                                    >
                                                        <Pencil className="h-4 w-4 text-[#5A5A5A]" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(table)
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
                title={selectedTable ? 'Edit Table' : 'Add Table'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="rounded bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Table Number *
                            </label>
                            <input
                                type="text"
                                value={formData.table_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        table_number: e.target.value.toUpperCase(),
                                    })
                                }
                                required
                                placeholder="e.g., T1, VIP1, O1"
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Capacity *
                            </label>
                            <select
                                value={formData.capacity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        capacity: e.target.value,
                                    })
                                }
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Location *
                        </label>
                        <select
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                            required
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                        >
                            {locationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={2}
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            placeholder="Optional description..."
                        />
                    </div>

                    <div>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        is_active: e.target.checked,
                                    })
                                }
                                className="rounded border-[#C9A962] text-[#C9A962]"
                            />
                            <span className="text-sm text-[#1A1A1A]">
                                Table is active
                            </span>
                        </label>
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
                                : selectedTable
                                ? 'Update'
                                : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Table"
            >
                <div className="space-y-4">
                    <p className="text-[#5A5A5A]">
                        Are you sure you want to delete table{' '}
                        <span className="font-medium text-[#1A1A1A]">
                            {selectedTable?.table_number}
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

Tables.layout = {
    breadcrumbs: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Tables', href: '/tables' },
    ],
};