import { defineStore } from 'pinia'

interface ImageState {
  imageMap: Map<string, boolean>
}

export const useImageStore = defineStore('imageStore', {
  state: (): ImageState => ({
    imageMap: new Map()
  }),
  actions: {
    track(image: string) {
      this.imageMap.set(image, true)
    }
  }
})
