import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

export function GsapScrollTrigger() {
  const scroller = useRef(null)
  return (
    <div className="h-screen">
      <div id="scroller" className="scroller h-screen overflow-x-hidden overflow-y-scroll" ref={scroller}>
        <div className="relative h-screen bg-blue-100">
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
        <div className="h-screen bg-blue-300">Screen 3</div>
        <VerticalScroll />
        <div className="h-screen snap-start bg-blue-500">Screen 5</div>
      </div>
    </div>
  )
}

function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const signal = new AbortController()

    scroller?.addEventListener(
      'scroll',
      () => {
        console.log({
          scroller: scroller?.scrollTop,
          container: container?.offsetTop,
        })
      },
      {
        signal: signal.signal,
      },
    )
    return () => {
      signal.abort()
    }
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const { current: container } = containerRef
    const items = Array.from(container?.children || [])
    gsap.to(items, {
      xPercent: -100 * (items.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        scroller: '#scroller',
        start: 'top top',
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (items.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.1 },
        },
      },
    })
  }, [])

  return (
    <div
      className="flex h-screen w-[400%] flex-nowrap overflow-hidden [&>*]:h-[100vh] [&>*]:w-[100%] [&>*]:overflow-hidden"
      ref={containerRef}>
      <div className="screen-2 bg-red-100">Screen 2 - 1</div>
      <div className="screen-2 bg-red-200">Screen 2 - 2</div>
      <div className="screen-2 bg-red-300">Screen 2 - 3</div>
      <div className="screen-2 bg-red-400">Screen 2 - 4</div>
    </div>
  )
}

function VerticalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const { current: container } = containerRef
    const items = Array.from(container?.children || [])

    gsap.to(items, {
      yPercent: -100 * (items.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        scroller: '#scroller',
        start: 'top top',
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (items.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.1 },
        },
      },
    })
  }, [])

  return (
    <div
      id="screen-4"
      className="h-screen snap-start overflow-hidden bg-black text-white [&>*]:h-[100vh] [&>*]:w-[100vw] [&>*]:overflow-hidden"
      ref={containerRef}>
      <div>Screen 2 - 1</div>
      <div>Screen 2 - 2</div>
      <div>Screen 2 - 3</div>
      <div>Screen 2 - 4</div>
    </div>
  )
}
