import { MantineProvider } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function GlobalLayout() {
  return (
    <MantineProvider theme={{ primaryColor: 'red' }}>
      <Outlet />
    </MantineProvider>
  )
}
