import { Provider, atom, useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'

type Product = {
  id: number
  name: string
}

const productsAtom = atom<Array<Product>>([])
const productAtom = atom((get) => (id: number) => {
  return get(productsAtom).find((p) => p.id === id)
})

function HydrateAtom({
  initialValues,
  children,
}: PropsWithChildren<{
  initialValues: [[typeof productsAtom, Array<Product>]]
}>) {
  useHydrateAtoms(initialValues)
  return <>{children}</>
}

function RetailUI() {
  const products = useAtomValue(productsAtom)
  const product = useAtomValue(productAtom)
  const [params, setParams] = useSearchParams()
  return (
    <div>
      <button
        onClick={() => {
          setParams((p) => {
            p.set('c', new Date().toISOString())
            return p
          })
        }}>
        a
      </button>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      <pre>{JSON.stringify(product(1), null, 2)}</pre>
    </div>
  )
}

export function JotaiRetailUI() {
  return (
    <Provider>
      <HydrateAtom
        initialValues={[
          [
            productsAtom,
            [
              { id: 1, name: new Date().toISOString() },
              { id: 2, name: 'P 2' },
            ],
          ],
        ]}>
        <RetailUI />
      </HydrateAtom>
    </Provider>
  )
}
