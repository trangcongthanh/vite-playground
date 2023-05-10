import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouteObject } from 'react-router-dom'

function createQuery({ queryKey, queryFn, ...configs }) {
  return function hook({ variables, ...options }) {
    return useQuery({
      ...configs,
      ...options,
      queryKey: queryKey(variables),
      queryFn,
    })
  }
}

const useTodos = createQuery({
  queryKey: () => ['todos'],
  queryFn: () => [{ id: 1, text: 'todo 1' }],
})

const useTodo = createQuery({
  queryKey(variables) {
    return ['todo', variables]
  },
  queryFn({ queryKey }) {
    const [, params] = queryKey
    return params
  },
})

function ReactQueryPage() {
  useTodos({})
  useTodo({
    variables: {
      id: 1,
      text: 'todo 2',
    },
  })

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <ReactQueryDevtools />
    </Box>
  )
}

export const reactQueryRoute: RouteObject = {
  path: '/react-query',
  element: <ReactQueryPage />,
}
