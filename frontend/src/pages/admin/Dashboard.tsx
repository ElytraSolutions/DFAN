import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';

const Dashboard = () => {
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
            <div className="grow p-2 md:px-12 flex flex-col gap-4 overflow-scroll">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div>Dashboard</div>
            </div>
        </div>
    );
};

export default Dashboard;
