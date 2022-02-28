<script lang="ts">
    import DevtoolSection from "./devtool-section.svelte"
    import {afterUpdate} from "svelte";

    export let open: boolean
    export let section: string
    export let data: { [key: string]: string }

    afterUpdate(() => {

    })

</script>

<div>
    <DevtoolSection open={open} section={section}>
        <div class="hl-devtool-kv">
            {#each Object.entries(data) as [key, value]}
                <div class="kv-row">
                    <span class="hl-key">{key}:</span> <span class="hl-value">{value}</span>
                </div>
            {/each}
        </div>
    </DevtoolSection>
</div>

<style lang="scss">
  .kv-row {
    @apply text-xs ml-6 text-gray-700;
    .hl-key {
      @apply text-gray-600 font-bold
    }
    .hl-value {
      @apply text-gray-900
    }
  }
</style>
