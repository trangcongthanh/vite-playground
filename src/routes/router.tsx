import { createBrowserRouter } from 'react-router-dom'
import { AppRoute } from './app'
import { GlobalLayout } from './global-layout'
import { NotFoundRoute } from './not-found'

export const router = createBrowserRouter([{ element: <GlobalLayout />, children: [AppRoute, NotFoundRoute] }])
