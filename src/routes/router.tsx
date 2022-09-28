import { createBrowserRouter } from 'react-router-dom'
import { AppRoute } from './app'
import { GlobalLayout } from './global-layout'
import { JsonViewerRoute } from './json-viewer'
import { NotFoundRoute } from './not-found'

export const router = createBrowserRouter([
  { element: <GlobalLayout />, children: [AppRoute, JsonViewerRoute, NotFoundRoute] },
])
