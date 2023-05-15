import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { registerComponent } from './app/app-register'
import { appRoutes } from './app/router'
import { componentsRoute } from './components'
import { CustomEventRoute } from './custom-event'
import { DateFnsRoute } from './date-fns'
import { downloaderRoute } from './downloader'
import { echartsRoutes } from './echarts/router'
import { framerMotionRoutes } from './framer-motion/router'
import { GlobalLayout } from './global-layout'
import { gsapRoutes } from './gsap/router'
import { I18nextRoute } from './i18next'
import { jotaiRoutes } from './jotai/router'
import { JsonViewerRoute } from './json-viewer'
import { MantineRoute } from './mantine'
import { NotFoundRoute } from './not-found'
import { plotRoute } from './plot/router'
import { POCBuilderRoute } from './poc-builder'
import { reactQueryRoute } from './react-query'
import { RHFMultiLvlPickListRoute } from './rhf/multi-lvl-pick-list'
import { RuntimeValidationRoute } from './rhf/runtime-validation'
import { RTERoute } from './rte'
import { stickyItemRoute } from './sticky-item'
import { virtualRoute } from './virtual'
import { ZodRoute } from './zod'

registerComponent(lazy(() => import('./app/test')))

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      echartsRoutes,
      ...appRoutes,
      DateFnsRoute,
      ZodRoute,
      RuntimeValidationRoute,
      JsonViewerRoute,
      RTERoute,
      // JotaiRoute,
      jotaiRoutes,
      gsapRoutes,
      MantineRoute,
      CustomEventRoute,
      POCBuilderRoute,
      RHFMultiLvlPickListRoute,
      I18nextRoute,
      framerMotionRoutes,
      reactQueryRoute,
      componentsRoute,
      virtualRoute,
      stickyItemRoute,
      downloaderRoute,
      plotRoute,
      NotFoundRoute,
    ],
  },
])
