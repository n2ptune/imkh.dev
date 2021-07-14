export default {
  methods: {
    /**
     * @param {number} num
     * @param {number} min
     * @param {number} max
     * @returns {boolean}
     */
    between(num, min, max) {
      return min <= num && num <= max
    },
    /**
     * @param {number} timeToRead
     * @returns {string}
     */
    toReadLevel(timeToRead) {
      if (this.between(timeToRead, 0, 5)) {
        return '☕'
      } else if (this.between(timeToRead, 6, 11)) {
        return '📰'
      } else if (this.between(timeToRead, 12, 20)) {
        return '🔥'
      } else {
        return '😴'
      }
    }
  }
}
