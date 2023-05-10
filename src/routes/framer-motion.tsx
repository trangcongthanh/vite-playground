import { Box, Group } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

const DATA = Array.from({ length: 6 * 4 + 2 }, (_, i) => i + 1)

const variants = {
  initial: (direction: number) => ({ y: `calc(${direction * 100}%)` }),
  animate: { y: 0 },
  exit: (direction: number) => ({ y: `calc(${direction * -100}%)` }),
}

export function Dev() {
  const [page, setPage] = useState(1)
  const [history, setHistory] = useState([0, 1])
  if (history[1] !== page) {
    setHistory([history[1], page])
  }
  const direction = history[1] - history[0]
  const data = DATA.slice((page - 1) * 6, page * 6)
  const [height, setHeight] = useState<number>()
  return (
    <Box>
      <Group>
        <button
          onClick={() =>
            setPage((p) => {
              return Math.max(p - 1, 1)
            })
          }>
          -1
        </button>
        <button
          onClick={() =>
            setPage((p) => {
              return Math.min(p + 1, Math.ceil(DATA.length / 6))
            })
          }>
          +1
        </button>
      </Group>
      <motion.div style={{ position: 'relative', height, overflow: 'hidden' }}>
        <AnimatePresence custom={direction}>
          <motion.div
            transition={{ duration: 3 }}
            key={page}
            style={{
              width: '100%',
              position: 'absolute',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 8,
              paddingBottom: 8,
            }}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            ref={(r) => {
              if (r && !height) {
                setHeight(r?.clientHeight - 8)
              }
            }}>
            {data.map((i) => (
              <div key={i} style={{ aspectRatio: '4/3', paddingBottom: 100, backgroundColor: '#333' }}>
                {i}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div>oop</div>
    </Box>
  )
}

function Hoo() {
  return (
    <motion.div layoutId="hi" style={{ backgroundColor: '#999', height: 500 }}>
      <div>a</div>
      <div>b</div>
    </motion.div>
  )
}

function FramerMotionPage() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>toggle</button>
      {(!show && (
        <motion.div layoutId="hi" style={{ height: 200, width: 300, backgroundColor: '#333' }}>
          1
        </motion.div>
      )) || <Hoo />}
    </div>
  )
}
function Layout() {
  return (
    <Box style={{ width: '100vw', height: '100vh' }}>
      <Outlet />
    </Box>
  )
}
export const framerMotionRoutes: RouteObject = {
  path: '/framer-motion',
  element: <Layout />,
  children: [
    { index: true, element: <FramerMotionPage /> },
    { path: 'test', element: <div /> },
  ],
}
