import { Card, CardContent } from '@mui/material';
import { MdAttachMoney } from 'react-icons/md';
import { PieChart, Pie, Cell } from 'recharts';

interface IRevenueProps {
    currentMonth: number;
    lastMonth: number;
}
function Revenue({ currentMonth, lastMonth }: IRevenueProps) {
    const data = [
        {
            name: 'Last Month',
            value: lastMonth,
        },
        {
            name: 'Current Month',
            value: currentMonth - lastMonth,
        },
    ];
    const increase =
        Math.round(((currentMonth - lastMonth) / lastMonth) * 100 * 10) / 10;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <Card variant="outlined">
            <CardContent>
                <div className="flex flex-row gap-12 py-4">
                    <div className="flex flex-col items-center grow">
                        <MdAttachMoney className="text-3xl" />
                        <span className="text-2xl font-bold">
                            {currentMonth}
                        </span>
                        <span>Revenue Earned</span>
                    </div>
                    <div className="w-[120px] h-[86px] flex flex-col justify-center items-center">
                        <PieChart width={50} height={16 * 3}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={20}
                                innerRadius={16}
                                fill="#8884d8"
                                isAnimationActive={true}
                                className="mx-auto"
                            >
                                {data.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                        <span className="text-sm font-light">
                            {increase}%{' '}
                            {increase >= 0 ? 'increase' : 'decrease'}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Revenue;
