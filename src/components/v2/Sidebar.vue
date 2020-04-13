<template>
  <aside>
    <div class="wrapper-before">
      <div class="wrapper-after">
        <div class="profile">내 프로필</div>
      </div>
    </div>
  </aside>
</template>

<style lang="postcss" scoped>
aside {
  display: none;
  background: url('~@/assets/cover-background.jpg') no-repeat;
  background-size: cover;
  background-position-x: 50%;
  z-index: -1;
  position: fixed;
  height: 100vh;
  overflow: hidden;
}
.wrapper-before {
  @apply flex items-center justify-center h-full px-2 text-white-f;
  background-color: rgba(0, 0, 0, 0.32);
}
.wrapper-after {
  @apply flex;
}
@screen lg {
  aside {
    display: block;
    width: var(--aside-lg-size);
  }
}
@screen xl {
  aside {
    display: block;
    width: var(--aside-xl-size);
  }
}
</style>
