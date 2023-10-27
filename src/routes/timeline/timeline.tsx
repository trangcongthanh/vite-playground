import { faker } from '@faker-js/faker'
import * as dayjs from 'dayjs'
import { useMemo, useState } from 'react'

function generateData() {
  return Array.from({ length: 10 }, (_, i) => {
    const startDate = faker.date.between({
      from: dayjs().add(-1, 'years').toISOString(),
      to: dayjs().add(1, 'years').toISOString(),
    })
    const endDate = new Date(startDate.toISOString())
    const day = faker.number.int({ min: -3, max: 3 })
    const range = faker.number.int({ min: 1, max: 3 })
    endDate.setDate(endDate.getDate() + day)
    endDate.setMonth(endDate.getMonth() + range)
    return {
      title: `Item ${i + 1}`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }
  })
}

export function TimelineView() {
  const [data] = useState(generateData())

  const { minDate, maxDate } = useMemo(() => {
    return data.reduce((a, i, idx) => {
      if (idx === 0) {
        return {
          minDate: i.startDate,
          maxDate: i.endDate,
        }
      }
      const start = new Date(i.startDate).getTime()
      const end = new Date(i.endDate).getTime()
      const min = new Date(a.minDate).getTime()
      const max = new Date(a.maxDate).getTime()
      if (start < min) {
        a.minDate = i.startDate
      }
      if (end > max) {
        a.maxDate = i.endDate
      }
      return a
    }, {} as { minDate: string; maxDate: string })
  }, [data])

  const d1 = dayjs(minDate).add(-1, 'month')
  const d2 = dayjs(maxDate).add(1, 'month')
  const length = Math.abs(d1.diff(d2, 'months'))

  const COLUMN_WIDTH = 130
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-full overflow-auto">
        <div
          style={{
            position: 'relative',
            width: length * COLUMN_WIDTH,
            background: 'linear-gradient(90deg, #999, white 1px)',
            backgroundSize: COLUMN_WIDTH,
          }}>
          <div className="sticky top-0 h-[32px]">
            {Array.from({ length }, (_, i) => {
              return (
                <div
                  key={i}
                  className="absolute inset-0 right-[unset]"
                  style={{ transform: `translateX(${i * COLUMN_WIDTH}px)` }}>
                  <div className="sticky top-0 flex items-center justify-center" style={{ width: COLUMN_WIDTH }}>
                    {d1.add(i, 'month').format('MMM YYYY')}
                  </div>
                </div>
              )
            })}
          </div>
          {data.map((i) => {
            const start = dayjs(i.startDate)
            const end = dayjs(i.endDate)
            const x = Math.abs(d1.diff(start, 'months', true)) * COLUMN_WIDTH
            const width = Math.abs(start.diff(end, 'months', true)) * COLUMN_WIDTH
            return (
              <div key={i.title} className="relative h-[32px]">
                <div className="absolute left-0 top-0 bg-green-100" style={{ transform: `translateX(${x}px)`, width }}>
                  {start.format('DD MM YYYY')}
                  {i.title}
                  {end.format('DD MM YYYY')}
                </div>
              </div>
            )
          })}
          <div
            style={{
              width: 1,
              backgroundColor: 'red',
              transform: `translateX(${Math.abs(d1.diff(dayjs(), 'months', true)) * COLUMN_WIDTH}px)`,
              position: 'absolute',
              top: 0,
              bottom: 0,
            }}
            ref={(r) => {
              r?.scrollIntoView()
            }}>
            <div />
          </div>
        </div>
      </div>
    </div>
  )
}
