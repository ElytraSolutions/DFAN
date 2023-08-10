import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type MembershipData = {
    membershipFrom: string;
    count: number;
};

type Series = {
    label: string;
    data: MembershipData[];
};

function MembershipChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Membership Distribution',
            data: [
                {
                    membershipFrom: 'Unknown',
                    count: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                '/api/admins/analytics?category=membershipFrom',
            );
            const serverData: MembershipData[] = (await resp.json()) || [];
            setData([
                {
                    label: 'Membership Distribution',
                    data: Array.from(serverData).filter(
                        (datum) => datum.count > 0,
                    ),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<MembershipData> => ({
            getValue: (datum) => datum.membershipFrom ?? 'Unknown',
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<MembershipData>[] => [
            {
                getValue: (datum) => datum.count ?? 0,
                elementType: 'bar',
                min: 0,
                showGrid: true,
            },
        ],
        [],
    );
    return (
        <>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </>
    );
}

export default MembershipChart;
