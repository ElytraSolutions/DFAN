import { useContext, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { IGetRowsParams } from '@ag-grid-community/core';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

import ExpandableSidebar from '~/components/ExpandableSidebar';
import UserContext from '~/context/User';

import { ModuleRegistry } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Analytics from '~/components/Analytics';

ModuleRegistry.registerModules([InfiniteRowModelModule]);

const AdminView = () => {
    const [sideBarLinks] = useState([
        'Pending Registration',
        'Pending Verification',
        'Registered Users',
        'Analytics',
    ]);
    const { userData } = useContext(UserContext);

    if (
        userData?.role !== 'Central Admin' &&
        userData?.role !== 'Regional Admin'
    ) {
        toast.error('You are not authorized to view this page');
        return <Navigate to="/profile" />;
    }

    return (
        <ExpandableSidebar links={sideBarLinks}>
            {(currentView: string) => {
                return (
                    <div className="grow grid p-2 md:px-12 grid-rows-[min-content_1fr] gap-4">
                        <h1 className="text-2xl font-bold">{currentView}</h1>
                        <div className="ag-theme-alpine text-base mt-6">
                            {currentView === 'Registered Users' ? (
                                <RegisteredUsersTable />
                            ) : null}
                            {currentView === 'Pending Verification' ? (
                                <PendingVerificationUsersTable />
                            ) : null}
                            {currentView === 'Pending Registration' ? (
                                <PendingRegistrationTab />
                            ) : null}
                            {currentView === 'Analytics' ? <Analytics /> : null}
                        </div>
                    </div>
                );
            }}
        </ExpandableSidebar>
    );
};

const InvitationsDataSource = {
    getRows: (params: IGetRowsParams) => {
        const offset = params.startRow;
        const limit = params.endRow - params.startRow;
        const queryParams = new URLSearchParams({
            offset: offset.toString(),
            limit: limit.toString(),
        });
        fetch(`/api/admins/getInvitations?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                params.successCallback(data.data, data.count);
            })
            .catch((err) => {
                console.error(err);
                params.failCallback();
            });
    },
};
const RegisteredUsersDataSource = {
    getRows: (params: IGetRowsParams) => {
        const offset = params.startRow;
        const limit = params.endRow - params.startRow;
        const queryParams = new URLSearchParams({
            offset: offset.toString(),
            limit: limit.toString(),
            verified: 'approved',
        });
        fetch(`/api/admins/getUsers?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                params.successCallback(data.data, data.count);
            })
            .catch((err) => {
                console.error(err);
                params.failCallback();
            });
    },
};

const PendingVerificationDataSource = {
    getRows: (params: IGetRowsParams) => {
        const offset = params.startRow;
        const limit = params.endRow - params.startRow;
        const queryParams = new URLSearchParams({
            offset: offset.toString(),
            limit: limit.toString(),
            verified: 'pending',
        });
        fetch(`/api/admins/getUsers?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                params.successCallback(data.data, data.count);
            })
            .catch((err) => {
                console.error(err);
                params.failCallback();
            });
    },
};

const RegisteredUsersTable = () => {
    const [columnDefs] = useState([
        {
            field: 'UserProfile.NFAMembershipNumber',
            headerName: 'NFA Membership Number',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.name',
            headerName: 'Name',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.membershipFrom',
            headerName: 'Membership From',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.isLifeMember',
            headerName: 'Life Member',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'email',
            headerName: 'Email',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.gender',
            headerName: 'Gender',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.mobile',
            headerName: 'Mobile Number',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.currentAddress',
            headerName: 'Current Address',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.permanentAddress',
            headerName: 'Permanent Address',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.employmentStatus',
            headerName: 'Employment Status',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.employmentType',
            headerName: 'Employment Type',
            filter: 'agTextColumnFilter',
        },
    ]);

    const [defaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
        floatingFilter: true,
        suppressSizeToFit: true,
    });
    return (
        <AgGridReact
            rowModelType="infinite"
            datasource={RegisteredUsersDataSource}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            alwaysShowHorizontalScroll={true}
        ></AgGridReact>
    );
};

const PendingVerificationUsersTable = () => {
    const [columnDefs] = useState([
        {
            field: 'UserProfile.NFAMembershipNumber',
            headerName: 'NFA Membership Number',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.name',
            headerName: 'Name',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.membershipFrom',
            headerName: 'Membership From',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.isLifeMember',
            headerName: 'Life Member',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'email',
            headerName: 'Email',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.gender',
            headerName: 'Gender',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.mobile',
            headerName: 'Mobile Number',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.currentAddress',
            headerName: 'Current Address',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.permanentAddress',
            headerName: 'Permanent Address',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.employmentStatus',
            headerName: 'Employment Status',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'UserProfile.employmentType',
            headerName: 'Employment Type',
            filter: 'agTextColumnFilter',
        },
    ]);

    const [defaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
        floatingFilter: true,
        suppressSizeToFit: true,
    });
    return (
        <AgGridReact
            rowModelType="infinite"
            datasource={PendingVerificationDataSource}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            alwaysShowHorizontalScroll={true}
        ></AgGridReact>
    );
};

const PendingRegistrationTab = () => {
    const [userEmail, setUserEmail] = useState('');
    const [columnDefs] = useState([
        {
            field: 'email',
            headerName: 'Email',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'createdAt',
            headerName: 'Invited at',
            filter: 'agTextColumnFilter',
        },
    ]);

    const [defaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
        floatingFilter: true,
        suppressSizeToFit: true,
    });
    return (
        <>
            <form
                className="m-4 text-md"
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch(`/api/admins/inviteUser`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: userEmail }),
                    })
                        .then((res) => res.json())
                        .then(() => {
                            toast.success('Invitation sent successfully');
                        })
                        .catch((err) => {
                            console.error(err);
                            toast.error('Error sending invitation');
                        });
                }}
            >
                <label htmlFor="email" className="">
                    Email
                </label>
                <input
                    type="email"
                    className="mx-2 border-2 border-gray-300 rounded-md p-1"
                    id="email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                    type="submit"
                    value="Invite"
                    className="bg-blue-500 text-white rounded-md mx-2 p-2"
                />
            </form>
            <AgGridReact
                rowModelType="infinite"
                datasource={InvitationsDataSource}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                alwaysShowHorizontalScroll={true}
            ></AgGridReact>
        </>
    );
};

export default AdminView;
