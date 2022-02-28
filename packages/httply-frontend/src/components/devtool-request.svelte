<script lang="ts">

    import {inputStore} from "../stores/input.store";
    import {updateResponse, viewStore} from "../stores/view.store";
    import DevtoolKvSection from "./devtool-key-value-section.svelte"
    import Icon from "../shared/components/icon.svelte"
    import {playRequest} from "../apis/play-request.api";

    async function play() {
        const {url, options} = $inputStore.request
        const response = await playRequest(url, options)
        updateResponse(response)
    };

</script>

{#if $inputStore.request}
    <div>
        <Icon class="button" on:click={play} name="play"></Icon>
    </div>
    <DevtoolKvSection open={$viewStore.request.general.open} section="General" data={$viewStore.request.general.data}>
    </DevtoolKvSection>
    {#if $viewStore.response}
        <DevtoolKvSection open={$viewStore.response.open} section="Response Headers"
                          data={$viewStore.response.data.headers}>
        </DevtoolKvSection>
    {/if}
{/if}


<style lang="scss">

  .hl-devtool-request {
    @apply bg-gray-50
  }

</style>
