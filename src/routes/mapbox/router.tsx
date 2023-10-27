import { RouteObject } from 'react-router-dom'
import { Mapbox } from './mapbox'

export const mapboxRoute: RouteObject = {
  path: '/mapbox',
  children: [
    {
      index: true,
      element: <Mapbox />,
    },
  ],
}
