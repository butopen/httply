<script lang="ts">
  import { inputStore } from '../stores/input.store';
  import { viewStore } from '../stores/view.store';
  import DevtoolSection from './devtool-section.svelte';
  import JsonActions from './json-actions.svelte';
  import JsonViewer, { JsonViewerEvent } from './json-viewer/json-viewer.svelte';
  import Icon from '../shared/components/icon.svelte';
  import { play, share } from '../actions/play.action';
  import { disableAutoplay, enableAutoplay } from '../stores/settings.storage';
  import type { Json } from '../shared/json.model';

  const px = (p) => Math.round(p) + 'px';
  let top = px(0);
  let left = px(0);
  let visible = false;
  function copy() {
    share($viewStore.shareLink);
  }

  function onRequestValueEvent(jsonViewerEvent) {
    console.log('request', jsonViewerEvent.detail);
  }

  function onResponseValueEvent(jsonEvent: { detail: JsonViewerEvent }) {
    if(jsonEvent.detail.expanded) {
      visible = true;
      console.log('click on', jsonEvent.detail);
      const targetBox = jsonEvent.detail.target.getBoundingClientRect();
      const expanded = jsonEvent.detail.expanded;
      console.log('expanded: ', expanded);
      console.log(targetBox.x + targetBox.width, targetBox.y);
      top = px(targetBox.y - 5);
      left = px(targetBox.x + targetBox.width + 10);
    }else{
      visible = false;
    }
  }
</script>

{#if $inputStore.request}
  <div>
    <Icon
      class="button"
      on:click={(e) => play($inputStore.request, $viewStore.request.information.Domain)}
      name="play"
      tooltip="Send request" />
    {#if $inputStore.autoplay}
      <Icon
        class="button h-4 w-4"
        on:click={(e) => disableAutoplay()}
        name="autoflash"
        tooltip="Disable auto send request on paste" />
    {/if}
    {#if !$inputStore.autoplay}
      <Icon
        class="button h-4 w-4"
        on:click={(e) => enableAutoplay()}
        name="flash"
        tooltip="Enable auto send request on paste" />
    {/if}
    {#if $viewStore.shareLink}
      <Icon
        class="button h-4 w-4"
        on:click={(e) => copy()}
        name="share"
        tooltip="Copy link into clipboard" />
    {/if}
  </div>
  <DevtoolSection open={$viewStore.sectionExpanded.General} section="General">
    <JsonViewer
      json={$viewStore.request.information}
      on:json-viewer={onRequestValueEvent} />
  </DevtoolSection>
  <DevtoolSection open={$viewStore.sectionExpanded.Payload} section="Payload">
    <JsonViewer json={$viewStore.request.body} />
  </DevtoolSection>
  {#if $viewStore.request.headers}
    <DevtoolSection
      open={$viewStore.sectionExpanded.RequestHeaders}
      section="Request Headers">
      <JsonViewer json={$viewStore.request.headers} />
    </DevtoolSection>
  {/if}
  {#if $viewStore.response}
    <DevtoolSection
      open={$viewStore.sectionExpanded.ResponseHeaders}
      section="Response Headers">
      <JsonViewer json={$viewStore.response.headers} />
    </DevtoolSection>
    <DevtoolSection section="Response" open={$viewStore.sectionExpanded.Response}>
      <JsonViewer json={$viewStore.response.body} on:json-toggle={onResponseValueEvent} />
    </DevtoolSection>
  {/if}
{/if}
{#if visible}
<div style="top: {top}; left: {left}; position: fixed;" id="ciao">
  <JsonActions />
</div>
{/if}

<style lang="scss">
  .hl-devtool-request {
    @apply bg-gray-50;
  }
</style>
