import { PlotBuilder } from './plot-builder'

export const plotRoute = {
  path: '/plot',
  children: [
    {
      index: true,
      element: <PlotBuilder />,
    },
  ],
}
