import { InfiniteRouter } from './infinite-slider'

export const cssRoute = {
  path: '/css',
  children: [
    {
      index: true,
      element: <InfiniteRouter />,
    },
  ],
}
