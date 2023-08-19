import { useEffect, useState } from 'react';
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
    }, [url, process]);

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
