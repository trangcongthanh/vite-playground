import * as Plot from '@observablehq/plot'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import data from './data.json'

type ChartProps = {
  marks: Array<Plot.Markish>
  options?: Plot.PlotOptions
} & JSX.IntrinsicElements['div']

function Chart({ marks, options, ...props }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const { current: container } = containerRef
    const plot = Plot.plot({
      ...options,
      marks,
    })
    container?.append(plot)
    return () => {
      plot?.remove()
    }
  }, [marks, options])

  return (
    <div ref={containerRef} {...props}>
      {props.children}
    </div>
  )
}

const options: Plot.PlotOptions = {
  margin: 20,
}

export function PlotBuilder() {
  const [count, setCount] = useState(0)
  const marks = useMemo(() => {
    return [Plot.dot(data, { x: 'culmen_length_mm', y: 'culmen_depth_mm' })]
  }, [])
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => {
          setCount((p) => p + 1)
        }}>
        {count}
      </button>
      <Chart marks={marks} options={options} />
    </div>
  )
}
