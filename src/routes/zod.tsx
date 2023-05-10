import { Box, Button, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

function ZodExample() {
  const { control, handleSubmit } = useForm<{ num: any }>()
  return (
    <Box>
      <Controller
        control={control}
        name="num"
        render={({ field, fieldState }) => <TextInput label="OOOO" {...field} error={fieldState.error?.message} />}
        rules={{
          validate(v: unknown) {
            return true
          },
        }}
      />
      <Button onClick={handleSubmit((d) => console.log(d))}>aaa</Button>
    </Box>
  )
}
export const ZodRoute = {
  path: '/zod',
  element: <ZodExample />,
}
