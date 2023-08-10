import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type LifeMemberType = {
    isLifeMember: boolean;
    count: number;
};

type Series = {
    label: string;
    data: LifeMemberType[];
};

function LifeMemberChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Employment Type Distribution',
            data: [
                {
                    isLifeMember: false,
                    count: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                '/api/admins/analytics?category=isLifeMember',
            );
            const serverData: LifeMemberType[] = (await resp.json()) || [];
            setData([
                {
                    label: 'Life Member Distribution',
                    data: Array.from(serverData),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<LifeMemberType> => ({
            getValue: (datum) => {
                if (datum.isLifeMember === null) {
                    return 'Not Member';
                }
                return datum.isLifeMember ? 'Yes' : 'No';
            },
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<LifeMemberType>[] => [
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

export default LifeMemberChart;
