// src/components/dashboard/RankingBarChart.tsx

import { type FC } from 'react';
import { Box, Typography } from '@mui/material';

import { 
    VictoryChart, 
    VictoryBar, 
    VictoryAxis, 
    VictoryTheme, 
    VictoryLabel 
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
            className='flex flex-col items-center h-full w-full'
            sx={{ 
                backgroundColor: 'transparent',
            }}
        >
            <Typography variant='h5' className='!font-semibold text-white pt-4'>{chartTitle}</Typography>
            
            <VictoryChart
                height={350} 
                width={300}
                domainPadding={{ x: 40 }} 
                theme={VictoryTheme.material}

                padding={{ bottom: 90, left: 45, right: 10 }}
            >
                {/* 1. EIXO Y (Vertical - Valores: 100, 200, 300) */}
                <VictoryAxis
                    dependentAxis
                    tickValues={[100, 200, 300]} 
                    domain={[0, MAX_Y]}
                    
                    style={{
                        axis: { stroke: COLOR_STROKE, strokeWidth: 4 }, 
                        ticks: { stroke: 'transparent' },
                        // Cor dos ticks (marcas)
                        tickLabels: { fill: TEXT_COLOR, fontSize: 16, padding: 4 },
                        // O grid (linhas horizontais)
                        grid: { stroke: AXIS_COLOR, strokeDasharray: '5, 5', strokeOpacity: 1 }
                    }}
                />

                {/* 2. EIXO X (Horizontal - Nomes) */}
                <VictoryAxis
                    tickFormat={data.map(d => d.name)}
                    style={{
                        axis: { stroke: COLOR_STROKE, strokeWidth: 4 },
                        tickLabels: { fill: TEXT_COLOR, fontSize: 14, angle: -60, textAnchor: 'end' },
                        grid: { stroke: AXIS_COLOR, strokeDasharray: '5, 5', strokeOpacity: 1 },
                        ticks: { stroke: 'transparent' },
                        
                    }}
                />
                
                <VictoryBar
                    data={data}
                    x='name'
                    y='value' 
                    
                    // Estilo das barras
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