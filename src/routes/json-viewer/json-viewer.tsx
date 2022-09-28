import { Box } from '@mantine/core'
import { FunctionComponent, useState } from 'react'

const CURLY_BRACE = ['{', '}'] as [string, string]
const SQUARE_BRACKET = ['[', ']'] as [string, string]

type ValueTypes =
  | 'String'
  | 'Number'
  | 'BigInt'
  | 'Boolean'
  | 'Undefined'
  | 'Symbol'
  | 'Null'
  | 'Object'
  | 'Map'
  | 'Set'
  | 'Date'
  | 'Array'
  | 'RegExp'
  | 'Error'

function getType<TValue>(value: TValue): ValueTypes {
  return Object.prototype.toString.call(value).replace(/^\[object\s(.*)\]$/, '$1') as ValueTypes
}

// const defaultTheme = {
//   base00: "", // Default Background
//   base01: "", // Lighter Background (Used for status bars, line number and folding marks)
//   base02: "", // Selection Background
//   base03: "", // Comments, Invisibles, Line Highlighting
//   base04: "", // Dark Foreground (Used for status bars)
//   base05: "", // Default Foreground, Caret, Delimiters, Operators
//   base06: "", // Light Foreground (Not often used)
//   base07: "", // Light Background (Not often used)
//   base08: "", // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
//   base09: "", // Integers, Boolean, Constants, XML Attributes, Markup Link Url
//   base0A: "", // Classes, Markup Bold, Search Text Background
//   base0B: "", // Strings, Inherited Class, Markup Code, Diff Inserted
//   base0C: "", // Support, Regular Expressions, Escape Characters, Markup Quotes
//   base0D: "", // Functions, Methods, Attribute IDs, Headings
//   base0E: "", // Keywords, Storage, Selector, Markup Italic, Diff Changed
//   base0F: "", // Deprecated, Opening/Closing Embedded Language Tags
// }

const defaultTheme = {
  scheme: 'default',
  author: 'thanhtc',
  base00: 'rgba(0, 0, 0, 0)',
  base01: 'rgb(245, 245, 245)',
  base02: 'rgb(235, 235, 235)',
  base03: '#93a1a1',
  base04: 'rgba(0, 0, 0, 0.3)',
  base05: '#586e75',
  base06: '#073642',
  base07: '#002b36',
  base08: '#d33682',
  base09: '#cb4b16',
  base0A: '#dc322f',
  base0B: '#859900',
  base0C: '#6c71c4',
  base0D: '#586e75',
  base0E: '#2aa198',
  base0F: '#268bd2',
}

type ValueProps = {
  value: any
  name?: string
}

function StringValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: "{value}"
    </Box>
  )
}
function NumberValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {value}
    </Box>
  )
}
function BigIntValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}
function BooleanValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}
function UndefinedValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}
function SymbolValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {(value as symbol).toString()}
    </Box>
  )
}
function NullValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}

function ObjectValue({ name, value }: ValueProps) {
  const [collasped, setCollaped] = useState(false)
  return (
    <Box>
      <Box style={{ display: 'flex' }}>
        <div
          onClick={(e) => {
            e.stopPropagation()
            setCollaped((p) => !p)
          }}
        >
          +
        </div>
        <Box>
          {name && `"${name}": `}
          {CURLY_BRACE[0]}
          {collasped && CURLY_BRACE[1]}
        </Box>
      </Box>
      <Box style={{ paddingLeft: '2ch', display: collasped ? 'none' : 'block' }}>
        {Object.entries(value).map(([n, v]) => (
          <ValueRenderer name={n} value={v} key={n} />
        ))}
      </Box>
      <Box style={{ display: collasped ? 'none' : 'block' }}>{CURLY_BRACE[1]}</Box>
    </Box>
  )
}
function MapValue({ name, value }: ValueProps) {
  return (
    <Box>
      <Box>
        {name}: {CURLY_BRACE[0]}
      </Box>
      <Box style={{ paddingLeft: '2ch' }}>
        {Array.from<[string, unknown]>(value.entries()).map(([n, v]) => (
          <ValueRenderer name={n} value={v} key={n} />
        ))}
      </Box>
      <Box>{CURLY_BRACE[1]}</Box>
    </Box>
  )
}
function SetValue({ name, value }: ValueProps) {
  return (
    <Box>
      <Box>
        {name}: {SQUARE_BRACKET[0]}
      </Box>
      <Box style={{ paddingLeft: '2ch' }}>
        {Array.from(value.values()).map((v, n) => (
          <ValueRenderer name={`${n}`} value={v} key={n} />
        ))}
      </Box>
      <Box>{SQUARE_BRACKET[1]}</Box>
    </Box>
  )
}
// function WeakMapValue() {
//   return null
// }
function DateValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}
function ArrayValue({ name, value }: ValueProps) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Box<'div'>
      onClick={(e) => {
        e.stopPropagation()
        setCollapsed((p) => !p)
      }}
    >
      <Box>
        {name}: {SQUARE_BRACKET[0]}
      </Box>
      {!collapsed && (
        <Box style={{ paddingLeft: '2ch' }}>
          {Object.entries(value).map(([n, v]) => (
            <ValueRenderer name={n} value={v} key={n} />
          ))}
        </Box>
      )}
      <Box>{SQUARE_BRACKET[1]}</Box>
    </Box>
  )
}
function RegExpValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}
function ErrorValue({ name, value }: ValueProps) {
  return (
    <Box>
      {name}: {`${value}`}
    </Box>
  )
}

function UnsupportedValue() {
  return <div>Unsupported Value</div>
}

const COMPONENTS_BY_TYPE = {
  String: StringValue,
  Number: NumberValue,
  BigInt: BigIntValue,
  Boolean: BooleanValue,
  Undefined: UndefinedValue,
  Symbol: SymbolValue,
  Null: NullValue,
  Object: ObjectValue,
  Map: MapValue,
  Set: SetValue,
  Date: DateValue,
  Array: ArrayValue,
  RegExp: RegExpValue,
  Error: ErrorValue,
}

function ValueRenderer({ name, value }: ValueProps) {
  const type = getType(value)
  const Component = (COMPONENTS_BY_TYPE[type] || UnsupportedValue) as FunctionComponent<ValueProps>
  return <Component name={name} value={value} />
}

const m = new Map()
m.set('a', 'b')
m.set('b', { a: 'a' })

const s = new Set()
s.add('1')
s.add(2)
s.add({ a: 'b' })

const wm = new WeakMap()
wm.set({ a: 'b' }, 'a')
wm.set({ b: 'c' }, 'd')

const TEST_DATA = {
  nested_object: { level1: { level11: { obj: {}, arr: [] } } },
  str: 'test',
  obj: {},
  arr_string: ['1', '2', '3'],
  arr_object: [{ a: 'b', hi: 'hi', nested: { level1: { level2: 'hihi' } } }, { b: 'c' }],
  arr_number: [1, 2, 3],
  bool_true: true,
  boolFalse: false,
  null_string: null,
  symb: Symbol('aaa'),
  a: Error('aaa'),
  re: /aaaa/gm,
  re2: new RegExp('aaaa', 'gm'),
  map: m,
  s,
  d: new Date(),
}

type JsonViewerProps<TValue = unknown> = {
  value?: TValue
  name?: string
}

export function JsonViewer<TValue = unknown>({ name, value = TEST_DATA as TValue }: JsonViewerProps<TValue>) {
  return <ObjectValue name={name} value={value} />
}
