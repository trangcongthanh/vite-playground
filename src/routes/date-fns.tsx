import { Divider, Input } from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { parse, format, differenceInMonths } from 'date-fns'
import { useState } from 'react'

const start = new Date('2022-09-22T06:30:40.895Z')
const end = new Date('2022-10-23T06:30:40.895Z')

function DateFnsExample() {
  const [value, onChange] = useState<string>()
  const [date, setDate] = useState<string>()

  function diff(d1: Date, d2: Date) {
    return (d2.getFullYear() - d1.getFullYear()) * 12 - d1.getMonth() + d2.getMonth()
  }

  return (
    <div>
      <div>
        <p>{diff(start, end)}</p>
        <p>{differenceInMonths(start, end)}</p>
      </div>
      <TimeInput
        value={value ? parse(value, 'HH:mm:ss', new Date()) : undefined}
        onChange={(date) => {
          onChange(date ? format(date, 'HH:mm:ss') : undefined)
        }}
        withSeconds
        clearable
      />
      <div>{value}</div>
      <Divider />
      <Input.Wrapper label="AAAA">
        <DatePicker
          value={date ? parse(date, 'yyyy-MM-dd', new Date()) : undefined}
          onChange={(newDate) => {
            setDate(newDate ? format(newDate, 'yyyy-MM-dd') : undefined)
          }}
        />
      </Input.Wrapper>
      <div>{date}</div>
    </div>
  )
}

export const DateFnsRoute = {
  path: '/date-fns',
  element: <DateFnsExample />,
}
