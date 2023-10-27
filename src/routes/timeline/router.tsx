import { TimelineView } from './timeline'

export const timelineRoute = {
  path: '/timeline',
  children: [
    {
      index: true,
      element: <TimelineView />,
    },
  ],
}
