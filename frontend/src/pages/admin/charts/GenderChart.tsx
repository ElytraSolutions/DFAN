import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomSidebar from '~/components/CustomSidebar';
import UserContext from '~/context/User';
import BarChartWrapper from '~/components/charts/BarChartWrapper';
import CustomBarChart from '~/components/charts/CustomBarChart';

const GenderChart = () => {
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
            <div className="grow p-2 md:px-12 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Gender Distribution</h1>
                <BarChartWrapper>
                    <CustomBarChart
                        datakey="gender"
                        url="/api/admins/analytics?category=gender"
                    />
                    <p className="text-center">Gender</p>
                </BarChartWrapper>
            </div>
        </div>
    );
};

export default GenderChart;
