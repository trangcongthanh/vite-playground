import { Area, Bar, ComposedChart, Dot, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const DATA = [
  { date: '2023-07-12T17:00:00.000Z', spend: 2, cost: 167.4 },
  { date: '2023-07-12T18:00:00.000Z', spend: 1.3, cost: 131.4 },
  { date: '2023-07-12T19:00:00.000Z', spend: 1.3, cost: 21.599999999999998 },
  { date: '2023-07-12T20:00:00.000Z', spend: 1.3, cost: 36 },
  { date: '2023-07-12T21:00:00.000Z', spend: 1.9, cost: 58.5 },
  { date: '2023-07-12T22:00:00.000Z', spend: 1.5, cost: 105.3 },
  { date: '2023-07-12T23:00:00.000Z', spend: 1.1, cost: 41.4 },
  { date: '2023-07-13T00:00:00.000Z', spend: 1.1, cost: 87.3 },
  { date: '2023-07-13T01:00:00.000Z', spend: 1.1, cost: 58.5 },
  { date: '2023-07-13T02:00:00.000Z', spend: 1.9, cost: 195.29999999999998 },
  { date: '2023-07-13T03:00:00.000Z', spend: 1.9, cost: 36 },
  { date: '2023-07-13T04:00:00.000Z', spend: 1.1, cost: 118.8 },
  { date: '2023-07-13T05:00:00.000Z', spend: 1, cost: 171 },
  { date: '2023-07-13T06:00:00.000Z', spend: 2, cost: 28.799999999999997 },
  { date: '2023-07-13T07:00:00.000Z', spend: 1.3, cost: 90.89999999999999 },
  { date: '2023-07-13T08:00:00.000Z', spend: 1.8, cost: 183.6 },
  { date: '2023-07-13T09:00:00.000Z', spend: 1.8, cost: 106.19999999999999 },
  { date: '2023-07-13T10:00:00.000Z', spend: 1.6, cost: 126 },
  { date: '2023-07-13T11:00:00.000Z', spend: 1.2, cost: 167.4 },
  { date: '2023-07-13T12:00:00.000Z', spend: 1.3, cost: 163.79999999999998 },
  { date: '2023-07-13T13:00:00.000Z', spend: 1.9, cost: 115.19999999999999 },
  { date: '2023-07-13T14:00:00.000Z', spend: 1.4, cost: 137.7 },
  { date: '2023-07-13T15:00:00.000Z', spend: 1.3, cost: 99.89999999999999 },
  { date: '2023-07-13T16:00:00.000Z', spend: 1.5, cost: 145.79999999999998 },
]

export function RechartsRoute() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={DATA} margin={{ top: 0, bottom: 0, left: 100, right: 100 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Bar dataKey="spend" />
        <Bar dataKey="cost" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
