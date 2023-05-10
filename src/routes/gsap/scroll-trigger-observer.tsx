import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export function ScrollTriggerObserver() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef(false)
  const stepRef = useRef(1)

  useEffect(() => {
    const { current: container } = containerRef
    if (!container) {
      return
    }
    const items = container.querySelectorAll<HTMLDivElement>('div.screen')
    items.forEach((item, index) => {
      // item.style.zIndex = `${items.length - index}`
      item.dataset.index = `${index + 1}`
      item.style.zIndex = index === 0 ? '1' : '0'
    })
  }, [])

  const goToSection = useCallback(function goToSection(nextStep: number, direction: 'up' | 'down') {
    const { current: previewStep } = stepRef
    animationRef.current = true

    const { current: container } = containerRef
    if (!container) {
      return
    }

    const currentElement = container.querySelector<HTMLDivElement>(`[data-index="${previewStep}"]`)
    const targetElement = container.querySelector<HTMLDivElement>(`[data-index="${nextStep}"]`)

    const distanceFactor = direction === 'down' ? 1 : -1

    const currentDirection = direction === 'down' ? currentElement?.dataset.direction : targetElement?.dataset.direction

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power1.inOut',
      },
      onStart() {
        gsap.set(targetElement, { zIndex: 2 })
        gsap.set(currentElement, { zIndex: 1 })
      },
      onComplete() {
        animationRef.current = false
        stepRef.current = nextStep
        gsap.set(targetElement, { zIndex: 1 })
        gsap.set(currentElement, { zIndex: 0 })
      },
    })

    if (currentDirection === 'vertical') {
      tl.fromTo(
        currentElement,
        { xPercent: 0, yPercent: 0 },
        {
          xPercent: 0,
          yPercent: -100 * distanceFactor,
        },
        0,
      ).fromTo(
        targetElement,
        {
          xPercent: 0,
          yPercent: 100 * distanceFactor,
        },
        {
          xPercent: 0,
          yPercent: 0,
        },
        0,
      )
      return
    }
    tl.fromTo(
      currentElement,
      { yPercent: 0, xPercent: 0 },
      {
        yPercent: 0,
        xPercent: -100 * distanceFactor,
      },
      0,
    ).fromTo(
      targetElement,
      {
        yPercent: 0,
        xPercent: 100 * distanceFactor,
      },
      {
        yPercent: 0,
        xPercent: 0,
      },
      0,
    )
  }, [])

  useLayoutEffect(() => {
    const { current: container } = containerRef
    const items = container?.querySelectorAll<HTMLDivElement>('div')

    ScrollTrigger.observe({
      target: window,
      type: 'wheel,touch',
      onUp() {
        if (animationRef.current || stepRef.current - 1 < 1) {
          return
        }
        goToSection(stepRef.current - 1, 'up')
      },
      onDown() {
        if (animationRef.current || stepRef.current + 1 > (items?.length || 1)) {
          return
        }
        goToSection(stepRef.current + 1, 'down')
      },
    })
  }, [goToSection])

  function navigateToSection(nextStep: number) {
    if (animationRef.current) {
      return
    }
    const { current: previousStep } = stepRef
    if (nextStep === previousStep) {
      return
    }
    const direction = nextStep < previousStep ? 'up' : 'down'
    goToSection(nextStep, direction)
  }

  return (
    <>
      <div className="relative isolate h-screen overflow-hidden" ref={containerRef}>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-100"
          data-direction="vertical">
          Screen 1
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-200"
          data-direction="horizontal">
          <div>aaaa</div>
          Screen 2
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-300"
          data-direction="horizontal">
          <div>aaaa</div>
          Screen 3
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-400"
          data-direction="horizontal">
          Screen 4
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-500"
          data-direction="vertical">
          Screen 5
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-600"
          data-direction="vertical">
          Screen 6
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-blue-700"
          data-direction="horizontal">
          Screen 7
        </div>
      </div>
      <header className="fixed inset-0 bottom-[unset] z-[99] flex justify-between">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-4">
            <li
              onClick={() => {
                navigateToSection(1)
              }}>
              Section 1
            </li>
            <li
              onClick={() => {
                navigateToSection(2)
              }}>
              Section 2
            </li>
            <li
              onClick={() => {
                navigateToSection(5)
              }}>
              Section 5
            </li>
            <li
              onClick={() => {
                navigateToSection(7)
              }}>
              Section 7
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
