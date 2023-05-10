import { Navigate, RouteObject } from 'react-router-dom'
import { Layout } from './layout'
import { LineCharts } from './line-charts'

export const echartsRoutes: RouteObject = {
  path: '/echarts',
  element: (
    <Layout
      navs={[
        { path: 'line', title: 'Line Charts' },
        { path: 'bar', title: 'Bar Charts' },
      ]}
    />
  ),
  children: [
    {
      index: true,
      element: <Navigate to="line" replace />,
    },
    {
      path: 'line',
      element: <LineCharts />,
    },
    { path: 'bar', element: <div>Bar charts</div> },
  ],
}
