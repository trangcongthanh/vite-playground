import { useState } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

function Element() {
  const [state, setState] = useState<'list' | 'item'>('list')
  return (
    <div
      style={{
        width: 300,
        height: 500,
        overflow: 'hidden',
        border: '1px solid #999',
        display: 'flex',
        flexWrap: 'nowrap',
      }}>
      <div
        style={{
          flexShrink: 1,
          minWidth: 300,
          height: 500,
          transition: 'transform 0.3s ease-in-out',
          transform: state === 'list' ? `translateX(0)` : `translateX(-300px)`,
        }}>
        Chat List
        <button
          onClick={() => {
            setState('item')
          }}>
          &gt;
        </button>
      </div>
      <div
        style={{
          flexShrink: 1,
          minWidth: 300,
          height: 500,
          transition: 'transform 0.3s ease-in-out',
          transform: state === 'list' ? `translateX(0)` : `translateX(-300px)`,
        }}>
        Chat Item
        <button
          onClick={() => {
            setState('list')
          }}>
          &lt;
        </button>
      </div>
    </div>
  )
}

function Layout() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Outlet />
    </div>
  )
}

export const animationRoute: RouteObject = {
  path: '/animation',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Element />,
    },
  ],
}
