<script lang="ts">
    import Icon from "../shared/components/icon.svelte"
    export let open:boolean
    export let section:string
    
    function toggle(){
        open = !open
    }
    
</script>

<div>
    <div class="hl-section-header cursor-pointer" class:bg-gray-100={!open} on:click={toggle}>
        {#if open}<Icon class="w-4 h-4" name="down"></Icon>{/if}
        {#if !open}<Icon  class="w-4 h-4" name="right"></Icon>{/if}
        {section}
    </div>
    {#if open}
    <div class="hl-section-content">
        <slot></slot>
    </div>
    {/if}
</div>

<style lang="scss">
    .hl-section-header {
      @apply h-6 leading-6 text-zinc-500 text-xs;
      >* {
        @apply cursor-pointer
      }
    }

    .hl-section-content {
      @apply bg-white
    }
</style>
