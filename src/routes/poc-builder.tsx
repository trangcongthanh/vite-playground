import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"

const CustomInput = forwardRef((props, ref) => {
  const { setValue, getValues, control } = useFormContext()
  const [shouldRender, setShouldRender] = useState(true)

  const innerRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus() {
      innerRef.current?.focus()
    },
    getValue() {
      return getValues('textInput')
    },
    setValue(value: string) {
      setValue('textInput', value)
    },
    toggle() {
      setShouldRender(p => !p)
    }
  }))

  if (!shouldRender) {
    return null
  }

  return <Controller control={control} name="textInput" render={({ field }) => <input {...props} value={field.value} onChange={e => field.onChange(e.target.value)} ref={innerRef} />} />
})

function POCBuilder() {
  const formMethods = useForm()
  const refs = useRef(new Map())
  return (
    <FormProvider {...formMethods}>
      <CustomInput ref={el => refs.current.set('textInput', el)} />
      <button onClick={() => {
        refs.current.get('textInput').setValue(new Date().toISOString())
      }}>Set</button>
      <button onClick={() => {
        refs.current.get('textInput').toggle()
      }}>Toggle</button>
    </FormProvider>
  )
}

export const POCBuilderRoute = {
  path: '/poc-builder',
  element: <POCBuilder />,
}
