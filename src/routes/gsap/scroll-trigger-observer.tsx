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
          ease: 'none',
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
          ease: 'none',
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
        ease: 'none',
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
        ease: 'none',
      },
      0,
    )
  }, [])

  useLayoutEffect(() => {
    const { current: container } = containerRef
    const items = container?.querySelectorAll<HTMLDivElement>('div.screen')

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
      <div
        className="relative isolate h-[100svh] overflow-hidden"
        ref={containerRef}
        style={{
          overscrollBehavior: 'none',
          maxHeight: '-webkit-fill-available',
        }}>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-white"
          data-direction="vertical">
          <header className="absolute inset-0 bottom-[unset] flex justify-between px-10 pt-8">
            <svg width={147} height={24} viewBox="0 0 147 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M36.18.01v4.58c-3.492.365-6.096 3.43-5.934 6.982v.064c-.159 3.746 2.709 6.912 6.405 7.073.071.003.143.005.214.006 3.53-.002 6.42-2.844 6.53-6.42h5.038c-.294 6.251-5.452 11.125-11.626 10.988-6.235.16-11.418-4.83-11.577-11.148-.003-.144-.005-.29-.003-.435v-.064C25.168 5.394 30.023.24 36.18.01zM91.822.356h5.045v22.579h-5.045V.356zM77.359 22.933V.357h4.36l3.376 4.662v7.797l-3.07-4.234v14.351h-4.666zM133.411.357a8.501 8.501 0 016.342 2.29 7.232 7.232 0 011.868 5.16v.065c.163 3.13-1.744 5.988-4.67 7l5.324 8.063h-5.605L132 15.71h-3.762v7.225h-4.795V11.3h4.795v.023h4.857c2.335 0 3.674-1.29 3.674-3.194v-.065c0-2-1.264-3.088-3.35-3.213l-.008-4.493zM66.804 8.13c0 1.903-1.339 3.193-3.674 3.193h-4.857V4.841h4.764c2.331 0 3.767 1.092 3.767 3.225v.064zm.185 6.741c2.927-1.012 4.834-3.87 4.67-6.999v-.064a7.233 7.233 0 00-1.867-5.16A8.506 8.506 0 0063.44.356L53.478.36v15.32l7.19.03h1.372l4.67 7.225h5.603l-5.324-8.064zM19.846 3.404A11.11 11.11 0 0011.293.01c-.516 0-1.03.033-1.542.097v4.56a6.14 6.14 0 011.505-.193c2.1.057 4.094.949 5.55 2.483l3.04-3.553zm-8.483 15.26c-3.533 0-6.04-2.895-6.316-6.497H0c.107 6.188 5.101 11.14 11.21 11.116 3.451.139 6.769-1.365 8.967-4.065l-3.062-3.223c-1.719 1.628-3.25 2.669-5.752 2.669zM101.914.357h16.483v4.516h-16.483V.357zm5.381 13.547V9.389h9.753v4.515h-9.753zm11.099 4.516h-16.48v4.516h16.48V18.42z"
              />
            </svg>
            <nav>
              <ul className="flex gap-20 text-lg">
                <li
                  onClick={() => {
                    navigateToSection(1)
                  }}>
                  Expertise
                </li>
                <li
                  onClick={() => {
                    navigateToSection(2)
                  }}>
                  Workflow
                </li>
                <li
                  onClick={() => {
                    navigateToSection(5)
                  }}>
                  Stories
                </li>
                <li
                  onClick={() => {
                    navigateToSection(7)
                  }}>
                  Careers
                </li>
                <li>Insights</li>
                <li>Contact</li>
              </ul>
            </nav>
          </header>
          Screen 1
        </div>
        <div
          className="screen absolute inset-0 flex h-screen items-center justify-center bg-white"
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
    </>
  )
}
