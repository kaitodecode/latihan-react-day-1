import type { Owner } from "./model"
import { useEffect, useState } from 'react';
import DataTable, { type TableColumn } from 'react-data-table-component';

const columns: TableColumn<Owner>[] = [
    {
        name: 'Avatar',
        selector: row => row.avatar,
        cell: row => <img src={row.avatar} width={40} height={40} alt="avatar" />,
        sortable: false,
    },
    {
        name: 'Name',
        selector: row => `${row.first_name} ${row.last_name}`,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
];

export function DataOwner() {
    const [users, setUsers] = useState<Owner[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(6);

    const fetchUsers = async (pageNumber = 1, rowsPerPage = perPage) => {
        setLoading(true);
        const res = await fetch(`https://reqres.in/api/users?page=${pageNumber}&per_page=${rowsPerPage}`, {
            headers: {
                "x-api-key": "reqres-free-v1"
            }
        });
        const json = await res.json();
        setUsers(json.data);
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
    );
}
