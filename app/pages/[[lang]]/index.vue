<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'OmniScout Docs',
  description: 'Local-first browser control, semantic search, and research for AI agents.',
})
</script>

<template>
  <div class="home-hero">
    <!-- Title + subtitle pinned 20px above centre -->
    <div class="home-hero__top">
      <h1 class="home-hero__title">
        The local-first toolkit<br>for AI agents
      </h1>
      <p class="home-hero__sub">
        Semantic web search, browser automation, and one-click research —
        all running on your machine. Install in seconds.
      </p>
    </div>

    <!-- Buttons pinned 20px below centre -->
    <div class="home-hero__bottom">
      <NuxtLink to="/en/cli/overview" class="home-btn home-btn--primary">
        Get Started
      </NuxtLink>
      <NuxtLink to="/en/api" class="home-btn home-btn--secondary">
        View API Docs
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* ── Hero shell ─────────────────────────────────────────────────── */
.home-hero {
  position: relative;
  min-height: calc(100vh - var(--ui-header-height, 56px));
  box-sizing: border-box;
  overflow: hidden;

  background-image: url('/img/hero-illustration.png');
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  background-color: #fff;
}

/* ── Top block: title + sub, bottom edge sits 20px above centre ── */
.home-hero__top {
  position: absolute;
  bottom: calc(50% + 20px);
  left: 72px;
  right: 40%;          /* leave right half clear for the image */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Bottom block: buttons, moved 20% downward below centre ─────── */
.home-hero__bottom {
  position: absolute;
  top: calc(70% + 20px);
  left: 72px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ── Typography ─────────────────────────────────────────────────── */
.home-hero__title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(32px, 3.6vw, 52px);
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: 1.1;
  color: #000;
  margin: 0;
}

.home-hero__sub {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
}

/* ── Buttons ────────────────────────────────────────────────────── */
.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.08px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
  white-space: nowrap;
}

.home-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.home-btn--primary {
  background: #000;
  color: #fff;
}

.home-btn--secondary {
  background: transparent;
  color: #000;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .home-hero {
    min-height: calc(100vh - var(--ui-header-height, 56px));
    background-position: center bottom;
    background-size: 160%;
  }

  .home-hero__top {
    left: 24px;
    right: 24px;
    bottom: calc(50% + 20px);
  }

  .home-hero__bottom {
    left: 24px;
    top: calc(70% + 20px);
  }
}
</style>
