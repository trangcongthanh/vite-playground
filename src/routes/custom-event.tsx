import { useEffect, useState } from 'react'

function createCustomEvents<Handlers extends Record<string, (detail: any) => void>>(prefix: string) {
  function useListeners(handlers: Handlers) {
    useEffect(
      function listeners() {
        const controller = new AbortController()
        for (const [eventType, eventHandler] of Object.entries(handlers)) {
          document.addEventListener(`${prefix}:${String(eventType)}`, ({ detail }: any) => eventHandler(detail), {
            signal: controller.signal,
          })
        }
        return () => {
          controller.abort()
        }
      },
      [handlers],
    )
  }

  function createEvent(eventType: keyof Handlers) {
    return (detail: any) => {
      document.dispatchEvent(new CustomEvent(`${prefix}:${String(eventType)}`, { detail }))
    }
  }

  return [useListeners, createEvent] as const
}

const [useModals, createModalEvent] = createCustomEvents<{
  open: () => void
  close: () => void
  closeAll: () => void
  toggle: (payload: JSX.Element) => void
}>('modals')
const toggleModal = createModalEvent('toggle')
const openModal = createModalEvent('open')
const closeModal = createModalEvent('close')
const closeAllModal = createModalEvent('closeAll')

type Props = {}

export function CustomEventExample({ }: Props) {
  const [show, setShow] = useState(false)
  const [el, setEl] = useState<JSX.Element | null>(null)

  useModals({
    toggle: (el) => {
      setEl(el)
    },
    open: () => setShow(true),
    close: () => setEl(null),
    closeAll: () => setShow(false),
  })

  return (
    <div>
      <button
        onClick={() => {
          toggleModal(<div>a</div>)
        }}
      >
        Hi!
      </button>
      {el}
    </div>
  )
}

export const CustomEventRoute = {
  path: '/custom-event',
  element: <CustomEventExample />,
}
