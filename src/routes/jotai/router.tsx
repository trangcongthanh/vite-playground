import { Link, Outlet } from 'react-router-dom'
import { JotaiRetailUI } from './retail-ui'

function JotaiLayout() {
  return (
    <div>
      <Link to="/jotai">Top</Link>
      <Link to="/jotai/retail-ui">Retail UI</Link>
      <Outlet />
    </div>
  )
}

export const jotaiRoutes = {
  path: '/jotai',
  element: <JotaiLayout />,
  children: [
    {
      index: true,
      element: <div>Jotail</div>,
    },
    {
      path: 'retail-ui',
      element: <JotaiRetailUI />,
    },
  ],
}
