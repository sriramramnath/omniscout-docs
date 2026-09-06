<script setup lang="ts">
const props = defineProps<{
  content?: string
}>()

const host = ref<HTMLElement | null>(null)
const svg = ref('')
const failed = ref(false)
let rendered = false

async function renderDiagram(source: string) {
  const diagram = source.trim()
  if (!diagram || rendered)
    return
  rendered = true
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      themeVariables: { fontFamily: 'Inter, system-ui, sans-serif' },
      securityLevel: 'loose',
    })
    const id = `scout-mmd-${Math.random().toString(36).slice(2)}`
    svg.value = (await mermaid.render(id, diagram)).svg
  }
  catch {
    failed.value = true
  }
}

onMounted(async () => {
  const source = props.content ?? host.value?.textContent ?? ''
  await renderDiagram(source)
})
</script>

<template>
  <div class="scout-mermaid">
    <div
      v-if="svg"
      class="scout-mermaid-diagram"
      v-html="svg"
    />
    <div
      v-show="!svg && !failed"
      ref="host"
      class="scout-mermaid-source"
    >
      <slot>{{ content }}</slot>
    </div>
    <p
      v-if="failed"
      class="scout-mermaid-error"
    >
      Could not render this diagram.
    </p>
  </div>
</template>
