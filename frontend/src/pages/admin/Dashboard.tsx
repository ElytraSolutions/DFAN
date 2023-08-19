import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserContext from '~/context/User';
import CustomSidebar from '~/components/CustomSidebar';
import TotalUsers from '~/components/dashboard/TotalUsers';
import NewUsers from '~/components/dashboard/NewUsers';
import Revenue from '~/components/dashboard/Revenue';
import RevenueGraph from '~/components/dashboard/RevenueGraph';

import RecentTranstractions from '~/components/dashboard/RecentTransactions';
import BarChart from '../../components/charts/BarChart';

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
            <div className="grow m-0 md:px-6 flex flex-col gap-4 overflow-scroll dark:bg-black dark:text-white py-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div>Dashboard</div>
                <div className="grid grid-cols-12 content-between place-content-between gap-x-24 gap-y-8">
                    <div className="col-span-4">
                        <TotalUsers totalUsers={2000} lastMonth={1800} />
                    </div>

                    <div className="col-span-4">
                        <NewUsers newUsers={100} lastMonth={150} />
                    </div>

                    <div className="col-span-4">
                        <Revenue currentMonth={25000} lastMonth={20000} />
                    </div>

                    <div className="col-span-8">
                        <RevenueGraph />
                    </div>
                    <div className="col-span-4 h-72 max-h-screen">
                        <RecentTranstractions />
                    </div>

                    {/* barchart */}
                    <div className="col-span-4  h-72 max-h-screen">
                        <h1 className="ml-6">Sales Quantity</h1>
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
