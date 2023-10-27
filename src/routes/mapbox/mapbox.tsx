import mapboxgl, { Expression } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

const ENV = {
  accessToken: 'pk.eyJ1IjoidGhhbmh0YyIsImEiOiJjangxZmN6bWwwOTc4M3lxcHRsYW1tOW81In0.G-nEJxDpJlm3yoja2WZsxw',
  style: 'mapbox://styles/thanhtc/cjyd9rp8c0fmy1cmkhkmvs14x',

  us: {
    states: '',
    counties: '',
    dmas: '',
    zipcode: '',
  },
  it: {
    regions: '',
    provinces: '',
  },
}

mapboxgl.accessToken = ENV.accessToken

export function Mapbox() {
  const ref = useRef<HTMLDivElement>(null)
  const [_, setMap] = useState<mapboxgl.Map>()

  useEffect(() => {
    const m = new mapboxgl.Map({
      container: ref.current!,
      style: ENV.style,
      cooperativeGestures: true,
    })

    m.on('load', () => {
      m.addSource('us-counties', {
        type: 'vector',
        url: 'mapbox://thanhtc.8qo1htud',
      })

      const fillColor = ['match', ['get', 'name'], 'San Francisco', 'rgb(255, 0, 0)', '#000000'] as Expression
      m.addLayer(
        {
          id: 'counties-join',
          type: 'fill',
          source: 'us-counties',
          'source-layer': 'us-counties-0b7lw8',
          layout: {},
          paint: {
            'fill-color': fillColor,
          },
        },
        'water',
      )

      setMap(m)
    })

    return () => {
      m.remove()
    }
  }, [])

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>{new Date().toISOString()}</div>
    </>
  )
}
