import { Box, Divider, Group, Input, InputProps, Popover, ScrollArea, Stack, UnstyledButton, rem } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
dayjs.extend(quarterOfYear)

function getToNow({ unit }: { unit: 'day' | 'month' | 'week' | 'quarter' | 'year' }) {
  const today = dayjs()
  const startOf = today.startOf(unit as any)
  return [startOf.format('YYYY-MM-DD'), today.format('YYYY-MM-DD')] as [string | null, string | null]
}

function getAmountToNow({
  unit,
  amount = 1,
}: {
  unit: 'day' | 'month' | 'week' | 'quarter' | 'year'
  amount?: number
}) {
  const today = dayjs()
  const startOf = today.subtract(amount, unit as any)
  return [startOf.format('YYYY-MM-DD'), today.format('YYYY-MM-DD')] as [string | null, string | null]
}

type DatesPickerInputProps = {
  value?: [string | null, string | null]
  onChange?(value: [string | null, string | null]): void
  placeholder?: string
  label?: string
} & Pick<InputProps, 'variant' | 'error'>

function DatesPickerInput({
  error,
  label,
  value = [null, null],
  onChange,
  placeholder,
  variant = 'unstyled',
}: DatesPickerInputProps) {
  const [start, end] = value
  const startDate = (start && dayjs(start).toDate()) || null
  const endDate = (end && dayjs(end).toDate()) || null
  const text = [startDate, endDate]
    .reduce((a, i) => {
      if (i) {
        a.push(dayjs(i).format('DD MMM, YYYY'))
      }
      return a
    }, [] as Array<string>)
    .join(' - ')
  return (
    <Popover>
      <Popover.Target>
        <Input.Wrapper label={label} error={error}>
          <Input component="button" error={error} variant={variant}>
            {text}
            {!text && <Input.Placeholder>{placeholder}</Input.Placeholder>}
          </Input>
        </Input.Wrapper>
      </Popover.Target>
      <Popover.Dropdown>
        <Group spacing={rem(8)}>
          <ScrollArea.Autosize h={rem(300)} w={rem(200)}>
            <Stack spacing={rem(4)}>
              {/** [firstDayOf(Today), today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getToNow({ unit: 'day' }))
                }}>
                Today
              </Item>
              {/** [yesterday, yesterday] */}
              <Item>Yesterday</Item>
              <Divider color="gray.1" />
              {/** [firstDayOf(Week), today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getToNow({ unit: 'week' }))
                }}>
                This week
              </Item>
              {/** [today - 7 days, today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getAmountToNow({ amount: 6, unit: 'day' }))
                }}>
                Last 7 days
              </Item>
              <Divider color="gray.1" />
              {/** [firstDayOf(Month), today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getToNow({ unit: 'month' }))
                }}>
                This month
              </Item>
              {/** [today - 30 days, today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getAmountToNow({ amount: 29, unit: 'day' }))
                }}>
                Last 30 days
              </Item>
              {/** [today - 60 days, today] */}
              <Item>Last 60 days</Item>
              <Divider color="gray.1" />
              {/** [firstDayOf(Quater), today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getToNow({ unit: 'quarter' }))
                }}>
                This quarter
              </Item>
              {/** [today - 3 months, today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getAmountToNow({ amount: 3, unit: 'month' }))
                }}>
                Last 3 months
              </Item>
              {/** [today - 6 months, today] */}
              <Item>Last 6 months</Item>
              <Divider color="gray.1" />
              {/** [firstDayOf(Year), today] */}
              <Item
                onClick={() => {
                  if (!onChange) {
                    return
                  }
                  onChange(getToNow({ unit: 'year' }))
                }}>
                This year
              </Item>
              {/** [today - 12 months, today] */}
              <Item>Last 12 months</Item>
            </Stack>
          </ScrollArea.Autosize>
          <Divider orientation="vertical" color="gray.1" />
          <DatePicker
            allowSingleDateInRange
            type="range"
            value={[startDate, endDate]}
            onChange={([start, end]) => {
              if (!onChange) {
                return
              }
              const v: [string | null, string | null] = [null, null]
              if (start) {
                v[0] = dayjs(start).format('YYYY-MM-DD')
              }
              if (end) {
                v[1] = dayjs(end).format('YYYY-MM-DD')
              }
              onChange(v)
            }}
            numberOfColumns={2}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

function Item({ children, onClick }: { children: ReactNode; onClick?(): void }) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        '&:hover': {
          backgroundColor: theme.colors.gray[1],
        },
      })}>
      {children}
    </UnstyledButton>
  )
}

function MantineExample() {
  const [params, setParams] = useSearchParams()

  const from = params.get('from')
  const to = params.get('to')

  const value = [from, to] as [string | null, string | null]
  const setValue = (value: [string | null, string | null]) => {
    const [from, to] = value
    const p = new URLSearchParams()
    if (from) {
      p.set('from', from)
    }
    if (to) {
      p.set('to', to)
    }
    setParams(p)
  }
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <Box w={300}>
        <DatesPickerInput value={value} onChange={setValue} />
      </Box>
    </Box>
  )
}

export const MantineRoute = {
  path: '/mantine',
  element: <MantineExample />,
}
