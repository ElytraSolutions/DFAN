import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface ICustomBarChartProps<T> {
    url: string;
    datakey: string;
    process?: (data: T[]) => T[];
}
function CustomBarChart<T>({ url, datakey, process }: ICustomBarChartProps<T>) {
    const [data, setData] = useState<T[]>([]);
    if (!process) process = (data: T[]) => Array.from(data);
    useEffect(() => {
        (async () => {
            const resp = await fetch(url);
            const serverData: T[] = (await resp.json()) || [];
            setData(process(serverData));
        })();
    }, [url]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={datakey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" label />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarChart;
