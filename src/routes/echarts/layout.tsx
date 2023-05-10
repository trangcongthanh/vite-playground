import { NavLink, Outlet } from 'react-router-dom'

export function Layout({ navs }: { navs: Array<{ path: string; title: string }> }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
        <h1>Echarts</h1>
        <ul style={{ display: 'flex', gap: 16, listStyle: 'none', padding: 0 }}>
          {navs.map((nav) => (
            <li key={nav.path}>
              <NavLink
                to={nav.path}
                style={({ isActive }) => {
                  if (isActive) {
                    return { color: 'black' }
                  }
                  return { color: 'gray' }
                }}>
                {nav.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  )
}
