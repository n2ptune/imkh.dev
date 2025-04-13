import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

export default defineNuxtPlugin(nuxtApp => {
  dayjs.extend(relativeTime)
  dayjs.locale('ko')

  return {
    provide: {
      dayjs
    }
  }
})
