import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef } from 'react'

export function Scroll() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: scrollerRef })
  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log(latest)
  })
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-screen overflow-y-auto overflow-x-hidden" ref={scrollerRef}>
        <div className="screen flex h-screen items-center justify-center bg-blue-100">Screen 1</div>
        <div className="screen flex h-screen items-center justify-center bg-blue-200">Screen 2</div>
        <div className="screen relative flex h-[300vh] bg-blue-300">
          <div className="min-h-screen min-w-[100vw]">Screen 3 - 1</div>
          <div className="min-h-screen min-w-[100vw]">Screen 3 - 2</div>
          <div className="min-h-screen min-w-[100vw]">Screen 3 - 3</div>
        </div>
        <div className="screen flex h-screen items-center justify-center bg-blue-400">Screen 4</div>
        <div className="screen flex h-screen items-center justify-center bg-blue-500">Screen 5</div>
      </div>
    </div>
  )
}
