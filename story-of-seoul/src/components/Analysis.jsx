

import React from 'react';
import { Chart, Bars } from 'rumble-charts';

const Analysis = () => {

    const series = [
        {
            data: [100, 200, 300,400]
        },
        {
            data: [10, 20, 30]
        }
    ];

    return (
        <div className="Analysis">
            <Chart series={series} width={500} minY={0} height={500}>
                <Bars/>
            </Chart>
        </div>
    );
};

export default Analysis;