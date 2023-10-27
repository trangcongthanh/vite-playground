import { axisBottom, bisector, scaleBand, select } from 'd3'
import { useId, useLayoutEffect } from 'react'
import alphabet from './alphabet.json'

export function D3() {
  const id = useId()
  const svgId = `svg-${id}`

  useLayoutEffect(() => {
    const width = 1000
    const height = 500

    const x = scaleBand()
      .domain(alphabet.map((i) => i.letter))
      .range([0, width])

    const bisect = bisector<typeof alphabet[0], string>((d) => d.letter).center

    const svg = select(`#${CSS.escape(svgId)}`)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height].join(' '))
      .on('pointerenter pointermove', (event) => {})

    svg.append('g').call(axisBottom(x))
  }, [svgId])

  return (
    <div id={id}>
      <svg id={svgId} />
    </div>
  )
}
