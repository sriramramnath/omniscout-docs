<template>
  <footer v-if="false" class="border-t border-[rgba(0,0,0,0.1)] bg-white">
    <div class="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div class="col-span-2">
          <NuxtLink to="/en" class="flex items-center gap-2 mb-4 w-fit" aria-label="OmniScout home">
            <img src="/omniscout.svg" alt="" width="20" height="20" class="h-5 w-5 shrink-0" />
            <span class="font-[Inter,sans-serif] font-semibold text-[24px] tracking-[-0.48px] leading-[1.45] text-black">OmniScout</span>
          </NuxtLink>
          <p class="font-[Inter,sans-serif] font-medium text-[16px] tracking-[-0.08px] leading-[1.45] text-[rgba(0,0,0,0.55)] max-w-xs">
            Question. Explore. Solve.
          </p>
        </div>

        <div>
          <div class="font-[Inter,sans-serif] font-semibold text-[16px] text-black tracking-[-0.08px] leading-[1.45] mb-4">
            Product
          </div>
          <ul class="space-y-2">
            <li>
              <a href="https://omniscout.xyz/features" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">Features</a>
            </li>
            <li>
              <a href="https://omniscout.xyz/compare" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">Compare</a>
            </li>
            <li>
              <a href="https://omniscout.xyz/changelog" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">Changelog</a>
            </li>
          </ul>
        </div>

        <div>
          <div class="font-[Inter,sans-serif] font-semibold text-[16px] text-black tracking-[-0.08px] leading-[1.45] mb-4">
            Resources
          </div>
          <ul class="space-y-2">
            <li>
              <a href="https://omniscout.xyz" target="_blank" rel="noreferrer" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">Website</a>
            </li>
            <li>
              <a href="https://pypi.org/project/omniscout/" target="_blank" rel="noreferrer" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">PyPI</a>
            </li>
            <li>
              <a href="https://github.com/sriramramnath/omniscout" target="_blank" rel="noreferrer" class="font-[Inter,sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] leading-[1.45] hover:text-black hover:underline transition-colors">GitHub</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="h-px bg-[rgba(0,0,0,0.1)] mb-8" />

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 font-[Inter,sans-serif] text-[16px] text-[rgba(0,0,0,0.55)]">
        <span>&copy; 2026 OmniScout</span>
        <div class="flex flex-wrap items-center gap-5">
          <a
            href="https://pypi.org/project/omniscout/"
            target="_blank"
            rel="noreferrer"
            class="hover:text-[#0F0F0F] transition-colors flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            PyPI
          </a>
          <a
            href="https://github.com/sriramramnath/omniscout"
            target="_blank"
            rel="noreferrer"
            class="hover:text-[#0F0F0F] transition-colors flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
