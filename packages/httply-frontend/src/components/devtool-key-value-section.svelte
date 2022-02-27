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
    <DevtoolSection open={open} section="General">
        <div class="hl-devtool-kv">
            {#each Object.entries(data) as [key, value]}
                <div class="kv-row">
                    <b>{key}</b>: {value}
                </div>
            {/each}
        </div>
    </DevtoolSection>
</div>

<style lang="scss">
  .kv-row {
    @apply text-xs ml-6 text-gray-700;
    b {
      @apply text-gray-500
    }
  }
</style>
