<script lang="ts">
    import {devtoolStore, updateActiveTab} from "../stores/devtool.store";
</script>

<div class="hl-tabs">
    {#each $devtoolStore.tabs as tab}
        <div class="hl-tab" 
             class:active={$devtoolStore.activeTab == tab}
             on:click={e => updateActiveTab(tab)}>
            {tab}
        </div>
    {/each}
</div>

<style lang="scss">

.hl-tabs {
  @apply flex items-center bg-zinc-100 border-b-2 border-zinc-100 select-none
}

.hl-tab {
  @apply px-2 leading-6 h-6 bg-zinc-100 border-b-2 border-zinc-100 text-xs text-zinc-600 cursor-pointer 
  hover:bg-zinc-300 hover:border-zinc-300;
  &.active {
    @apply border-blue-500 hover:border-blue-500
  }
}
    
    
</style>
