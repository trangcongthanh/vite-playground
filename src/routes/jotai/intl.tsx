import { atom, useAtomValue } from 'jotai'

const localeAtom = atom(window.navigator.language || 'en-US')
const numberFormatOptionsAtom = atom({})
const currencyFormatOptionsAtom = atom({})

const numberFormater = atom((get) => {
  const locale = get(localeAtom)
  return new Intl.NumberFormat(locale).format
})

const currencyFormatter = atom((get) => {
  const locale = get(localeAtom)
  return new Intl.NumberFormat(locale).format
})

function Test() {
  const f = useAtomValue(numberFormater)
  const f1 = useAtomValue(numberFormater)
  console.log(f === f1)
  return <div>{f(123123)}</div>
}
export function Intls() {
  return <Test />
}
