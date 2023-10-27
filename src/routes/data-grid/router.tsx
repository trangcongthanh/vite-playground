import { Outlet } from 'react-router-dom'
import { DataGrid } from './data-grid'

function Layout() {
  return (
    <div className="h-screen w-screen p-8">
      <Outlet />
    </div>
  )
}

export const dataGridRoute = {
  path: '/data-grid',
  element: <Layout />,
  children: [{ index: true, element: <DataGrid /> }],
}
