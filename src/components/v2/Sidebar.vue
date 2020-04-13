<template>
  <aside>
    <div class="wrapper-before">
      <div class="wrapper-after">
        <div class="flex flex-col items-center">
          <g-image
            src="@/assets/profile.jpg"
            class="rounded-full border-4 border-white-f shadow-xl"
            width="100"
          />
          <div class="mt-2 text-lg">
            vue2598@gmail.com
          </div>
          <div class="mt-1 text-white-700 text-base">
            고양이가 내 소스 코드를 삼켰어요
          </div>
        </div>
        <div class="links">
          <a href="https://github.com/n2ptune" target="_blank">
            <font-awesome
              :icon="['fab', 'github']"
              size="lg"
              class="text-white-600 hover:text-white-f cursor-pointer"
            />
          </a>
          <a href="mailto:vue2598@gmail.com" target="_blank">
            <font-awesome
              :icon="['fas', 'envelope']"
              size="lg"
              class="text-white-600 hover:text-white-f cursor-pointer"
            />
          </a>
          <a href="https://www.instagram.com/idea.js/?hl=ko" target="_blank">
            <font-awesome
              :icon="['fab', 'instagram']"
              size="lg"
              class="text-white-600 hover:text-white-f cursor-pointer"
            />
          </a>
          <a href="https://www.facebook.com/linediffuser" target="_blank">
            <font-awesome
              :icon="['fab', 'facebook']"
              size="lg"
              class="text-white-600 hover:text-white-f cursor-pointer"
            />
          </a>
        </div>
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
  overflow: auto;
}
.wrapper-before {
  @apply flex items-center justify-center h-full px-2 text-white-f;
  background-color: rgba(0, 0, 0, 0.32);
}
.wrapper-after {
  @apply flex flex-col;
}
.links {
  @apply flex flex-row justify-center mt-6;
}
.links > *:not(:last-child) {
  @apply mr-2;
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
