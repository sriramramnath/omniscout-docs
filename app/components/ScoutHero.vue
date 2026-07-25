<template>
  <div class="scout-hero-wrap">
    <slot />
  </div>
</template>

<style scoped>
.scout-hero-wrap {
  background-color: #0a0a0a;
  background-image: url('/darkbg.png');
  background-size: cover;
  background-position: top;
}

.scout-hero-wrap :deep(*) {
  background-color: transparent;
}

.scout-hero-wrap :deep(*::before),
.scout-hero-wrap :deep(*::after) {
  background-color: transparent;
}

.scout-hero-wrap :deep([data-slot='title']) {
  color: #ffffff;
}

.scout-hero-wrap :deep([data-slot='description']) {
  color: #a3a3a3;
}

.scout-hero-wrap :deep([data-slot='links'] a),
.scout-hero-wrap :deep([data-slot='links'] button) {
  color: #ffffff;
  --tw-ring-color: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.scout-hero-wrap :deep([data-slot='links'] a:hover),
.scout-hero-wrap :deep([data-slot='links'] button:hover) {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
