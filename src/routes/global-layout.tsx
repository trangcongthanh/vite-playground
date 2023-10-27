import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { queryClient } from '../services/react-query/query-client'
import { Test } from './test'

export function GlobalLayout() {
  console.log('global layout')
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Test>
          <Outlet />
        </Test>
      </QueryClientProvider>
    </MantineProvider>
  )
}
