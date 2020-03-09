<template>
  <article class="flex flex-row justify-end mt-6 mb-6">
    <font-awesome
      :icon="['fas', 'clipboard']"
      class="text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none icon"
      v-tooltip.top="{
        content: !copied ? 'URL 복사' : 'URL 복사 완료',
        hideOnTargetClick: false
      }"
      @click="clipboard"
    />
    <font-awesome
      :icon="['fas', 'calendar-alt']"
      class="text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none icon"
      v-tooltip.top="{
        content: convertDate,
        hideOnTargetClick: false
      }"
    />
  </article>
</template>

<script>
export default {
  props: ['path', 'date'],

  data: () => ({
    copied: false
  }),

  computed: {
    convertDate() {
      const _date = new Date(this.date)

      const year = _date.getFullYear()
      const month = _date.getMonth() + 1
      const day = _date.getDate()

      return `${year}년 ${month}월 ${day}일에 작성됨`
    }
  },

  methods: {
    clipboard() {
      const ct = document.createElement('textarea')
      document.body.appendChild(ct)
      ct.value = `https://blog.n2ptune.xyz${this.path}`
      ct.select()

      document.execCommand('copy')
      document.body.removeChild(ct)

      if (this.copied) {
        return
      }

      this.copied = !this.copied
    }
  }
}
</script>

<style lang="postcss" scoped>
.icon {
  @apply mx-1;
}
</style>

<style lang="postcss">
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  @apply bg-gray-800 px-2 py-1 text-xs;
  color: white;
  border-radius: 5px;
}

.tooltip .tooltip-arrow {
  @apply border-gray-800;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  z-index: 1;
}

.tooltip[x-placement^='top'] {
  margin-bottom: 0.8rem;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
