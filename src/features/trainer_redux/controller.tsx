import { useEffect, useState } from 'react';
import DataTable, { type TableColumn } from 'react-data-table-component';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addtrainer, deletetrainer, fetchTrainer, updatetrainer } from '@/redux/slice/trainer';
import type { RootState } from '@/redux';

export interface Trainer {
    id: string
    name: string
    phone: string
    email: string
    status: string
    linkedin: string
    gender: string
    created_at: string
    updated_at: string
}

export interface TrainerFormData {
    name: string
    phone: string
    email: string
    status: string
    linkedin: string
    gender: string
}

export function DataTrainer() {
    const dispatch = useDispatch()
    const [filteredUsers, setFilteredUsers] = useState<Trainer[]>([]);
    const [perPage, setPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [formData, setFormData] = useState<TrainerFormData>({
        name: '',
        phone: '',
        email: '',
        status: '',
        linkedin: '',
        gender: ''
    });
    const trainerRedux = useSelector((state:RootState)=>state.trainer)

    useEffect(() => {
        // Fetch trainer data only if the list is empty
        if (trainerRedux.list.length === 0) {
            dispatch(fetchTrainer() as any);
            console.log(trainerRedux.list)
        }
    }, [dispatch, trainerRedux.list.length]);


    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(addtrainer(formData) as any)
            setIsCreateModalOpen(false);
            setFormData({ name: '', phone: '', email: '', status: '', linkedin: '', gender: '' });
            alert('Trainer created successfully!');
        } catch (error) {
            console.error('Error creating Trainer:', error);
            alert('Failed to create Trainer');
        }
    };

    const handleEditClick = (trainer: Trainer) => {
        setSelectedTrainer(trainer);
        setFormData({
            name: trainer.name,
            phone: trainer.phone,
            email: trainer.email,
            status: trainer.status,
            linkedin: trainer.linkedin,
            gender: trainer.gender
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTrainer) return;

        try {
            dispatch(updatetrainer({id:selectedTrainer.id,updatedData:formData}) as any)
            setIsEditModalOpen(false);
            setSelectedTrainer(null);
            setFormData({ name: '', phone: '', email: '', status: '', linkedin: '', gender: '' });
            alert('Trainer updated successfully!');
        } catch (error) {
            console.error('Error updating Trainer:', error);
            alert('Failed to update Trainer');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Trainer?')) {
            try {
                dispatch(deletetrainer(id) as any)
                alert('Trainer deleted successfully!');
            } catch (error) {
                console.error('Error deleting Trainer:', error);
                alert('Failed to delete Trainer');
            }
        }
    };

    const columns: TableColumn<Trainer>[] = [
        {
            name: 'Name',
            selector: row => `${row.name}`,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'LinkedIn',
            selector: row => row.linkedin,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEditClick(row)}
                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];


    useEffect(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFilteredUsers(trainerRedux.list.slice(startIndex, endIndex));
    }, [currentPage, perPage, trainerRedux.list]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Add New Trainer
            </button>

            <DataTable
                columns={columns}
                data={filteredUsers}
                progressPending={trainerRedux.loading}
                pagination
                paginationTotalRows={trainerRedux.list.length}
                paginationPerPage={perPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                highlightOnHover
                responsive
                customStyles={{
                    headRow: {
                        style: {
                            backgroundColor: '#f3f4f6',
                            fontSize: '0.875rem',
                            color: '#374151',
                            fontWeight: 'bold',
                            padding: '1rem',
                        },
                    },
                    rows: {
                        style: {
                            fontSize: '0.875rem',
                            padding: '1rem',
                            '&:hover': {
                                backgroundColor: '#f9fafb',
                            },
                        },
                    },
                    pagination: {
                        style: {
                            marginTop: '2rem',
                            padding: '1rem',
                        },
                    },
                }}
            />

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Trainer</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Trainer</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
