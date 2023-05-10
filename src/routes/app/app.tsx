import { useSearchParams } from 'react-router-dom'
import { usePosts } from '../../services/react-query/posts'

export const DATA = [
  { scope__kvi: 3, scope__promo: 'promo-dependant', avg_price_current: 106.67, avg_price_recommended: 101.78 },
  { scope__kvi: 2, scope__promo: 'no-promo', avg_price_current: 95.72, avg_price_recommended: 101.6 },
  { scope__kvi: 3, scope__promo: 'no-promo', avg_price_current: 96.52, avg_price_recommended: 98.1 },
  { scope__kvi: 2, scope__promo: 'promo-dependant', avg_price_current: 105.47, avg_price_recommended: 104.57 },
  { scope__kvi: 1, scope__promo: 'promo-dependant', avg_price_current: 103.59, avg_price_recommended: 100.3 },
  { scope__kvi: 1, scope__promo: 'no-promo', avg_price_current: 93.13, avg_price_recommended: 99.47 },
]

const KVIS = [
  { id: 1, name: 'Super KVI' },
  { id: 2, name: 'KVI' },
  { id: 3, name: 'Non KVI' },
]

type Data = typeof DATA[number]

type Price = { current: number; recommended: number }

type TableData = {
  id: number
  label: string
  nonEdlp: Partial<Price>
  edlp: Partial<Price>
}

export function transformSummaryToTable(rows: Array<{ id: number; name: string }>, data: Array<Data>) {
  const dataByKviId = new Map<number, TableData>()
  let min: number | undefined
  let max: number | undefined

  for (const row of rows) {
    dataByKviId.set(row.id, { id: row.id, label: row.name, nonEdlp: {}, edlp: {} })
  }

  for (const item of data) {
    min = min === undefined ? item.avg_price_current : Math.min(min, item.avg_price_current, item.avg_price_recommended)
    max = max === undefined ? item.avg_price_current : Math.max(max, item.avg_price_current, item.avg_price_recommended)
    const row = dataByKviId.get(item.scope__kvi)!
    if (item.scope__promo === 'no-promo') {
      dataByKviId.set(item.scope__kvi, {
        ...row,
        nonEdlp: { current: item.avg_price_current, recommended: item.avg_price_recommended },
      })
    }
    if (item.scope__promo === 'promo-dependant') {
      dataByKviId.set(item.scope__kvi, {
        ...row,
        edlp: { current: item.avg_price_current, recommended: item.avg_price_recommended },
      })
    }
  }

  return {
    min: min && min * 0.9,
    max: max && max * 1.1,
    data: rows.map((i) => dataByKviId.get(i.id)!),
  }
}

export default function App() {
  const [params, setSearchParams] = useSearchParams()
  return (
    <div>
      <h1>App</h1>
      <button
        onClick={() => {
          setSearchParams((p) => {
            p.set('kvi', '1')
            return p
          })
        }}>
        +1
      </button>
      <button
        onClick={() => {
          params.delete('a')
          setSearchParams()
        }}>
        -1
      </button>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          console.log(fd.get('aaa'))
        }}>
        <input name="aaa" type="text" defaultValue="aaa" />
      </form>
    </div>
  )
}
