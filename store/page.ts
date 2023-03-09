import { defineStore } from 'pinia'

interface PageState {
  currentPage: number
  totalCount: number
  scrollY: number
  delayLoadPage: boolean
}

const __PAGE_SIZE__ = 12

export const usePageStore = defineStore('pageStore', {
  state: (): PageState => ({
    currentPage: 0,
    totalCount: 0,
    scrollY: 0,
    delayLoadPage: false
  }),
  getters: {
    currentPageRange(state) {
      return [0, (state.currentPage + 1) * __PAGE_SIZE__]
    },
    canLoadPage(state): boolean {
      return this.currentPageRange[1] < state.totalCount && !state.delayLoadPage
    }
  }
})
