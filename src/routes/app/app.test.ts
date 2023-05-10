import { describe, it, expect } from 'vitest'
import { transformSummaryToTable } from './app'

export const DATA = [
  { scope__kvi: 3, scope__promo: 'promo-dependant', avg_price_current: 106.67, avg_price_recommended: 101.78 },
  { scope__kvi: 2, scope__promo: 'no-promo', avg_price_current: 95.72, avg_price_recommended: 101.6 },
  { scope__kvi: 3, scope__promo: 'no-promo', avg_price_current: 96.52, avg_price_recommended: 98.1 },
  { scope__kvi: 2, scope__promo: 'promo-dependant', avg_price_current: 105.47, avg_price_recommended: 104.57 },
  { scope__kvi: 1, scope__promo: 'promo-dependant', avg_price_current: 103.59, avg_price_recommended: 100.3 },
  { scope__kvi: 1, scope__promo: 'no-promo', avg_price_current: 93.13, avg_price_recommended: 99.47 },
]

describe('transform summary to table', () => {
  it('min/max', () => {
    const ROWS = [
      {
        id: 1,
        name: 'Super KVI',
      },
      { id: 2, name: 'KVI' },
      { id: 3, name: 'Non KVI' },
    ]
    const output = transformSummaryToTable(ROWS, DATA)
    expect(output.min).toBe(93.13 * 0.9)
    expect(output.max).toBe(106.67 * 1.1)
  })
  it('order increase', () => {
    const ROWS = [
      {
        id: 1,
        name: 'Super KVI',
      },
      { id: 2, name: 'KVI' },
      { id: 3, name: 'Non KVI' },
    ]
    const output = transformSummaryToTable(ROWS, DATA)
    expect(output.data.length).toBe(ROWS.length)
    expect(output.data[0].id).toBe(1)
    expect(output.data[0].label).toBe('Super KVI')
    expect(output.data[1].id).toBe(2)
    expect(output.data[1].label).toBe('KVI')
    expect(output.data[2].id).toBe(3)
    expect(output.data[2].label).toBe('Non KVI')
  })

  it('order decrease', () => {
    const ROWS = [
      {
        id: 1,
        name: 'Super KVI',
      },
      { id: 2, name: 'KVI' },
      { id: 3, name: 'Non KVI' },
    ].reverse()
    const output = transformSummaryToTable(ROWS, DATA)
    expect(output.data.length).toBe(ROWS.length)
    expect(output.data[2].id).toBe(1)
    expect(output.data[2].label).toBe('Super KVI')
    expect(output.data[1].id).toBe(2)
    expect(output.data[1].label).toBe('KVI')
    expect(output.data[0].id).toBe(3)
    expect(output.data[0].label).toBe('Non KVI')
  })

  it('order random', () => {
    const ROWS = [
      {
        id: 1,
        name: 'Super KVI',
      },
      { id: 2, name: 'KVI' },
      { id: 3, name: 'Non KVI' },
    ].sort(() => Math.random() - 0.5)
    const output = transformSummaryToTable(ROWS, DATA)
    expect(output.data.length).toBe(ROWS.length)
    expect(output.data[2].id).toBe(ROWS[2].id)
    expect(output.data[2].label).toBe(ROWS[2].name)
    expect(output.data[1].id).toBe(ROWS[1].id)
    expect(output.data[1].label).toBe(ROWS[1].name)
    expect(output.data[0].id).toBe(ROWS[0].id)
    expect(output.data[0].label).toBe(ROWS[0].name)
  })
})
