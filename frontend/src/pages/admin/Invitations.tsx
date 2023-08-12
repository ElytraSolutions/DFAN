import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';
import InviteUserForm from '~/components/InviteUserForm';
import { MdDeleteForever } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';

const Invitations = () => {
    const { userData } = useContext(UserContext);

    const [rows, setRows] = useState([]);
    const refresh = async () => {
        const queryParams = new URLSearchParams({
            offset: '0',
            limit: '100',
        });
        const resp = await fetch(
            `/api/admins/getInvitations?${queryParams.toString()}`,
        );
        if (!resp.ok) {
            toast.error('Error fetching invitation data');
            return;
        }
        const data = await resp.json();
        setRows(data.data);
    };
    useEffect(() => {
        refresh();
    }, []);

    if (
        userData?.role !== 'Central Admin' &&
        userData?.role !== 'Regional Admin'
    ) {
        toast.error('You are not authorized to view this page');
        return <Navigate to="/profile" />;
    }

    return (
        <div className="flex flex-row h-screen">
            <CustomSidebar />
            <div className="grow p-2 md:px-12 flex flex-col gap-4  overflow-scroll">
                <h1 className="text-2xl font-bold">Invitations</h1>
                <InviteUserForm callback={refresh} />
                <PendingRegistrationTab rows={rows} refresh={refresh} />
            </div>
        </div>
    );
};

const PendingRegistrationTab = ({
    rows,
    refresh,
}: {
    rows: any[];
    refresh: CallableFunction;
}) => {
    const deleteHandler = async (id: string) => {
        const resp = await fetch(`/api/admins/inviteUser/${id}`, {
            method: 'DELETE',
        });
        if (!resp.ok) {
            toast.error('Error deleting invitation');
            return;
        }
        await refresh();
        toast.success('Invitation deleted');
    };
    const columns: GridColDef[] = [
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'Invited at',
            width: 200,
            flex: 1,
            valueGetter: (params) => {
                const date = new Date(params.row.createdAt);
                const dateString = date
                    .toDateString()
                    .split(' ')
                    .slice(1)
                    .join(' ');
                const timeString = date.toLocaleTimeString();
                return `${dateString} ${timeString}`;
            },
        },
        {
            field: 'delete',
            headerName: 'Revoke Invitation',
            width: 150,
            renderCell: (params) => {
                return (
                    <button
                        onClick={async () =>
                            await deleteHandler(params.row.email)
                        }
                        className="w-full flex justify-center"
                    >
                        <Tooltip title="Delete">
                            <div>
                                <MdDeleteForever className="text-2xl text-red-500" />
                            </div>
                        </Tooltip>
                    </button>
                );
            },
        },
    ];
    return (
        <Box sx={{ height: '85%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default Invitations;
