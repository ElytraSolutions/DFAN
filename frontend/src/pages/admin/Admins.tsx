import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { MdExpandMore } from 'react-icons/md';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import InviteAdminForm from '~/components/InviteAdminForm';

const Admins = () => {
    const { userData } = useContext(UserContext);
    const [expanded, setExpanded] = useState(false);

    const [rows, setRows] = useState([]);
    const refresh = async () => {
        const queryParams = new URLSearchParams({
            offset: '0',
            limit: '100',
            filters: JSON.stringify({
                role: ['Central Admin', 'Regional Admin'],
            }),
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
    const handleChange = (
        __event: React.SyntheticEvent,
        isExpanded: boolean,
    ) => {
        setExpanded(isExpanded);
    };

    return (
        <div className="flex flex-row h-screen">
            <CustomSidebar />
            <div className="grow p-2 md:px-12 flex flex-col gap-4  overflow-scroll">
                <h1 className="text-2xl font-bold">Admins Data</h1>
                <Accordion expanded={expanded} onChange={handleChange}>
                    <AccordionSummary expandIcon={<MdExpandMore />}>
                        Invite Admin
                    </AccordionSummary>
                    <AccordionDetails>
                        <InviteAdminForm callback={refresh} />
                    </AccordionDetails>
                </Accordion>
                <AdminsTable rows={rows} />
            </div>
        </div>
    );
};

function AdminsTable({ rows }: { rows: any[] }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const closeModal = () => {
        setOpenModal(false);
        setSelectedRowData(null);
    };
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 180, resizable: true },
        {
            field: 'Name',
            headerName: 'Name',
            width: 250,
            resizable: true,
            valueGetter: (params) => params.row.UserProfile.name || 'N/A',
        },
        {
            field: 'Role',
            headerName: 'Role',
            width: 150,
            resizable: true,
            valueGetter: (params) => params.row.role || 'N/A',
        },
    ];
    const rowClickHandler: GridEventListener<'rowClick'> = (params) => {
        const AselectedRow = params.row;
        setSelectedRowData(AselectedRow);
        setOpenModal(true);
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
            <Dialog open={openModal} onClose={closeModal}>
                <DialogTitle className="flex justify-center p-[50px] bg-[#555] font-bold text-white">
                    Details
                    <AiOutlineClose
                        className="absolute right-3 top-5 cursor-pointer text-2xl"
                        onClick={closeModal}
                    />
                </DialogTitle>
                <DialogContent>
                    <>
                        {selectedRowData && (
                            <div className="flex flex-col items-center p-3">
                                {selectedRowData['UserProfile']['avatar'] !==
                                    null && (
                                    <>
                                        <img
                                            className="w-[10vw] rounded-[50px] pb-4"
                                            src={`/api/avatars/${selectedRowData['UserProfile']['avatar']}`}
                                            alt=""
                                        />
                                    </>
                                )}
                                {selectedRowData['UserProfile']['avatar'] ===
                                    null && (
                                    <>
                                        <img
                                            className="w-[10vw] pb-4"
                                            src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                                            alt=""
                                        />
                                    </>
                                )}
                                <div className="w-[50vw]"></div>
                                <p className="font-semibold ">
                                    Name:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {selectedRowData['UserProfile']['name']}
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Life Member:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {selectedRowData['UserProfile'][
                                            'isLifeMember'
                                        ]
                                            ? 'Yes'
                                            : 'No'}
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    NFA ID:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'NFAMembershipNumber'
                                            ]
                                        }
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Email:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {selectedRowData['email']}
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Role:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {selectedRowData['role']}
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Membership From:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'membershipFrom'
                                            ]
                                        }
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Gender:
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'gender'
                                            ]
                                        }
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Mobile Number:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'mobile'
                                            ]
                                        }
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Current Address:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'currentAddress'
                                            ]
                                        }
                                    </span>
                                </p>
                                <p className="font-semibold ">
                                    Permanent Address:{' '}
                                    <span className="font-bold text-[#005500]">
                                        {
                                            selectedRowData['UserProfile'][
                                                'permanentAddress'
                                            ]
                                        }
                                    </span>
                                </p>
                            </div>
                        )}
                    </>
                    <hr />
                    <div className="flex justify-center gap-[3vw] mx-auto my-5">
                        <button className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-[#2A4A29] text-white font-medium md:mr-4 hover:bg-white hover:text-[#2A4A29] hover:font-bold hover:outline ">
                            payment History
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default Admins;
