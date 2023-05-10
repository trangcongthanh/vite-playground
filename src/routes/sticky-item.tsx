import { Box, Button, ScrollArea, Stack } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { RouteObject } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { useEffect, useRef, useState } from 'react'

function StickyItemPage() {
  const [items, { append, prepend }] = useListState<{ title: string; id: string }>(
    Array.from({ length: 20 }, () => ({
      title: faker.lorem.sentence(faker.datatype.number({ min: 4, max: 20 })),
      id: faker.datatype.uuid(),
    })),
  )
  const [selected, setSelected] = useState<string>()

  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = viewportRef.current
    if (element) {
      const controller = new AbortController()
      element.addEventListener(
        'scroll',
        (event) => {
          const scrollElement = event.currentTarget as HTMLDivElement
          const stickyElement = (element.querySelector('#selected-item') as HTMLDivElement) || null
          if (stickyElement) {
            const scrollTop = scrollElement.scrollTop
            const scrollBottom = scrollTop + scrollElement.clientHeight
            const stickyTop = Number(stickyElement.dataset.offsetTop)
            const stickyBottom = stickyTop + Number(stickyElement.dataset.height)

            if (scrollTop > stickyTop) {
              stickyElement.classList.add('sticky', 'sticky-top')
            } else if (scrollBottom < stickyBottom) {
              stickyElement.classList.add('sticky', 'sticky-bottom')
            } else {
              stickyElement.classList.remove('sticky', 'sticky-top', 'sticky-bottom')
            }
          }
        },
        { signal: controller.signal },
      )
      return () => {
        controller.abort()
      }
    }
  })

  return (
    <Box
      sx={() => ({
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '500px 1fr',
        gridTemplateRows: 'repeat(1, minmax(0, 1fr))',
        '#selected-item': {
          backgroundColor: 'red',
        },
        '.item': {
          padding: 20,
        },
        '.sticky': {
          position: 'absolute',
          left: 0,
          right: 0,
          transition: 'all 0.3s ease-in-out',
          padding: 8,
        },
        '.sticky-top': { top: 0, transformOrigin: 'left top' },
        '.sticky-bottom': { bottom: 0, transformOrigin: 'bottom' },
        '.sticky-top,.sticky-bottom': {
          '.preview': {
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            '& > *': {
              order: 'calc(4 - var(--i))' as unknown as number,
              transform: 'translateX(calc(var(--i) * 8px)) scale(calc(1 - var(--i) * 0.1))',
              opacity: 'calc(1 - var(--i) * 0.1)',
              width: 20,
              height: 20,
            },
          },
        },
        '.preview': {
          transition: 'all 0.3s ease-in-out',
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          '& > *': {
            transition: 'all 0.3s ease-in-out',
            transform: 'translateX(calc(100% * var(--i) + 8px * var(--i))) scale(1)',
            gridArea: '1 / 1',
            width: 40,
            height: 40,
            backgroundColor: 'blue',
          },
        },
      })}>
      <Box style={{ padding: 20 }}>
        <ScrollArea style={{ position: 'relative', backgroundColor: '#999', height: '100%' }} viewportRef={viewportRef}>
          <Stack>
            {items.map((item, itemIndex) => (
              <Box key={item.id}>
                <Box<'div'>
                  ref={(el) => {
                    if (el) {
                      el.dataset.offsetTop = el.offsetTop.toString()
                      el.dataset.height = el.clientHeight.toString()
                      const parent = el.parentElement
                      if (parent) {
                        parent.style.height = `${el.clientHeight}px`
                      }
                      if (selected !== item.id) {
                        el.classList.remove('sticky', 'sticky-top', 'sticky-bottom')
                      }
                    }
                  }}
                  className="item"
                  id={selected === item.id ? 'selected-item' : undefined}
                  onClick={() => {
                    setSelected(item.id)
                  }}>
                  {(itemIndex % 3 === 0 && (
                    <Box className="preview">
                      {Array.from({ length: 4 }, (_, i) => (
                        <Box
                          style={{
                            // @ts-ignore
                            '--i': i,
                          }}
                        />
                      ))}
                    </Box>
                  )) ||
                    item.title}
                </Box>
              </Box>
            ))}
          </Stack>
        </ScrollArea>
      </Box>
      <Stack>
        <Button
          onClick={() => {
            prepend({ title: faker.lorem.sentence(6), id: faker.datatype.uuid() })
          }}>
          Prepend
        </Button>
        <Button
          onClick={() => {
            append({ title: faker.lorem.sentence(6), id: faker.datatype.uuid() })
          }}>
          Append
        </Button>
      </Stack>
    </Box>
  )
}

export const stickyItemRoute: RouteObject = {
  path: 'sticky-item',
  element: <StickyItemPage />,
}
