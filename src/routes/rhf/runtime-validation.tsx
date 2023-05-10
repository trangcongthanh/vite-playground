import { NumberInput, Radio } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

function RuntimeValidation() {
  const [minMax, setMinMax] = useState({ min: 0, max: Infinity })
  const { control, watch, handleSubmit, setValue, clearErrors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const [formState, setFormState] = useState({})

  const deps = watch(['package'])

  useEffect(() => {
    console.log('useEffect')
    setMinMax({
      min: +deps[0] * 1_000_000,
      max: +deps[0] * 10_000_000,
    })
  }, deps)
  //
  // console.log({ minMax })

  // const selectedPackage = watch("package")
  //
  // const minMax = useMemo(() => {
  //   return {
  //     min: +selectedPackage * 1_000_000,
  //     max: +selectedPackage * 10_000_000,
  //   }
  // }, [selectedPackage])
  //
  // console.log({ minMax })

  return (
    <form
      onSubmit={handleSubmit((d) => {
        setFormState(d)
      })}>
      <Controller
        control={control}
        name="package"
        render={({ field }) => (
          <Radio.Group
            {...field}
            onChange={(p) => {
              field.onChange(p)
              console.log('change value')
              clearErrors('amount')
              setValue('amount', +p * 10_000_000)
            }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Radio value={`${(i + 1) * 10}`} label={(i + 1) * 10} />
            ))}
          </Radio.Group>
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field, fieldState }) => <NumberInput {...field} label="Amount" error={fieldState.error?.message} />}
        rules={{
          validate(v) {
            console.log('validate')
            if (v < minMax.min) {
              return `Amount must be greater than ${minMax.min}`
            }
            if (v > minMax.max) {
              return `Amount must be less than ${minMax.max}`
            }
          },
        }}
      />
      <button type="submit">Submit</button>
      {JSON.stringify(formState)}
    </form>
  )
}

export const RuntimeValidationRoute = {
  path: '/runtime-validation',
  element: <RuntimeValidation />,
}
