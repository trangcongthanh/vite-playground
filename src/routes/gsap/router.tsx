import { Outlet } from 'react-router-dom'
import { GsapScrollTrigger } from './scroll-trigger'
import { ScrollTriggerObserver } from './scroll-trigger-observer'

const ROOT_PATH = '/gsap'

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* <nav className="sticky top-0"> */}
      {/*   <ul className="flex gap-4"> */}
      {/*     <li> */}
      {/*       <Link to={ROOT_PATH}>Gsap</Link> */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       <Link to="./scroll-trigger">Scroll Trigger</Link> */}
      {/*     </li> */}
      {/*   </ul> */}
      {/* </nav> */}
      <Outlet />
    </div>
  )
}

export const gsapRoutes = {
  path: ROOT_PATH,
  // element: <Layout />,
  children: [
    {
      index: true,
      element: <div>Gsap</div>,
    },
    { path: 'scroll-trigger', element: <GsapScrollTrigger /> },
    { path: 'scroll-trigger-observer', element: <ScrollTriggerObserver /> },
  ],
}
