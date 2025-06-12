export function truncate(str: string, limit: number, trailing = false) {
  if (str.length <= limit) {
    return str
  } else {
    return str.slice(0, limit) + (trailing ? '...' : '')
  }
}
