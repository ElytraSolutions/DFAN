import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type GenderData = {
    gender: 'Male' | 'Female' | 'Others';
    count: number;
};

type Series = {
    label: string;
    data: GenderData[];
};

function GenderChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Gender Data',
            data: [
                {
                    gender: 'Male',
                    count: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch('/api/admins/analytics?category=gender');
            const serverData: GenderData[] = (await resp.json()) || [];
            setData([
                {
                    label: 'Gender data',
                    data: Array.from(serverData),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<GenderData> => ({
            getValue: (datum) => datum.gender ?? 'Unknown',
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<GenderData>[] => [
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

export default GenderChart;
