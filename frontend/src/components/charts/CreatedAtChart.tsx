import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type CreatedAt = {
    createdAt: string;
    count: number;
    sum: number;
};

type Series = {
    label: string;
    data: CreatedAt[];
};

function formatCreatedAt(createdAt: string): string {
    return createdAt.split(' ')[0];
}

function CreatedAtChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Created Date Distribution',
            data: [
                {
                    createdAt: 'Unknown',
                    count: 0,
                    sum: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                '/api/admins/analytics?category=createdAt',
            );
            const serverData: CreatedAt[] = (await resp.json()) || [];
            console.log(serverData);
            setData([
                {
                    label: 'Creation Date Distribution',
                    data: Array.from(serverData),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<CreatedAt> => ({
            getValue: (datum) =>
                datum?.createdAt ? formatCreatedAt(datum.createdAt) : 'Unknown',
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<CreatedAt>[] => [
            {
                getValue: (datum) => datum.sum ?? 0,
                elementType: 'line',
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

export default CreatedAtChart;
