import { create } from 'zustand'

const intl = create((set) => ({
  locale: navigator?.languages?.[0] || navigator?.language || 'en-US',
}))

export function ZustandIntl() {
  return <div>hi</div>
}
