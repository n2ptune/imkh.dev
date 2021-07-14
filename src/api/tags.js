/**
 * @param {Array<object>} all
 * @param {Array<any>} arr
 */
export function extractTopTags(all, arr) {
  all.forEach(item => {
    if (item.node.tags.length) {
      item.node.tags.forEach(tag => {
        // 현재 순회하고 있는 객체가 배열에 있는지 찾음
        const isExistTag = arr.findIndex(t => t.title === tag.title)

        if (isExistTag !== -1) {
          // 있으면 카운트 늘림
          arr[isExistTag].count += 1
        } else {
          // 없으면 추가
          arr.push({
            title: tag.title,
            path: tag.path,
            count: 1
          })
        }
      })
    }
  })

  arr.sort((a, b) => b.count - a.count)
}
