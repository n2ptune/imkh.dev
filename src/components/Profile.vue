<template>
  <div
    class="profile flex items-start mb-24 bg-white-f rounded-lg px-8 py-4 flex-wrap flex-col"
  >
    <div class="text-2xl text-left font-bold">
      Profile
    </div>
    <div>
      <a href="https://github.com/n2ptune" target="_blank">
        <font-awesome :icon="['fab', 'github']" size="2x" />
      </a>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.profile {
  max-width: var(--content-max);
}
</style>
