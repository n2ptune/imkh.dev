<script setup lang="ts">
import SymbolLogoDark from '~/assets/imkh_symbolic_logo_inverted.svg'
import SymbolLogoLight from '~/assets/imkh_symbolic_logo.svg'
import { useTheme } from '~/features/theme';

interface Props {
  isLink?: boolean
}

const { isLink = false } = defineProps<Props>()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const { isDark } = useTheme()
</script>

<template>
  <DefineTemplate>
    <div class="flex flex-nowrap items-center space-x-1 text-xl">
      <SymbolLogoDark v-if="isDark" class="text-5xl !m-0" />
      <SymbolLogoLight v-else class="text-5xl !m-0" />
      <!-- <p class="font-bold text-xl">imkh.dev</p> -->
    </div>
  </DefineTemplate>

  <NuxtLink v-if="isLink" to="/" active-class="">
    <UButton variant="link" color="neutral" class="cursor-pointer">
      <ReuseTemplate />
    </UButton>
  </NuxtLink>

  <ReuseTemplate v-else />
</template>
