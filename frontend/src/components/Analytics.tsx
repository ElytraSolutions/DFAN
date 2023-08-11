import CustomBarChart from './charts/CustomBarChart';
import TimelineChart from './charts/TimeLine';

function Analytics() {
    return (
        <div
            className="place-content-start"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat( auto-fit, minmax(30rem, 1fr)',
                placeContent: 'start',
            }}
        >
            <BarChartWrapper>
                <CustomBarChart
                    datakey="gender"
                    url="/api/admins/analytics?category=gender"
                />
                <p className="text-center">Gender</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <CustomBarChart
                    datakey="membershipFrom"
                    url="/api/admins/analytics?category=membershipFrom"
                    process={(data: any[]) =>
                        data.map((datum) => ({
                            ...datum,
                            membershipFrom: datum.membershipFrom ?? 'Unknown',
                        }))
                    }
                />
                <p className="text-center">Membership Region</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <CustomBarChart
                    datakey="employmentStatus"
                    url="/api/admins/analytics?category=employmentStatus"
                />
                <p className="text-center">Employment Status</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <CustomBarChart
                    datakey="employmentType"
                    url="/api/admins/analytics?category=employmentType"
                    process={(data: any[]) =>
                        data.map((datum) => ({
                            ...datum,
                            employmentType:
                                datum.employmentType ?? 'Unemployed',
                        }))
                    }
                />
                <p className="text-center">Employment Type</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <CustomBarChart
                    datakey="isLifeMember"
                    url="/api/admins/analytics?category=isLifeMember"
                    process={(data: any[]) =>
                        data.map((datum) => {
                            let isLifeMember;
                            if (datum.isLifeMember === null) {
                                isLifeMember = 'Non-Member';
                            } else {
                                isLifeMember = datum.isLifeMember
                                    ? 'Yes'
                                    : 'No';
                            }
                            return {
                                ...datum,
                                isLifeMember,
                            };
                        })
                    }
                />
                <p className="text-center">Life Member</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <TimelineChart
                    url="/api/admins/analytics?category=totalUsers"
                    xaxis="joinDate"
                    datakey="sum"
                    process={(data: TotalUsersData[]) =>
                        processUsersCount(data, 'joinDate')
                    }
                />
                <p className="text-center">Number of Members</p>
            </BarChartWrapper>

            <BarChartWrapper>
                <TimelineChart
                    url="/api/admins/analytics?category=newRegistrations"
                    xaxis="joinDate"
                    datakey="count"
                    process={(data: JoinData[]) =>
                        processUsersCount(data, 'joinDate')
                    }
                />
                <p className="text-center">New Registrations</p>
            </BarChartWrapper>
        </div>
    );
}

function BarChartWrapper({ children }: { children: React.ReactNode }) {
    return <div className="h-[25rem] w-[30rem] mb-20">{children}</div>;
}

type TotalUsersData = {
    joinDate: string;
    sum: number;
};

type JoinData = {
    joinDate: string;
    count: number;
};

function processUsersCount<T extends Record<string, any>>(
    data: T[],
    datakey: keyof T,
): T[] {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return data.map((datum) => {
        const [year, month] = datum[datakey].split(' ');
        const formatted = `${months[parseInt(month, 10) - 1]} ${year}`;
        return {
            ...datum,
            [datakey]: formatted,
        };
    });
}

export default Analytics;
