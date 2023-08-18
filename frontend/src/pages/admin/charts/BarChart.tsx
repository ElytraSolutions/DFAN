import { ResponsiveBar } from '@nivo/bar';

const BarChart = () => {
    const data = [
        {
            region: 'AD',
            male: 143,
            maleColor: 'hsl(261, 70%, 50%)',
            women: 130,
            womenColor: 'hsl(209, 70%, 50%)',
            others: 126,
            othersColor: 'hsl(210, 70%, 50%)',
        },
        {
            region: 'AE',
            male: 26,
            maleColor: 'hsl(221, 70%, 50%)',
            women: 146,
            womenColor: 'hsl(4, 70%, 50%)',
            others: 35,
            othersColor: 'hsl(339, 70%, 50%)',
        },
        {
            region: 'AF',
            male: 192,
            maleColor: 'hsl(155, 70%, 50%)',
            women: 125,
            womenColor: 'hsl(331, 70%, 50%)',
            others: 92,
            othersColor: 'hsl(100, 70%, 50%)',
        },
        {
            region: 'AG',
            male: 89,
            maleColor: 'hsl(215, 70%, 50%)',
            women: 196,
            womenColor: 'hsl(145, 70%, 50%)',
            others: 57,
            othersColor: 'hsl(205, 70%, 50%)',
        },
        {
            region: 'AI',
            male: 83,
            maleColor: 'hsl(338, 70%, 50%)',
            women: 145,
            womenColor: 'hsl(351, 70%, 50%)',
            others: 198,
            othersColor: 'hsl(142, 70%, 50%)',
        },
        {
            region: 'AL',
            male: 85,
            maleColor: 'hsl(155, 70%, 50%)',
            women: 67,
            womenColor: 'hsl(104, 70%, 50%)',
            others: 31,
            othersColor: 'hsl(38, 70%, 50%)',
        },
        {
            region: 'AM',
            male: 62,
            maleColor: 'hsl(62, 70%, 50%)',
            women: 190,
            womenColor: 'hsl(38, 70%, 50%)',
            others: 109,
            othersColor: 'hsl(235, 70%, 50%)',
        },
    ];

    return (
        <>
            <ResponsiveBar
                data={data}
                keys={['male', 'women', 'others']}
                indexBy="region"
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
                    legend: 'region',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
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
                    ' in region: ' +
                    e.indexValue
                }
            />
        </>
    );
};

export default BarChart;
