import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { queryClient } from '../services/react-query/query-client'

export function GlobalLayout() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </MantineProvider>
  )
}
