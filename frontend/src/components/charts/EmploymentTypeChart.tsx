import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type EmploymentType = {
    employmentType: string;
    count: number;
};

type Series = {
    label: string;
    data: EmploymentType[];
};

function EmploymentTypeChart() {
    const [data, setData] = useState<Series[]>([
        {
            label: 'Employment Type Distribution',
            data: [
                {
                    employmentType: 'Unknown',
                    count: 0,
                },
            ],
        },
    ]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                '/api/admins/analytics?category=employmentType',
            );
            const serverData: EmploymentType[] = (await resp.json()) || [];
            setData([
                {
                    label: 'Employment Status Distribution',
                    data: Array.from(serverData),
                },
            ]);
        })();
    }, []);

    const primaryAxis = useMemo(
        (): AxisOptions<EmploymentType> => ({
            getValue: (datum) => datum.employmentType ?? 'Unemployed',
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<EmploymentType>[] => [
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

export default EmploymentTypeChart;
