import { http } from 'msw'
import { setupWorker } from 'msw/browser'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './main.css'
import { router } from './routes/router'
import './services/i18next'

const worker = setupWorker(
  // Provide request handlers
  http.get('https://example.com/user/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: 'John',
        lastName: 'Maverick',
      }),
    )
  }),
)

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start()
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />)
})
