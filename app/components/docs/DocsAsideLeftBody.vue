<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { sidebarNavigation } = useSubNavigation()

const contentNavVariants = useUIConfig('contentNavigation')

/** Require exact path matches so section index pages (e.g. /cli) stay inactive on child routes. */
function withExactLinks(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map((item) => ({
    ...item,
    exact: true,
    children: item.children?.length ? withExactLinks(item.children) : undefined,
  }))
}

const navigation = computed(() => withExactLinks(sidebarNavigation.value ?? []))
</script>

<template>
  <UContentNavigation
    :highlight="contentNavVariants.highlight ?? true"
    :highlight-color="contentNavVariants.highlightColor"
    :variant="contentNavVariants.variant ?? 'link'"
    :color="contentNavVariants.color"
    :navigation="navigation"
  />
</template>
