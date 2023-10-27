import { RouteObject } from 'react-router-dom'
import { RechartsRoute } from './recharts'

export const rechartsRoute: RouteObject = {
  path: '/recharts',
  children: [{ index: true, element: <RechartsRoute /> }],
}
