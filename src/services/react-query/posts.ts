import { QueryFunctionContext } from '@tanstack/react-query'
import { createQuery } from './create-query'

export const PostKeys = {}

export const usePosts = createQuery({
  queryFn: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    return response
  },
})
