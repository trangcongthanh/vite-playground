import { Box, Group, Image } from '@mantine/core'
import logo from './test.png'

export function Dev() {
  return (
    <Box style={{ width: '100vw', height: '100vh', padding: 100 }}>
      <Group bg="dark" noWrap grow={true}>
        <Box bg="white">
          <Image src={logo} w="auto" h="100%" />
        </Box>
        <Box bg="white">aaaaaaaaaaaa</Box>
        <Box bg="white">aaaaaaaaaaaa</Box>
        <Box bg="white">aaaaaaaaaaaa</Box>
        <Box bg="white">aaaaaaaaaaaa</Box>
        <Box bg="white">aaaaaaaaaaaa</Box>
      </Group>
    </Box>
  )
}
