import GenderChart from './charts/GenderChart';
import MembershipChart from './charts/MembershipChart';
import EmploymentStatusChart from './charts/EmploymentStatusChart';
import EmploymentTypeChart from './charts/EmploymentTypeChart';
import LifeMemberChart from './charts/LifeMemberChart';

function Analytics() {
    const chartWrapperClass = 'h-72 w-72';
    const chartCaptionClass = 'text-center relative top-[19rem]';
    return (
        <div
            className="place-content-start"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr)',
                placeContent: 'start',
            }}
        >
            <div className={chartWrapperClass}>
                <GenderChart />
                <p className={chartCaptionClass}>Gender</p>
            </div>

            <div className={chartWrapperClass}>
                <MembershipChart />
                <p className={chartCaptionClass}>Membership</p>
            </div>

            <div className={chartWrapperClass}>
                <EmploymentStatusChart />
                <p className={chartCaptionClass}>Employment Status</p>
            </div>

            <div className={chartWrapperClass}>
                <EmploymentTypeChart />
                <p className={chartCaptionClass}>Employment Type</p>
            </div>

            <div className={chartWrapperClass}>
                <LifeMemberChart />
                <p className={chartCaptionClass}>Life Member</p>
            </div>
        </div>
    );
}

export default Analytics;
