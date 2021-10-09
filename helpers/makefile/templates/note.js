// @flow

export type Template = {
  key: string,
  value?: boolean | (() => string)
}

const noteTemplate: Template[] = [
  { key: 'title' },
  { key: 'date', value: (): string => new Date().toISOString() },
  { key: 'description' }
]

export default noteTemplate
