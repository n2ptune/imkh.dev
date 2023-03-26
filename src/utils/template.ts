export function withTitleTemplate(str: string) {
  return `${str} | imkh.dev`
}

export function withUrl(path: string, trailing = true) {
  return `https://imkh.dev${trailing ? '/' : ''}${path}`
}
