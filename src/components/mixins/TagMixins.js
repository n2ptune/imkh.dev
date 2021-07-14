import { extractTopTags } from '@/api/tags'

export default {
  data: () => ({
    topTags: null,
    allTags: null
  }),

  created() {
    const tagArr = []
    const tags = this.$page.tags.edges

    extractTopTags(tags, tagArr)

    this.topTags = tagArr.slice(0, 3)
    this.allTags = tagArr.sort((a, b) => (b.title > a.title ? -1 : 1))
  }
}
