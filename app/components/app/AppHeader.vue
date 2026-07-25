<script setup lang="ts">
const appConfig = useAppConfig()
const { forced: forcedColorMode } = useDocusColorMode()

const { isEnabled, locales } = useDocusI18n()
const { subNavigationMode } = useSubNavigation()

const links = computed(() => appConfig.github && appConfig.github.url
  ? [
      {
        icon: 'i-simple-icons-github',
        to: appConfig.github.url,
        target: '_blank',
        'aria-label': 'GitHub',
      },
    ]
  : [])
</script>

<template>
  <UHeader
    :ui="{
      root: 'fixed top-0 w-full z-50 bg-white border-b border-[#E5E5E5] h-14',
      container: 'flex items-center justify-between h-full px-6',
      left: 'flex items-center gap-2',
      center: 'flex-1',
      right: 'flex items-center gap-3',
    }"
    :class="{ 'flex flex-col': subNavigationMode === 'header' }"
  >
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/omniscout.svg" alt="OmniScout" class="h-5 w-5 shrink-0" />
        <span class="font-semibold text-sm tracking-tight text-[#0f0f0f]">OmniScout</span>
      </NuxtLink>
    </template>

    <AppHeaderCenter />

    <template #right>
      <AppHeaderCTA />

      <template v-if="isEnabled && locales.length > 1">
        <ClientOnly>
          <LanguageSelect />

          <template #fallback>
            <div class="h-8 w-8 animate-pulse bg-[#f5f5f5]" />
          </template>
        </ClientOnly>

        <USeparator
          orientation="vertical"
          class="h-8"
        />
      </template>

      <UContentSearchButton class="lg:hidden" />

      <ClientOnly v-if="!forcedColorMode">
        <UColorModeButton />

        <template #fallback>
          <div class="h-8 w-8 animate-pulse bg-[#f5f5f5]" />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          :ui="{ base: 'text-[#6B6B6B] hover:text-[#0f0f0f]' }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>

    <template
      v-if="subNavigationMode === 'header'"
      #bottom
    >
      <AppHeaderBottom />
    </template>
  </UHeader>
</template>
