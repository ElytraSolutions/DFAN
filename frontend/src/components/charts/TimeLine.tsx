import { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts';

function formatCreatedAt(createdAt: string): string {
    const [year, month] = createdAt.split(' ');
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
    const formatted = `${months[parseInt(month, 10) - 1]} ${year}`;
    return formatted;
}

interface ITimeLineProps<T> {
    url: string;
    xaxis: keyof T extends string ? keyof T : never;
    datakey: keyof T extends string ? keyof T : never;
    process?: (data: T[]) => T[];
}
function TimelineChart<T>({ url, xaxis, datakey, process }: ITimeLineProps<T>) {
    const [data, setData] = useState<T[]>([]);
    useEffect(() => {
        (async () => {
            const resp = await fetch(url);
            const serverData: T[] = (await resp.json()) || [];
            setData(process ? process(serverData) : serverData);
        })();
    }, [url]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xaxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={datakey} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TimelineChart;
