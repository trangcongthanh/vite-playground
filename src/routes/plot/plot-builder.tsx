import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import AAPL from './aapl.json'
import GOOG from './goog.json'

type ChartProps = {
  marks: Array<Plot.Markish>
  options?: Plot.PlotOptions
} & JSX.IntrinsicElements['div']

// function Chart({ marks, options, ...props }: ChartProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//
//   useLayoutEffect(() => {
//     const { current: container } = containerRef
//     const plot = Plot.plot({
//       ...options,
//       marks,
//     })
//     container?.append(plot)
//
//     return () => {
//       plot?.remove()
//     }
//   }, [marks, options])
//
//   return <div ref={containerRef} {...props} />
// }

const Chart = forwardRef<HTMLDivElement | null, ChartProps>(function Element(
  { children, marks, options, ...divProps },
  ref,
) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => container, [container])
  const [svg, setSvg] = useState<SVGSVGElement | null>(null)

  useLayoutEffect(() => {
    if (!container || !svg) {
      return
    }

    const plot = Plot.plot({
      ...options,
      marks,
    })
    // container.append(plot)
    const styleNode = plot.querySelector('style')
    if (styleNode) {
      plot.removeChild(styleNode)
    }
    svg.setAttribute('viewBox', plot.getAttribute('viewBox') || '')
    svg.setAttribute('width', plot.getAttribute('width') || '')
    svg.setAttribute('height', plot.getAttribute('height') || '')
    svg.setAttribute('text-anchor', plot.getAttribute('text-anchor') || '')
    const child = Array.from(plot.children)
    svg.append(...child)
    return () => {
      child.forEach((i) => {
        svg.removeChild(i)
      })
    }
  }, [container, marks, options, svg])

  return (
    <div {...divProps} ref={setContainer}>
      <svg ref={setSvg}>{children}</svg>
    </div>
  )
})

function dualAxisY(data: Plot.Data = [], { y, ticks = 10, tickFormat, ...options }: Plot.AxisYOptions = {}) {
  const [y1, y2] = d3.extent(Array.from(data).map((i) => i[y]))
  const scale = d3.scaleLinear().domain([y1, y2])
  return Plot.axisY(d3.ticks(y1, y2, ticks), { ...options, y: scale, tickFormat: scale.tickFormat(ticks, tickFormat) })
}

const aapl = AAPL.map((d) => ({ ...d, Date: new Date(d.Date) }))
const goog = GOOG.map((d) => ({ ...d, Date: new Date(d.Date) }))

const D1 = [
  {
    name: 'Custom combination segment',
    shareOfSpend: 0.02,
    costPerClick: 2.1,
    costPerConversion: 118,
  },
  { name: 'In-market segment', shareOfSpend: 0.22, costPerClick: 1.1, costPerConversion: 105 },
  { name: 'Affinity segment', shareOfSpend: 0.47, costPerClick: 1, costPerConversion: 90 },
  { name: 'Similar segment', shareOfSpend: 0.19, costPerClick: 1.3, costPerConversion: 80 },
  { name: 'Customer segment', shareOfSpend: 0.09, costPerClick: 1.2, costPerConversion: 71 },
]

const D2 = [
  { type: 'Share Of Spend', name: 'Custom combination segment', value: 0.22 },
  { type: 'Share Of Spend', name: 'In-market segment', value: 0.47 },
  { type: 'Share Of Spend', name: 'Affinity segment', value: 0.19 },
  { type: 'Share Of Spend', name: 'Similar segment', value: 0.09 },
  { type: 'Cost / Click', name: 'Custom combination segment', value: 1.1 },
  { type: 'Cost / Click', name: 'In-market segment', value: 1 },
  { type: 'Cost / Click', name: 'Affinity segment', value: 1.3 },
  { type: 'Cost / Click', name: 'Similar segment', value: 1.2 },
  { type: 'Cost / Conversion', name: 'Custom combination segment', value: 105 },
  { type: 'Cost / Conversion', name: 'In-market segment', value: 90 },
  { type: 'Cost / Conversion', name: 'Affinity segment', value: 80 },
  { type: 'Cost / Conversion', name: 'Similar segment', value: 71 },
]

const options: Plot.PlotOptions = {
  height: 250,
  marginLeft: 100,
  marginBottom: 60,
  padding: 0.4,
  y: { axis: null, label: null },
}

export function PlotBuilder() {
  const marks = useMemo(() => {
    const fontSize = 12
    return [
      Plot.ruleY([0], { strokeDasharray: 8, stroke: '#eee' }),
      Plot.axisX({ label: null, tickSize: 0, lineWidth: 5, lineHeight: 1.2, fontSize }),
      Plot.axisFy({
        fontSize,
        label: null,
        lineWidth: 8,
        anchor: 'left',
        textAnchor: 'end',
        lineHeight: 1.2,
      }),
      Plot.barY(D2, Plot.normalizeY({ x: 'name', y: 'value', fy: 'type', fill: 'url(#gradient)', rx: 4 })),
      Plot.text(
        D2,
        Plot.normalizeY({
          x: 'name',
          y: 'value',
          fy: 'type',
          fill: 'type',
          dy: -fontSize,
          text(d) {
            if (d.type === 'Share Of Spend') {
              return d3.format('.0%')(d.value)
            }
            return d3.format('$')(d.value)
          },
        }),
      ),
    ]
  }, [])
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-8">
        <Chart marks={marks} options={options}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f00" />
              <stop offset="100%" stopColor="#00f" opacity={0} />
            </linearGradient>
          </defs>
          <text x="10" y="20">
            la la la
          </text>
        </Chart>
      </div>
    </div>
  )
}
