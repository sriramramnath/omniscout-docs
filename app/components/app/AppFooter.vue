<template>
  <UFooter
    :ui="{
      root: 'border-t border-[#333] bg-[#0c0c0c] py-12 px-8',
      container: 'max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8',
      left: 'flex items-center gap-3 grayscale opacity-50',
      right: 'text-[10px] font-mono text-[#94a3b8] tracking-tight text-center md:text-right',
    }"
  >
    <template #left>
      <div class="flex items-center gap-3 grayscale opacity-50">
        <img src="/logo.svg" alt="OmniScout" class="h-4 w-auto shrink-0" />
        <span class="font-bold tracking-tighter text-sm text-white">OmniScout System</span>
      </div>
    </template>

    <template #right>
      <span class="text-[10px] font-mono text-[#94a3b8] tracking-tight text-center md:text-right">
        Authorized for internal use only &middot; proprietary visual architecture<br />
        &copy; 2026 OmniScout. All Rights Reserved.
      </span>
    </template>
  </UFooter>
</template>
