import { RouteObject } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { Box, Button, Group, Text } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

const DATA = Array.from({ length: 10 }, () => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}))

function DownloadItem({ item, children }: any) {
  return (
    <Group position="apart">
      <Text>{item.id}</Text>
      {children}
    </Group>
  )
}

function Downloader() {
  const [progress, setProgress] = useState(new Map<string, number>())

  const {} = useMutation({
    async mutationFn() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('done')
        }, faker.datatype.number({ min: 1000, max: 10000 }))
      })
    },
  })

  const { mutate } = useMutation({
    async mutationFn({ id }: { id: string }) {
      return axios.get(
        'https://unsplash.com/photos/b-iP3KEORko/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8SnBnNktpZGwtSGt8fHx8fDJ8fDE2Nzk4OTg0NTc&force=true',
        {
          onDownloadProgress(p) {
            setProgress((prev) => {
              if (!p.total) return prev
              return new Map(prev).set(id, Math.round(p.loaded / p.total))
            })
          },
        },
      )
    },
  })

  return (
    <Box>
      {DATA.map((item) => {
        return <DownloadItem item={item} key={item.id} />
      })}
      <div>{`${progress.get('test')}`}</div>
      <Button
        onClick={() => {
          mutate({ id: 'test' })
        }}>
        Download All
      </Button>
    </Box>
  )
}

export const downloaderRoute: RouteObject = {
  path: '/downloader',
  element: <Downloader />,
}
