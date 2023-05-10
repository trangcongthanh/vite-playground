import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function GsapScrollTrigger() {
  const scroller = useRef(null)
  return (
    <div id="scroller" className="h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll" ref={scroller}>
      <div className="relative h-screen snap-start bg-blue-100">
        <header className="flex justify-between">
          <div>Logo</div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <a href="#">Item 1</a>
              </li>
              <li>
                <a href="#">Item 2</a>
              </li>
              <li>
                <a href="#">Item 3</a>
              </li>
              <li>
                <a href="#">Item 4</a>
              </li>
              <li>
                <a href="#">Item 5</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <HorizontalScroll />
      <div className="h-screen snap-start bg-blue-300">Screen 3</div>
      <VerticalScroll />
      <div className="h-screen snap-start bg-blue-500">Screen 5</div>
    </div>
  )
}

function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const { current: container } = containerRef
      const items = Array.from(container?.children || [])
      const scroller = document.getElementById('scroller')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scroller,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (items.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.1 },
          },
          onEnter() {
            console.log('Enter')
            scroller?.classList.remove('snap-y')
          },
          onLeave() {
            console.log('Leave')
            scroller?.classList.add('snap-y')
          },
          onLeaveBack() {
            console.log('Leave Back')
            scroller?.classList.add('snap-y')
          },
          onEnterBack() {
            console.log('Enter Back')
            scroller?.classList.remove('snap-y')
          },
        },
      })
      tl.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
      })
    }, containerRef)
    return ctx.revert
  }, [])

  return (
    <div
      className="flex h-screen w-[400%] snap-start flex-nowrap overflow-hidden [&>*]:h-[100vh] [&>*]:w-[100%] [&>*]:overflow-hidden"
      ref={containerRef}>
      <div className="bg-red-100">Screen 2 - 1</div>
      <div className="bg-red-200">Screen 2 - 2</div>
      <div className="bg-red-300">Screen 2 - 3</div>
      <div className="bg-red-400">Screen 2 - 4</div>
    </div>
  )
}

function VerticalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const { current: container } = containerRef
      const items = Array.from(container?.children || [])
      const scroller = document.getElementById('scroller')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scroller,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (items.length - 1),
            inertia: false,
            duration: 0.1,
          },
          onEnter() {
            console.log('Enter')
            scroller?.classList.remove('snap-y')
          },
          onLeave() {
            console.log('Leave')
            scroller?.classList.add('snap-y')
          },
          onLeaveBack() {
            console.log('Leave Back')
            scroller?.classList.add('snap-y')
          },
          onEnterBack() {
            console.log('Enter Back')
            scroller?.classList.remove('snap-y')
          },
        },
      })

      tl.to(items, {
        yPercent: -100 * (items.length - 1),
        ease: 'none',
      })
    }, containerRef)
    return ctx.revert
  }, [])

  return (
    <div
      className="h-screen snap-start overflow-hidden bg-black text-white [&>*]:h-[100vh] [&>*]:w-[100vw] [&>*]:overflow-hidden"
      ref={containerRef}>
      <div>Screen 4 - 1</div>
      <div>Screen 4 - 2</div>
      <div>Screen 4 - 3</div>
      <div>Screen 4 - 4</div>
    </div>
  )
}
