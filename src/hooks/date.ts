import Dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

Dayjs.extend(LocalizedFormat)

export const useRelativeDate = (date: string | Date) => {
  const rawDate = new Date(date)

  return Dayjs(rawDate).format('LL')
}
