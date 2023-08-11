import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';

const RegisteredUsers = () => {
    const { userData } = useContext(UserContext);

    if (
        userData?.role !== 'Central Admin' &&
        userData?.role !== 'Regional Admin'
    ) {
        toast.error('You are not authorized to view this page');
        return <Navigate to="/profile" />;
    }

    return (
        <div className="flex flex-row h-screen overflow-scroll">
            <CustomSidebar />
            <div className="grow p-2 md:px-12 flex flex-col gap-4 pt-8">
                <h1 className="text-2xl font-bold">Users</h1>
                <RegisteredUsersTable />
            </div>
        </div>
    );
};

const RegisteredUsersTable = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 180, resizable: true },
        {
            field: 'NFAMembershipNumber',
            headerName: 'NFA Membership Number',
            width: 250,
            resizable: true,
            valueGetter: (params) =>
                params.row.UserProfile.NFAMembershipNumber || 'N/A',
        },
        {
            field: 'Name',
            headerName: 'Name',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.UserProfile.name || 'N/A',
        },
        {
            field: 'Gender',
            headerName: 'Gender',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.UserProfile.gender || 'N/A',
        },
        {
            field: 'Mobile Number',
            headerName: 'Mobile Number',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.UserProfile.mobile || 'N/A',
        },
    ];
    useEffect(() => {
        (async () => {
            const queryParams = new URLSearchParams({
                offset: '0',
                limit: '100',
                verified: 'approved',
            });
            const resp = await fetch(
                `/api/admins/getUsers?${queryParams.toString()}`,
            );
            if (!resp.ok) {
                toast.error('Error fetching invitation data');
                return;
            }
            const data = await resp.json();
            setRows(data.data);
        })();
    }, []);
    const rowClickHandler: GridEventListener<'rowClick'> = (params) => {
        const id = params.row.id;
        navigate(`/admin/showProfile/${id}`);
    };
    return (
        <Box sx={{ height: '90%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                onRowClick={rowClickHandler}
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default RegisteredUsers;
