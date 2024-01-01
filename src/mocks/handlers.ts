import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('/api/test', ({ request, params, cookies }) => {
    return HttpResponse.json(['Tom', 'Jerry', 'Spike'])
  }),
]
