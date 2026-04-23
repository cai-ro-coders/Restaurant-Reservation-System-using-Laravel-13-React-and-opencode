import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Mail,
    Phone,
    Star,
    Calendar,
} from 'lucide-react';

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    notes: string | null;
    is_vip: boolean;
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

function VIPBadge({ isVip }: { isVip: boolean }) {
    if (!isVip) return null;
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            <Star className="h-3 w-3 fill-amber-800" />
            VIP
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

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [vipFilter, setVipFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        notes: '',
        is_vip: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchCustomers = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                ...(search && { search }),
                ...(vipFilter && { vip: vipFilter }),
            });
            const response = await fetch(`/api/customers?${params}`);
            const data = await response.json();
            setCustomers(data.customers);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [search, vipFilter]);

    const openCreateModal = () => {
        setSelectedCustomer(null);
        setError('');
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            notes: '',
            is_vip: false,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (customer: Customer) => {
        setSelectedCustomer(customer);
        setError('');
        setFormData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone || '',
            notes: customer.notes || '',
            is_vip: customer.is_vip,
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const method = selectedCustomer ? 'PUT' : 'POST';
            const url = selectedCustomer
                ? `/api/customers/${selectedCustomer.id}`
                : '/api/customers';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.message || 'Failed to save customer');
                return;
            }
            
            setIsModalOpen(false);
            fetchCustomers(pagination?.current_page);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedCustomer) return;
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/customers/${selectedCustomer.id}`, {
                method: 'DELETE',
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.message || 'Cannot delete customer');
                setIsDeleteModalOpen(false);
                return;
            }
            
            setIsDeleteModalOpen(false);
            fetchCustomers(pagination?.current_page);
        } catch (error) {
            console.error('Failed to delete customer:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePageChange = (page: number) => {
        fetchCustomers(page);
    };

    return (
        <>
            <Head title="Customers | Asian Food" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-[#1A1A1A]">
                            Customers
                        </h1>
                        <p className="mt-1 text-[#5A5A5A]">
                            Manage customer database
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 rounded-lg bg-[#C9A962] px-4 py-2 text-sm font-medium text-white hover:bg-[#B8943F]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Customer
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
                        value={vipFilter}
                        onChange={(e) => setVipFilter(e.target.value)}
                        className="rounded-lg border border-[#E8E4DE] py-2 pl-4 pr-8 text-sm outline-none focus:border-[#C9A962]"
                    >
                        <option value="">All Customers</option>
                        <option value="vip">VIP Only</option>
                        <option value="regular">Regular Only</option>
                    </select>
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
                                        Contact
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Notes
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-[#5A5A5A]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center">
                                            <div className="flex justify-center">
                                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C9A962] border-t-transparent" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : customers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-[#5A5A5A]"
                                        >
                                            No customers found
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b border-[#E8E4DE] last:border-0"
                                        >
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-[#1A1A1A]">
                                                    {customer.first_name}{' '}
                                                    {customer.last_name}
                                                </p>
                                                <p className="text-sm text-[#5A5A5A]">
                                                    Customer since{' '}
                                                    {new Date(
                                                        customer.created_at
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-3 w-3 text-[#5A5A5A]" />
                                                        <span className="text-[#5A5A5A]">
                                                            {customer.email}
                                                        </span>
                                                    </div>
                                                    {customer.phone && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone className="h-3 w-3 text-[#5A5A5A]" />
                                                            <span className="text-[#5A5A5A]">
                                                                {customer.phone}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <VIPBadge isVip={customer.is_vip} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="max-w-[200px] truncate text-sm text-[#5A5A5A]">
                                                    {customer.notes || '-'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(customer)
                                                        }
                                                        className="rounded p-1 hover:bg-[#FAF8F5]"
                                                    >
                                                        <Pencil className="h-4 w-4 text-[#5A5A5A]" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(customer)
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
                title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}
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
                                First Name *
                            </label>
                            <input
                                type="text"
                                value={formData.first_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        first_name: e.target.value,
                                    })
                                }
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                value={formData.last_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        last_name: e.target.value,
                                    })
                                }
                                required
                                className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                            Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            rows={3}
                            className="w-full rounded-lg border border-[#E8E4DE] py-2 px-3 text-sm outline-none focus:border-[#C9A962]"
                            placeholder="Any special preferences or notes..."
                        />
                    </div>

                    <div>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.is_vip}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        is_vip: e.target.checked,
                                    })
                                }
                                className="rounded border-[#C9A962] text-[#C9A962]"
                            />
                            <span className="text-sm text-[#1A1A1A]">
                                Mark as VIP customer
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
                                : selectedCustomer
                                ? 'Update'
                                : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Customer"
            >
                <div className="space-y-4">
                    <p className="text-[#5A5A5A]">
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-[#1A1A1A]">
                            {selectedCustomer?.first_name} {selectedCustomer?.last_name}
                        </span>
                        ? This action cannot be undone.
                    </p>
                    <p className="text-sm text-red-600">
                        Note: Customers with existing reservations cannot be
                        deleted.
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

Customers.layout = {
    breadcrumbs: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Customers', href: '/customers' },
    ],
};