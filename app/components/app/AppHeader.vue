<script setup lang="ts">
const appConfig = useAppConfig()

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
      root: 'fixed top-0 w-full z-50 bg-white border-b border-[rgba(0,0,0,0.1)] h-14',
      container: 'flex items-center justify-between h-full px-6',
      left: 'flex items-center gap-2',
      center: 'flex-1',
      right: 'flex items-center gap-3',
    }"
    :class="{ 'flex flex-col': subNavigationMode === 'header' }"
  >
    <template #left>
      <NuxtLink to="/en/" class="flex items-center gap-2">
        <img src="/omniscout.svg" alt="OmniScout" class="h-8 w-8 shrink-0" />
        <span class="font-[Sora,sans-serif] font-semibold text-[20px] tracking-[-0.4px] leading-[1.4] text-black">OmniScout</span>
      </NuxtLink>
    </template>

    <AppHeaderCenter />

    <template #right>
      <NuxtLink to="/en/cli/overview" class="scout-btn-small">
        Install Now
      </NuxtLink>

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

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          :ui="{ base: 'font-[Inter,sans-serif] text-[rgba(0,0,0,0.55)] hover:text-black' }"
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
