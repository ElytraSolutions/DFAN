import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomSidebar from '~/components/CustomSidebar';
import UserContext from '~/context/User';
import BarChartWrapper from '~/components/charts/BarChartWrapper';
import CustomBarChart from '~/components/charts/CustomBarChart';

const MembershipRegionChart = () => {
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
                <h1 className="text-2xl font-bold">
                    Member Region Distribution
                </h1>
                <BarChartWrapper>
                    <CustomBarChart
                        datakey="membershipFrom"
                        url="/api/admins/analytics?category=membershipFrom"
                        process={(data: any[]) =>
                            data.map((datum) => ({
                                ...datum,
                                membershipFrom:
                                    datum.membershipFrom ?? 'Unknown',
                            }))
                        }
                    />
                    <p className="text-center">Membership Region</p>
                </BarChartWrapper>
            </div>
        </div>
    );
};

export default MembershipRegionChart;
