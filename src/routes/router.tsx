import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { registerComponent } from './app/app-register'
import { appRoutes } from './app/router'
import { componentsRoute } from './components'
import { cssRoute } from './css/router'
import { CustomEventRoute } from './custom-event'
import { d3Route } from './d3/router'
import { dataGridRoute } from './data-grid/router'
import { DateFnsRoute } from './date-fns'
import { Dev } from './dev'
import { downloaderRoute } from './downloader'
import { echartsRoutes } from './echarts/router'
import { framerMotionRoutes } from './framer-motion/router'
import { GlobalLayout } from './global-layout'
import { gsapRoutes } from './gsap/router'
import { I18nextRoute } from './i18next'
import { jotaiRoutes } from './jotai/router'
import { JsonViewerRoute } from './json-viewer'
import { MantineRoute } from './mantine'
import { mapboxRoute } from './mapbox/router'
import { NotFoundRoute } from './not-found'
import { plotRoute } from './plot/router'
import { POCBuilderRoute } from './poc-builder'
import { reactQueryRoute } from './react-query'
import { rechartsRoute } from './recharts/router'
import { RHFMultiLvlPickListRoute } from './rhf/multi-lvl-pick-list'
import { RuntimeValidationRoute } from './rhf/runtime-validation'
import { RTERoute } from './rte'
import { stickyItemRoute } from './sticky-item'
import { timelineRoute } from './timeline/router'
import { virtualRoute } from './virtual'
import { ZodRoute } from './zod'
import { zustandRoute } from './zustand/router'
import { CSSTransitionRoute } from './css-transition'
import { animationRoute } from './animation/route'

registerComponent(lazy(() => import('./app/test')))

export const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <div>Login</div>,
  },
  {
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <Dev />,
      },
      echartsRoutes,
      d3Route,
      ...appRoutes,
      animationRoute,
      CSSTransitionRoute,
      DateFnsRoute,
      ZodRoute,
      RuntimeValidationRoute,
      JsonViewerRoute,
      RTERoute,
      // JotaiRoute,
      jotaiRoutes,
      gsapRoutes,
      MantineRoute,
      mapboxRoute,
      CustomEventRoute,
      POCBuilderRoute,
      RHFMultiLvlPickListRoute,
      I18nextRoute,
      framerMotionRoutes,

      timelineRoute,
      dataGridRoute,
      reactQueryRoute,
      componentsRoute,
      virtualRoute,
      stickyItemRoute,
      downloaderRoute,
      plotRoute,
      cssRoute,
      rechartsRoute,
      zustandRoute,
      NotFoundRoute,
    ],
  },
])
