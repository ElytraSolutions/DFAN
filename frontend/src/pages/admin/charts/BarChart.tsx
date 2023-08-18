import { ResponsiveBar } from '@nivo/bar';

const BarChart = () => {
    const data = [
        {
            province: 'AD',
            male: 143,
            maleColor: 'hsl(261, 70%, 50%)',
            women: 130,
            womenColor: 'hsl(209, 70%, 50%)',
            sandwich: 126,
            sandwichColor: 'hsl(210, 70%, 50%)',
            kebab: 171,
            kebabColor: 'hsl(301, 70%, 50%)',
            fries: 124,
            friesColor: 'hsl(357, 70%, 50%)',
            donut: 45,
            donutColor: 'hsl(357, 70%, 50%)',
        },
        {
            province: 'AE',
            male: 26,
            maleColor: 'hsl(221, 70%, 50%)',
            women: 146,
            womenColor: 'hsl(4, 70%, 50%)',
            sandwich: 35,
            sandwichColor: 'hsl(339, 70%, 50%)',
            kebab: 65,
            kebabColor: 'hsl(232, 70%, 50%)',
            fries: 194,
            friesColor: 'hsl(149, 70%, 50%)',
            donut: 191,
            donutColor: 'hsl(306, 70%, 50%)',
        },
        {
            province: 'AF',
            male: 192,
            maleColor: 'hsl(155, 70%, 50%)',
            women: 125,
            womenColor: 'hsl(331, 70%, 50%)',
            sandwich: 92,
            sandwichColor: 'hsl(100, 70%, 50%)',
            kebab: 105,
            kebabColor: 'hsl(146, 70%, 50%)',
            fries: 13,
            friesColor: 'hsl(60, 70%, 50%)',
            donut: 49,
            donutColor: 'hsl(290, 70%, 50%)',
        },
        {
            province: 'AG',
            male: 89,
            maleColor: 'hsl(215, 70%, 50%)',
            women: 196,
            womenColor: 'hsl(145, 70%, 50%)',
            sandwich: 57,
            sandwichColor: 'hsl(205, 70%, 50%)',
            kebab: 153,
            kebabColor: 'hsl(173, 70%, 50%)',
            fries: 39,
            friesColor: 'hsl(48, 70%, 50%)',
            donut: 191,
            donutColor: 'hsl(15, 70%, 50%)',
        },
        {
            province: 'AI',
            male: 83,
            maleColor: 'hsl(338, 70%, 50%)',
            women: 145,
            womenColor: 'hsl(351, 70%, 50%)',
            sandwich: 198,
            sandwichColor: 'hsl(142, 70%, 50%)',
            kebab: 54,
            kebabColor: 'hsl(354, 70%, 50%)',
            fries: 195,
            friesColor: 'hsl(113, 70%, 50%)',
            donut: 47,
            donutColor: 'hsl(70, 70%, 50%)',
        },
        {
            province: 'AL',
            male: 85,
            maleColor: 'hsl(155, 70%, 50%)',
            women: 67,
            womenColor: 'hsl(104, 70%, 50%)',
            sandwich: 31,
            sandwichColor: 'hsl(38, 70%, 50%)',
            kebab: 79,
            kebabColor: 'hsl(101, 70%, 50%)',
            fries: 141,
            friesColor: 'hsl(196, 70%, 50%)',
            donut: 158,
            donutColor: 'hsl(355, 70%, 50%)',
        },
        {
            province: 'AM',
            male: 62,
            maleColor: 'hsl(62, 70%, 50%)',
            women: 190,
            womenColor: 'hsl(38, 70%, 50%)',
            sandwich: 109,
            sandwichColor: 'hsl(235, 70%, 50%)',
            kebab: 157,
            kebabColor: 'hsl(252, 70%, 50%)',
            fries: 24,
            friesColor: 'hsl(134, 70%, 50%)',
            donut: 189,
            donutColor: 'hsl(20, 70%, 50%)',
        },
    ];

    return (
        <>
            <ResponsiveBar
                data={data}
                keys={['male', 'women', 'sandwich', 'kebab', 'fries', 'donut']}
                indexBy="province"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'sandwich',
                        },
                        id: 'lines',
                    },
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'province',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="BarChart"
                barAriaLabel={(e) =>
                    e.id +
                    ': ' +
                    e.formattedValue +
                    ' in province: ' +
                    e.indexValue
                }
            />
        </>
    );
};

export default BarChart;
