import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function RevenueGraph() {
    const data = [
        {
            name: 'Page A',
            amt: 2400,
        },
        {
            name: 'Page B',
            amt: 2210,
        },
        {
            name: 'Page C',
            amt: 2290,
        },
        {
            name: 'Page D',
            amt: 2000,
        },
        {
            name: 'Page E',
            amt: 2181,
        },
        {
            name: 'Page F',
            amt: 2500,
        },
        {
            name: 'Page G',
            amt: 2100,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold text-center pb-4">
                    Revenue History
                </h1>
                <LineChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="amt"
                        stroke="#8884d8"
                        overlineThickness={10}
                        underlineThickness="50px"
                    />
                </LineChart>
            </div>
        </>
    );
}

export default RevenueGraph;
