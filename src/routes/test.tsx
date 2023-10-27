import { useNavigate } from 'react-router-dom'

export function Test({ children }: any) {
  console.log('test?')
  const navigate = useNavigate()
  return <div>{children}</div>
}
