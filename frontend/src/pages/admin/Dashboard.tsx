import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';
import TotalUsers from '~/components/dashboard/TotalUsers';
import NewUsers from '~/components/dashboard/NewUsers';
import Revenue from '~/components/dashboard/Revenue';
import RevenueGraph from '~/components/dashboard/RevenueGraph';
import NepalMap from '~/components/NepalMap';

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
            <div className="grow p-2 md:px-12 flex flex-col gap-4 overflow-scroll dark:bg-black dark:text-white py-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div>Dashboard</div>
                <div className="flex flex-row gap-36">
                    <div className="w-96 h-48">
                        <TotalUsers totalUsers={2000} lastMonth={1800} />
                    </div>
                    <div className="w-96 h-48">
                        <NewUsers newUsers={100} lastMonth={150} />
                    </div>
                    <div className="w-96 h-48">
                        <Revenue currentMonth={25000} lastMonth={20000} />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-fit">
                        <RevenueGraph />
                    </div>
                </div>
                <div className="w-10/12">
                    <NepalMap />
                </div>
                <div>Some other text</div>
            </div>
        </div>
    );
};

export default Dashboard;
