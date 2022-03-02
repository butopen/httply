<script lang="ts">
  import Icon from '../shared/components/icon.svelte';

  export let open: boolean;
  export let section: string;

  function toggle() {
    open = !open;
  }
</script>

<div>
  <div class="hl-section-header cursor-pointer" class:bg-gray-100={!open} on:click={toggle}>
    {#if open}
      <Icon class="h-4 w-4" name="down" />
    {/if}
    {#if !open}
      <Icon class="h-4 w-4" name="right" />
    {/if}
    {section}
  </div>
  {#if open}
    <div class="hl-section-content">
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  .hl-section-header {
    @apply h-6 text-xs leading-6 text-zinc-500;
    > * {
      @apply cursor-pointer;
    }
  }

  .hl-section-content {
    @apply bg-white;
  }
</style>
