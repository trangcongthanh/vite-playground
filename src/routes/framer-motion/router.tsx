import { Scroll } from './scroll'

const ROOT_PATH = '/framer-motion'

export const framerMotionRoutes = {
  path: ROOT_PATH,
  children: [
    {
      index: true,
      element: <div>Framer Motion</div>,
    },
    { path: 'scroll', element: <Scroll /> },
  ],
}
