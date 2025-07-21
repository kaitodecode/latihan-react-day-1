import { useEffect, useState } from 'react';
import DataTable, { type TableColumn } from 'react-data-table-component';
import axios from "axios"
import type { RootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, deleteStudent, fetchStudents, updateStudent } from '@/redux/slice/student';

export interface Student {
    id: string
    name: string
    phone: string
    email: string
    nim: string
    created_at: string
    updated_at: string
}

export interface StudentFormData {
    name: string
    phone: string
    email: string
    nim: string
}

export function DataStudents() {

    const dispatch = useDispatch();
    // Ambil data Mahasiswa dari Store
    const studentRedux = useSelector((state: RootState) => state.student);

    useEffect(() => {
        // Tambahkan kondisi ini
        if (studentRedux.list.length === 0) {
            dispatch(fetchStudents() as any);
        }
    }, [dispatch, studentRedux.list.length]); // Tambahkan

    const [filteredUsers, setFilteredUsers] = useState<Student[]>([]);
    const [perPage, setPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<StudentFormData>({
        name: '',
        phone: '',
        email: '',
        nim: ''
    });

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(addStudent(formData) as any);
            setIsCreateModalOpen(false);
            setFormData({ name: '', phone: '', email: '', nim: '' });
            
            alert('Student created successfully!');
        } catch (error) {
            console.error('Error creating student:', error);
            alert('Failed to create student');
        }
    };

    const handleEditClick = (student: Student) => {
        console.log(student)
        setSelectedStudent(student);
        setFormData({
            name: student.name,
            phone: student.phone,
            email: student.email,
            nim: student.nim
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent) return;

        try {
            dispatch(updateStudent({ id: selectedStudent.id, updatedData: formData }) as any);
            setIsEditModalOpen(false);
            setSelectedStudent(null);
            setFormData({ name: '', phone: '', email: '', nim: '' });
            alert('Student updated successfully!');
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Failed to update student');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                dispatch(deleteStudent(id) as any);
                alert('Student deleted successfully!');
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student');
            }
        }
    };

    const columns: TableColumn<Student>[] = [
        {
            name: 'NIM',
            selector: row => row.nim,
            sortable: false,
        },
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

    // Tidak perlu fetchStudents() di sini karena sudah ada di useEffect dengan kondisi di atas

    useEffect(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFilteredUsers(studentRedux.list.slice(startIndex, endIndex));
    }, [currentPage, perPage, studentRedux.list]);

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
                Add New Student
            </button>

            <DataTable
                columns={columns}
                data={filteredUsers}
                progressPending={studentRedux.loading}
                pagination
                paginationTotalRows={studentRedux.list.length}
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
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">NIM</label>
                                <input
                                    type="text"
                                    value={formData.nim}
                                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
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
                        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">NIM</label>
                                <input
                                    type="text"
                                    value={formData.nim}
                                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
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
