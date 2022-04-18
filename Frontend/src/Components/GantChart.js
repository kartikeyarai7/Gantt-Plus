import React from 'react';
import Chart from 'react-google-charts';

const GantChart = () => {
  return (
    <>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType='Gantt'
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' }
          ],
          ['Research', 'Regular Service', null, new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
          ['Write', 'Corrective Maintenace', 'write', null, new Date(2015, 0, 9), 3 * 24 * 60 * 60 * 1000, 25, 'Research,Outline'],
          ['Cite', 'Replacement', 'write', null, new Date(2015, 0, 7), 1 * 24 * 60 * 60 * 1000, 20, 'Research'],
          ['Complete', 'Installation', 'complete', null, new Date(2015, 0, 10), 1 * 24 * 60 * 60 * 1000, 0, 'Cite,Write'],
          ['Outline', 'Briefing', 'write', null, new Date(2015, 0, 6), 1 * 24 * 60 * 60 * 1000, 100, 'Research']
        ]}
        options={{
          gantt: {
            criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
            arrow: {
              angle: 100,
              width: 5,
              color: 'green',
              radius: 0
            }
          }
        }}
        rootProps={{ 'data-testid': '6' }}
      />
    </>
  );
};

export default GantChart;
