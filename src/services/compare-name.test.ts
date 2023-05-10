import { describe, expect, it } from 'vitest'
import { compareName } from './compare-name'

describe('Workds', () => {
  it('bar', () => {
    const GRAB_NAME = "Nguyễn Văn A"
    const EKYC_NAME = "Gnuyễn Văn A"
    expect(compareName(GRAB_NAME, EKYC_NAME)).lte(1)

  })

})
