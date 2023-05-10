import { Box } from '@mantine/core'
import { HTMLAttributes, useState } from 'react'
import { RouteObject } from 'react-router-dom'

function TextLineClamp({ lineClamp = 3, ...props }: HTMLAttributes<HTMLParagraphElement> & { lineClamp?: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <p
      {...props}
      ref={(r) => {
        if (!r) {
          return
        }
        setIsExpanded(r.scrollHeight <= r.clientHeight)
      }}
      onClick={() => {
        setIsExpanded((p) => !p)
      }}
      style={{
        ...props?.style,
        display: isExpanded ? 'block' : '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineClamp,
        lineClamp,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    />
  )
}

function LineClamp({ children, lineClamp = 3 }: any) {
  return (
    <Box<'p'>
      sx={() => ({
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineClamp,
        lineClamp,
        overflow: 'hidden',
        lineHeight: 1.25,
        '&:not([data-collapsed="true"])': {
          display: 'block',
        },
      })}
      data-collapsed="true"
      data-collapsible="true"
      onClick={(e) => {
        const el = e.currentTarget
        if (el.dataset.collapsible === 'true') {
          el.dataset.collapsed = el.dataset.collapsed === 'true' ? 'false' : 'true'
        }
      }}
      ref={(r) => {
        if (!r) {
          return
        }
        if (r.scrollHeight <= r.clientHeight) {
          r.dataset.collapsed = 'false'
          r.dataset.collapsible = 'false'
        }
      }}>
      {children}
    </Box>
  )
}

function ComponentsPage() {
  return (
    <div>
      <div style={{ width: 300 }}>
        <LineClamp lineClamp={4}>
          Lần đầu trong lịch sử 64 năm của giải U20 châu Á, Việt Nam thắng cả hai trận đầu tiên, trước Australia và
          Qatar. Lần đầu trong lịch sử 64 năm của giải U20 châu Á, Việt Nam thắng cả hai trận đầu tiên, trước Australia
          và Qatar. Lần đầu trong lịch sử 64 năm của giải U20 châu Á, Việt Nam thắng cả hai trận đầu tiên, trước
          Australia và Qatar. Lần đầu trong lịch sử 64 năm của giải U20 châu Á, Việt Nam thắng cả hai trận đầu tiên,
          trước Australia và Qatar.
        </LineClamp>
        <div>ooo</div>
      </div>
    </div>
  )
}

export const componentsRoute: RouteObject = {
  path: '/components',
  element: <ComponentsPage />,
}
