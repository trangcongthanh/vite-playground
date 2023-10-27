import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { Intls } from './intl'
import { JotaiRetailUI } from './retail-ui'

function JotaiLayout() {
  const [params, setParams] = useSearchParams()
  return (
    <div>
      <Link to="/jotai">Top</Link>
      <Link to="/jotai/retail-ui">Retail UI</Link>
      <button
        onClick={() => {
          setParams((p) => {
            p.set('a', new Date().toISOString())
            return p
          })
        }}>
        a
      </button>
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
    { path: 'intl', element: <Intls /> },
  ],
}
