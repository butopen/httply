<script lang="ts">
  import {devtoolStore, updateActiveTab} from "../stores/devtool.store";
</script>

<div class="hl-tabs">
    {#each $devtoolStore.tabs as tab}
        <div
                class="hl-tab"
                class:active={$devtoolStore.activeTab == tab}
                on:click={(e) => updateActiveTab(tab)}
        >
            {tab}
        </div>
    {/each}
</div>

<style lang="scss">
  .hl-tabs {
    @apply flex select-none items-center border-b-2 border-zinc-100 bg-zinc-100;
  }

  .hl-tab {
    @apply h-6 cursor-pointer border-b-2 border-zinc-100 bg-zinc-100 px-2 text-xs leading-6 text-zinc-600
    hover:border-zinc-300 hover:bg-zinc-300;
    &.active {
      @apply border-blue-500 hover:border-blue-500;
    }
  }
</style>
