import type { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import type { User } from "./model";



const columns: TableColumn<User>[] = [
    {
        name: 'Avatar',
        selector: row => row.image,
        cell: row => <img src={row.image} width={40} height={40} alt="avatar" />,
        sortable: false,
    },
    {
        name: 'Name',
        selector: row => `${row.firstName} ${row.lastName}`,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
    },
    {
        name: 'Age',
        selector: row => row.age,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: row => row.phone,
        sortable: true,
    },
    {
        name: 'Birth Date',
        selector: row => row.birthDate,
        sortable: true,
    },
    {
        name: 'Blood Group',
        selector: row => row.bloodGroup,
        sortable: true,
    },
    {
        name: 'Height',
        selector: row => `${row.height} cm`,
        sortable: true,
    },
    {
        name: 'Weight',
        selector: row => `${row.weight} kg`,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => `${row.address.address}, ${row.address.city}, ${row.address.state} ${row.address.postalCode}`,
        sortable: true,
    },
    {
        name: 'Company',
        selector: row => `${row.company.name} - ${row.company.department}`,
        sortable: true,
    },
    {
        name: 'Role',
        selector: row => row.role,
        sortable: true,
    }
];

export const DataUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const fetchUsers = async (pageNumber = 1, rowsPerPage = perPage) => {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/users?page=${pageNumber}&limit=${rowsPerPage}`);
        const json = await res.json();
        console.log(json)
        setUsers(json.users);
        setTotalRows(json.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(page, perPage);
    }, [page, perPage]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        fetchUsers(page, newPerPage);
    };

    return (
        <DataTable
            columns={columns}
            data={users}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
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
                progress: {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        margin: '1rem 0',
                    }
                }
            }}
        />
    )
}