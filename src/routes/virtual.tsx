import { ScrollArea } from '@mantine/core'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'

async function sleep() {
  return new Promise((r) => {
    setTimeout(() => r(''), 1000)
  })
}

function VirtualPage() {
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ['virtual'],
  //   async queryFn({ pageParam }) {
  //     await sleep()
  //     return {
  //       data: Array.from({ length: 6 }, (_, i) => i + (pageParam?.offset || 0) + 1),
  //       pagination: {
  //         offset: pageParam?.offset ?? 0,
  //         limit: 6,
  //         total: 59,
  //       },
  //     }
  //   },
  //   getNextPageParam(lastPage) {
  //     const offset = lastPage.pagination.offset + lastPage.pagination.limit
  //     if (offset < lastPage.pagination.total) {
  //       return {
  //         offset,
  //       }
  //     }
  //   },
  // })

  const [page, setPage] = useState(1)
  const [limit] = useState(6)

  const { data, isLoading } = useQuery({
    queryKey: ['virtual', { offset: (page - 1) * limit, limit }] as const,
    async queryFn({ queryKey }) {
      const [, { offset, limit }] = queryKey
      await sleep()
      return {
        data: Array.from({ length: limit }, (_, i) => i + offset + 1),
        pagination: {
          offset,
          limit,
          total: 59,
        },
      }
    },
  })

  const { data: staleData } = useQuery({
    queryKey: ['virtual', { offset: (page - 1) * limit, limit }] as const,
    enabled: false,
    keepPreviousData: true,
    async queryFn({ queryKey }) {
      const [, { offset, limit }] = queryKey
      await sleep()
      return {
        data: Array.from({ length: limit }, (_, i) => i + offset + 1),
        pagination: {
          offset,
          limit,
          total: 59,
        },
      }
    },
  })

  const totalPage = (staleData && Math.ceil(staleData.pagination.total / staleData.pagination.limit)) || 1

  const parentRef = useRef<HTMLDivElement>(null)

  const pageVirtualizer = useVirtualizer({
    count: totalPage,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 2,
  })

  useEffect(() => {
    const el = parentRef.current
    if (el) {
      const controller = new AbortController()
      el.addEventListener(
        'scrollend',
        () => {
          console.log('a')
        },
        { signal: controller.signal },
      )
      return () => {
        controller.abort()
      }
    }
  }, [])

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
        <ScrollArea viewportRef={parentRef} style={{ height: '100%' }}>
          <div
            style={{
              height: pageVirtualizer.getTotalSize(),
              position: 'relative',
            }}>
            {pageVirtualizer.getVirtualItems().map((row, pageIndex) => {
              return (
                <div
                  data-index={row.index}
                  key={row.key}
                  ref={pageVirtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: row.start,
                    left: 0,
                    right: 0,
                    display: 'grid',
                    gap: 8,
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    backgroundColor: '#999',
                    padding: 8,
                    aspectRatio: '21/9',
                  }}>
                  {(data?.data || []).map((item) => {
                    return (
                      <div key={item} style={{ backgroundColor: 'white' }}>
                        {item}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
      <div>
        <button
          onClick={() => {
            setPage((p) => Math.max(1, p - 1))
          }}>
          -1
        </button>
        <button
          onClick={() => {
            setPage((p) => Math.min(p + 1, totalPage))
          }}>
          +1
        </button>
      </div>
    </div>
  )
}
export const virtualRoute = {
  path: '/virtual',
  element: <VirtualPage />,
}
