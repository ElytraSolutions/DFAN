import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type EmploymentStatus = {
    employmentStatus: string;
    count: number;
};

type Series = {
    label: string;
    data: EmploymentStatus[];
};

function EmploymentStatusChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Employment Status Distribution',
            data: [
                {
                    employmentStatus: 'Unknown',
                    count: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                '/api/admins/analytics?category=employmentStatus',
            );
            const serverData: EmploymentStatus[] = (await resp.json()) || [];
            setData([
                {
                    label: 'Employment Status Distribution',
                    data: Array.from(serverData).filter(
                        (datum) => datum.count > 0,
                    ),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<EmploymentStatus> => ({
            getValue: (datum) => datum.employmentStatus ?? 'Unknown',
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<EmploymentStatus>[] => [
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

export default EmploymentStatusChart;
