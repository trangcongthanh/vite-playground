import '@mantine/core'

declare module '@mantine/core' {
  export interface MantineThemeOther {
    palette: Array<string>
    region: Array<string>
    heat: Array<string>
    getColorByName(name: string): string
    getIconByName(name: string): (props: any) => JSX.Element
  }
}
