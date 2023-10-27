import { ZustandIntl } from './intl'

export const zustandRoute = {
  path: '/zustand',
  children: [
    {
      index: true,
      element: <div>hi</div>,
    },
    {
      path: 'intl',
      element: <ZustandIntl />,
    },
  ],
}
