import { EChartsOption, graphic } from 'echarts'
import EChartsReact from 'echarts-for-react'
import { useMemo } from 'react'

type LineChartProps = {
  title?: string
  source: [string, number, number, number][]
}

function LineChart({ title, source }: LineChartProps) {
  const option = useMemo<EChartsOption>(() => {
    return {
      dataset: {
        source,
      },
      title: {
        left: 'left',
        text: title,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      xAxis: { type: 'category' },
      yAxis: {
        type: 'value',
        name: 'Base Price Index',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)',
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)',
              },
            ]),
          },

          markLine: {
            symbol: ['none', 'none'],
            data: [
              {
                yAxis: 50,
                label: {
                  formatter: '50%',
                  color: 'gray',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                },
              },
              {
                yAxis: 70,
                label: {
                  formatter: '70%',
                  color: 'gray',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                },
              },
            ],
            label: {
              position: 'end',
            },
            lineStyle: {
              color: 'gray',
            },
            silent: true,
          },
        },
      ],
    }
  }, [title])
  return <EChartsReact option={option} />
}

export function LineCharts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <LineChart
        title="Line Chart"
        source={[
          ['Q1', 43.3, 85.8, 120],
          ['Q2', 83.1, 73.4, 55.1],
          ['Q3', 86.4, 65.2, 82.5],
          ['Q4', 120.1, 53.9, 39.1],
          ['Q5', 43.3, 85.8, 120],
        ]}
      />
      <LineChart
        title="Line Chart"
        source={[
          ['Q1', 43.3, 85.8, 120],
          ['Q2', 83.1, 73.4, 55.1],
          ['Q3', 86.4, 65.2, 82.5],
          ['Q4', 20.1, 53.9, 39.1],
          ['Q5', 43.3, 85.8, 120],
        ]}
      />
    </div>
  )
}
