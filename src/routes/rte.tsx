import { RichTextEditor } from '@mantine/rte'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

function RTE() {
  const { control } = useForm({ defaultValues: { rte: '<h1>aaa</h1>' } })

  return (
    <Controller name="rte" control={control} render={({ field }) => (
      <RichTextEditor value={field.value} onChange={field.onChange} />
    )} />
  )
}

export const RTERoute = {
  path: '/rte',
  element: <RTE />
}
