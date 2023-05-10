import { memo, useEffect } from 'react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const elementFamily = atomFamily((elementId: string) => atom(elementId))

const scriptAtom = atom(
  (get) => {
    const script: Record<string, any> = {}
    function buildScript(elementId = 'ROOT_ELEMENT') {
      script[elementId] = get(elementFamily(elementId))
      script[elementId].children?.forEach(buildScript)
    }
    buildScript()
    return script
  },
  (_, set, script: Record<string, any>) => {
    for (const element of Object.entries(script)) {
      const [elementId, value] = element
      set(elementFamily(elementId), value)
    }
  },
)

const addElementAtom = atom(null, (get, set, element: any) => {
  const parentId = element.parentId || 'ROOT_ELEMENT'
  const parent = get(elementFamily(parentId)) as any
  const newElement = { ...element, id: new Date().getTime(), children: [] }
  set(elementFamily(parentId), { ...parent, children: [...parent.children, newElement.id] })
  set(elementFamily(newElement.id), newElement)
})

const removeElementAtom = atom(null, (get, set, { elementId, parentId }: { elementId: string; parentId: string }) => {
  const parent = get(elementFamily(parentId)) as any
  set(elementFamily(parentId), {
    ...parent,
    children: parent.children?.filter((childId: string) => childId !== elementId),
  })
  elementFamily.remove(elementId)
})

const SCRIPT = {
  ROOT_ELEMENT: {
    id: 'ROOT_ELEMENT',
    name: 'root-element',
    props: {},
    children: [],
  },
  CHILD_ELEMENT_1: {
    id: 'CHILD_ELEMENT_1',
    name: 'child-element-1',
    props: {},
    children: ['CHILD_ELEMENT_1_1'],
  },
  CHILD_ELEMENT_1_1: {
    id: 'CHILD_ELEMENT_1_1',
    name: 'child-element-1-1',
    props: {},
    children: [],
  },
  CHILD_ELEMENT_2: {
    id: 'CHILD_ELEMENT_2',
    name: 'child-element-2',
    props: {},
    children: [],
  },
}

const Element = memo(function Node({ elementId }: { elementId: string }) {
  const element = useAtomValue<any>(elementFamily(elementId))
  const addElement = useSetAtom(addElementAtom)
  const removeElement = useSetAtom(removeElementAtom)

  return (
    <div style={{ border: '1px solid', padding: 8, display: 'flex', gap: 8, flexDirection: 'column' }}>
      <pre>{JSON.stringify(element, null, 2)}</pre>
      {element.children?.map((child: string) => (
        <Element key={child} elementId={child} />
      ))}
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            addElement({ parentId: elementId })
          }}>
          Add
        </button>
        {elementId !== 'ROOT_ELEMENT' && (
          <button
            onClick={() => {
              removeElement({ elementId, parentId: element.parentId })
            }}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
})

function Jotai() {
  const [script, setScript] = useAtom(scriptAtom)

  useEffect(() => {
    setScript(SCRIPT)
  }, [setScript])

  return (
    <div>
      <Element elementId="ROOT_ELEMENT" />
      <pre>{JSON.stringify(script, null, 2)}</pre>
    </div>
  )
}

export const JotaiRoute = {
  path: '/jotai',
  element: <Jotai />,
}
