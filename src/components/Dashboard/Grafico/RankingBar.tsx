import { type FC } from 'react';
import { Box, Typography } from '@mui/material';

import { 
    VictoryChart, 
    VictoryBar, 
    VictoryAxis, 
    VictoryTheme, 
    VictoryTooltip
} from 'victory';

interface ChartData {
    name: string; 
    value: number; 
}

interface RankingBarChartProps {
    data: ChartData[];
    chartTitle?: string;
}

export const RankingBarChart: FC<RankingBarChartProps> = ({ data, chartTitle }) => {
    
    const MAX_Y = 300; 
    
    const AXIS_COLOR = '#500000'; 
    const BAR_COLOR = '#3E0404';  
    const TEXT_COLOR = 'white';   
    const COLOR_STROKE = '#690808';
    return (
        <Box
            className='flex flex-col items-center w-full'
            sx={{
                height: {
                    xs: 420,
                    sm: 480,
                    md: 350,
                },
            }}
        >
            <Typography variant='h5' className='!font-semibold text-white pt-4 !text-[20px] md:text-[30px]'>
                {chartTitle}
            </Typography>

            <VictoryChart
                domainPadding={{ x: 40 }}
                theme={VictoryTheme.material}
                padding={{ bottom: 90, left: 45, right: 10 }}
            >
                <VictoryAxis
                    dependentAxis
                    tickValues={[100, 200, 300]}
                    domain={[0, MAX_Y]}
                    style={{
                        axis: { stroke: COLOR_STROKE, strokeWidth: 4 },
                        ticks: { stroke: 'transparent' },
                        tickLabels: { fill: TEXT_COLOR, fontSize: 16 },
                        grid: { stroke: AXIS_COLOR, strokeDasharray: '5, 5' },
                    }}
                />

                <VictoryAxis
                    tickFormat={data.map(d => d.name)}
                    style={{
                        axis: { stroke: COLOR_STROKE, strokeWidth: 4 },
                        tickLabels: {
                            fill: TEXT_COLOR,
                            fontSize: 14,
                            angle: -60,
                            textAnchor: 'end',
                        },
                        ticks: { stroke: 'transparent' },
                    }}
                />

                <VictoryBar
                    data={data}
                    x='name'
                    y='value'
                    labels={({ datum }) => `${datum.value} aulas`}
                    labelComponent={
                        <VictoryTooltip
                            flyoutStyle={{
                                fill: '#3E0404',
                                stroke: '#690808',
                                strokeWidth: 2,
                            }}
                            style={{
                                fill: 'white',
                                fontSize: 30,
                                fontWeight: 'bold',
                                
                            }}
                            cornerRadius={6}
                            pointerLength={6}
                        />
                    }
                    style={{
                        data: {
                            fill: BAR_COLOR,
                            width: 35,
                        },
                    }}
                    cornerRadius={{ top: 5 }}
                />
            </VictoryChart>
        </Box>
    );
};