<script lang="ts">
  import { inputStore } from '../stores/input.store';
  import { viewStore } from '../stores/view.store';
  import DevtoolSection from './devtool-section.svelte';
  import JsonViewer from './json-viewer/json-viewer.svelte';
  import Icon from '../shared/components/icon.svelte';
  import { play } from '../actions/play.action';
  import { disableAutoplay, enableAutoplay } from '../stores/settings.storage';
</script>

{#if $inputStore.request}
  <div>
    <Icon class="button" on:click={(e) => play($inputStore.request)} name="play" tooltip="Send request" />
    {#if $inputStore.autoplay}
      <Icon class="button" on:click={(e) => disableAutoplay()} name="autoflash" tooltip="Disable auto send request" />
    {/if}
    {#if !$inputStore.autoplay}
      <Icon class="button" on:click={(e) => enableAutoplay()} name="flash" tooltip="Enable auto send request" />
    {/if}
  </div>
  <DevtoolSection open={$viewStore.sectionExpanded.General} section="General">
    <JsonViewer json={$viewStore.request.information} />
  </DevtoolSection>
  {#if $viewStore.request.headers}
    <DevtoolSection open={$viewStore.sectionExpanded.RequestHeaders} section="Request Headers">
      <JsonViewer json={$viewStore.request.headers} />
    </DevtoolSection>
  {/if}
  {#if $viewStore.response}
    <DevtoolSection open={$viewStore.sectionExpanded.ResponseHeaders} section="Response Headers">
      <JsonViewer json={$viewStore.response.headers} />
    </DevtoolSection>
    <DevtoolSection section="Response" open={$viewStore.sectionExpanded.Response}>
      <JsonViewer json={$viewStore.response.body} />
    </DevtoolSection>
  {/if}
{/if}

<style lang="scss">
  .hl-devtool-request {
    @apply bg-gray-50;
  }
</style>
