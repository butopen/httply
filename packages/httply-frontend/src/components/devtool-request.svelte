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
  import {onMount} from "svelte";

  const px = (p) => Math.round(p) + 'px';
  let top = px(0);
  let left = px(0);
  let isVisible = false;
  let scrollY = 0;
  let scrollX = 0;
  let targetBox;

  function copy() {
    share($viewStore.shareLink);
  }

  onMount(()=>{
    window.addEventListener('scroll', (e)=>{
      scrollY = window.scrollY;
      scrollX = window.scrollX;
      updatePosition()
    })
  })

  function onRequestValueEvent(jsonViewerEvent) {
    if(jsonViewerEvent.detail.type === "mouseenter") {
      targetBox = jsonViewerEvent.detail.mouseEvent.target.getBoundingClientRect();
      updatePosition();
    }else{
      isVisible = false;
    }
  }

  function onResponseValueEvent(jsonEvent: { detail: JsonViewerEvent }) {
    if(jsonEvent.detail.expanded) {
      isVisible = true;
      targetBox = jsonEvent.detail.target.getBoundingClientRect();
      const expanded = jsonEvent.detail.expanded;
      updatePosition();
      }else{
      isVisible = false;
    }
  }

  function updatePosition(){
    top = px(targetBox.y - 5 - scrollY);
    left = px(targetBox.x + targetBox.width + 10 - scrollX);
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
    <JsonViewer json={$viewStore.request.body} on:json-viewer={onRequestValueEvent} />
  </DevtoolSection>
  {#if $viewStore.request.headers}
    <DevtoolSection
      open={$viewStore.sectionExpanded.RequestHeaders}
      section="Request Headers">
      <JsonViewer json={$viewStore.request.headers} on:json-viewer={onRequestValueEvent}/>
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

{#if isVisible}
<div style="position: fixed; top: {top}; left: {left}; " id="edit_button">
  <!-- TODO: create component wrapper for this DIV element-->
  <JsonActions />
</div>
{/if}



<style lang="scss">
  .hl-devtool-request {
    @apply bg-gray-50;
  }
</style>
