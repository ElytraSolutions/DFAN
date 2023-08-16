import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';
import { Tooltip } from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

const UpdateRequest = () => {
    const { userData } = useContext(UserContext);

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
            <div className="grow p-2 md:px-12 flex flex-col gap-4 pt-8 overflow-scroll">
                <h1 className="text-2xl font-bold">Update Requests</h1>
                <PendingUpdatesTable />
            </div>
        </div>
    );
};

const PendingUpdatesTable = () => {
    const [rows, setRows] = useState([]);

    const refresh = async () => {
        const resp = await fetch(`/api/admins/getUpdates`);
        if (!resp.ok) {
            toast.error('Error fetching invitation data');
            return;
        }
        const data = await resp.json();
        setRows(data.data);
    };

    const approveRequest = async (id: string) => {
        const resp = await fetch(`/api/admins/approveUpdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (!resp.ok) {
            toast.error('Error approving update request');
            return;
        }
        toast.success('Update request approved');
        await refresh();
    };

    const denyRequest = async (id: string) => {
        const resp = await fetch(`/api/admins/denyUpdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (!resp.ok) {
            toast.error('Error deleting update request');
            return;
        }
        toast.success('Update request denied');
        await refresh();
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            resizable: true,
            valueGetter: (params) => params.row.UserProfile.name || 'N/A',
        },
        {
            field: 'NFAMembershipNumber',
            headerName: 'NFA Membership Number',
            width: 250,
            resizable: true,
            valueGetter: (params) =>
                params.row.UserProfile.NFAMembershipNumber || 'N/A',
        },
        {
            field: 'Field',
            headerName: 'Field',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.field,
        },
        {
            field: 'Old Value',
            headerName: 'Old Value',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.oldValue,
        },
        {
            field: 'New Value',
            headerName: 'New Value',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.newValue,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            onClick={async (e) => {
                                e.stopPropagation();
                                approveRequest(params.row.id);
                            }}
                            className="w-full flex justify-center"
                        >
                            <Tooltip title="Accept Application">
                                <div>
                                    <AiOutlineCheck className="text-2xl text-green-500" />
                                </div>
                            </Tooltip>
                        </button>
                        <button
                            onClick={async (e) => {
                                e.stopPropagation();
                                denyRequest(params.row.id);
                            }}
                            className="w-full flex justify-center"
                        >
                            <Tooltip title="Reject Application">
                                <div>
                                    <MdDeleteForever className="text-2xl text-red-500" />
                                </div>
                            </Tooltip>
                        </button>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        (async () => await refresh())();
    }, []);

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
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default UpdateRequest;
