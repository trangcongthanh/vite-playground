import { RouteObject } from 'react-router-dom'
import { D3 } from './d3'

export const d3Route: RouteObject = {
  path: '/d3',
  children: [{ index: true, element: <D3 /> }],
}
