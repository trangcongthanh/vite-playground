import { Box, ScrollArea } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import * as styles from './mantine.module.css'

function MantineExample() {
  const [rows, setRows] = useState<Array<string>>([])
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.scrollTo({ top: 999999999999 })
  }, [rows])
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-end' }}>
      <ScrollArea viewportRef={ref}>
        {rows.map((i) => (
          <div key={i}>{i}</div>
        ))}
      </ScrollArea>
      <button
        onClick={() => {
          setRows((p) => [...p, new Date().toISOString()])
        }}>
        +1
      </button>
    </Box>
  )
}

export const MantineRoute = {
  path: '/mantine',
  element: <MantineExample />,
}
