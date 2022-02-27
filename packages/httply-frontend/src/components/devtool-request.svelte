<script lang="ts">

    import {inputStore} from "../stores/input.store";
    import {viewStore} from "../stores/view.store";
    import DevtoolKvSection from "./devtool-key-value-section.svelte"
    import Icon from "../shared/components/icon.svelte"
    import {playRequest} from "../apis/play-request.api";

    function play(){
        const {url, options} = $inputStore.request
        playRequest(url, options)
    };

</script>

{#if $inputStore.request}
    <div>
        <Icon class="cursor-pointer" on:click={play} name="play"></Icon>
    </div>
    <DevtoolKvSection open={$viewStore.request.general.open} section="General" data={$viewStore.request.general.data}>
    </DevtoolKvSection>
{/if}


<style lang="scss">

  .hl-devtool-request {
    @apply bg-gray-50
  }

</style>
