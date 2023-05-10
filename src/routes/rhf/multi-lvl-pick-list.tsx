import { Box } from "@mantine/core"

function PicklistMultiLevel() {
  return (
    <Box sx={() => ({ height: '100vh', display: 'flex', flexDirection: 'column' })}>
      <h1>teslkjdlkaf</h1>
      <Box sx={() => ({
        margin: 24,
        padding: 100,
        border: '1px solid gray',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      })}>
        <Box sx={() => ({
          display: 'flex',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap'
        })}>
          {Array.from({ length: 20 }, (_, i) => <Box key={i} sx={{ minWidth: 250, maxWidth: 250, whiteSpace: 'normal' }}>
            <input type="text" />
          </Box>)}
        </Box>
        <Box sx={() => ({
          minHeight: 0,
          flex: 1,
          display: 'flex',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap'
        })}>
          {Array.from({ length: 4 }, (_, i) => <Box key={i} sx={{ minHeight: 0, overflowY: 'auto', minWidth: 250, maxWidth: 250, whiteSpace: 'normal' }}>
            {Array.from({ length: 10 }, (_, i) => <p key={i}>If you set its flex-basis:600px, if the window size goes under 600px, that box will shrink and you will not see a horizontal bar.
            </p>)}
          </Box>)}
        </Box>
      </Box>
    </Box>
  )
}

export const RHFMultiLvlPickListRoute = {
  path: '/rhf-multi-lvl-pick-list',
  element: <PicklistMultiLevel />
}
