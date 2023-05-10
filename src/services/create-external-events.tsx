import { useEffect, useLayoutEffect } from 'react'

const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function createExternalEvents<Handlers extends Record<string, (...args: any[]) => void>>(prefix: string) {
  function useExternalEvents(handlers: Handlers) {
    useIsomorphicEffect(
      function eventListeners() {
        const controller = new AbortController()
        const events = Object.entries(handlers)
        for (const [eventName, eventHandler] of events) {
          document.addEventListener(
            `${prefix}:${String(eventName)}`,
            (e: CustomEvent) => {
              eventHandler(e.detail)
            },
            { signal: controller.signal },
          )
        }
        return () => {
          controller.abort()
        }
      },
      [handlers],
    )
  }
  function createEvent() { }
}
