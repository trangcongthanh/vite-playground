import { Box } from '@mantine/core'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

function Element() {
  const [page, setPage] = useState(1)
  return (
    <Box>
      <button
        onClick={() => {
          setPage((p) => (p === 1 ? 2 : 1))
        }}>
        hi
      </button>
      <Box
        sx={() => ({
          display: 'flex',
          width: 400,
          overflow: 'hidden',
          flexWrap: 'nowrap',
          '.page': {
            minWidth: 400,
          },
          '.page-1-enter': {},
          '.page-1-enter-active': {
            transform: 'translateX(0)',
            transition: 'transform 300ms ease-in',
          },
          '.page-1-exit': {
            transform: 'translateX(-400px)',
          },
          '.page-1-exit-active': {
            transform: 'translateX(-400px)',
            transition: 'transform 300ms ease-in',
          },
          '.page-2-enter': {},
          '.page-2-enter-active': {
            opacity: 1,
            transition: 'opacity 300ms ease-in',
          },
          '.page-2-exit': {
            opacity: 1,
          },
          '.page-2-exit-active': {
            opacity: 0,
            transition: 'opacity 300ms ease-in',
          },
        })}>
        <CSSTransition in={page === 1} classNames="page-1" timeout={300}>
          <div
            className="page"
            style={{
              backgroundColor: 'blue',
            }}>
            Page 1
          </div>
        </CSSTransition>
        <CSSTransition in={page === 2} classNames="page-2" timeout={300}>
          <div
            className="page"
            style={{
              backgroundColor: 'green',
            }}>
            Page 2
          </div>
        </CSSTransition>
      </Box>
    </Box>
  )
}

export const CSSTransitionRoute = {
  path: '/css-transition',
  element: <Element />,
}
