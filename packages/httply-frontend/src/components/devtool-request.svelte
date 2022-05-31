<script lang="ts">
  import { inputStore } from '../stores/input.store';
  import { viewStore } from '../stores/view.store';
  import DevtoolSection from './devtool-section.svelte';
  import JsonActions from './json-action/json-actions.svelte';
  import JsonViewer, { JsonViewerEvent } from './json-viewer/json-viewer.svelte';
  import Icon from '../shared/components/icon.svelte';
  import { play, share } from '../actions/play.action';
  import { disableAutoplay, enableAutoplay } from '../stores/settings.storage';
  import type { Json } from '../shared/json.model';
  import {onMount, setContext} from "svelte";
  import JsonEdit, {lastText} from './json-action/json-edit.svelte';
  import {doc} from "prettier";
  import {updateNotification} from "./notification/notification.store";

  const px = (p) => Math.round(p) + 'px';
  let top = px(0);
  let left = px(0);
  let isVisible = false;
  let showEditPopUp = false;
  let scrollY=0;
  let scrollX=0;
  let lastScrollX=0;
  let lastScrollY=0;
  let targetBox:DOMRect;
  let targetBoxClassName;
  let jsonCatched;
  let jsonPath;
  let masterJson;


  function copy() {
    share($viewStore.shareLink);
  }

  onMount(()=>{
    window.addEventListener('scroll', (e)=>{
      if(isVisible) {
        scrollY = window.scrollY;
        scrollX = window.scrollX;
        updatePosition();
      }
      })
  });

  onMount(()=>{
    window.addEventListener('show-edit-popup',(e)=>{
      showEditPopUp = !showEditPopUp;
    });
  });

  // onMount(()=>{
  //   document.addEventListener('change', (e) => {
  //     console.log(e)
  //   })
  // })

  function onRequestValueEvent(jsonViewerEvent) {
  }

  function onResponseValueEvent(jsonEvent: { detail: JsonViewerEvent }) {
    console.log(jsonEvent.detail)
    if(jsonEvent.detail.expanded) {
      jsonCatched = jsonEvent.detail.json;
      isVisible = true;
      targetBox = jsonEvent.detail.target.getBoundingClientRect()
      targetBoxClassName = jsonEvent.detail.target.className;
      jsonPath = jsonEvent.detail.jsonPath;
      masterJson = jsonEvent.detail.masterJson;
      lastScrollX = scrollX;
      lastScrollY = scrollY;
      updatePosition()
    }else{
      isVisible = false;
    }
  }

  function updatePosition(){
    let y = targetBox.y;
    let x = targetBox.x;
    let width = targetBox.width;
    top = px(y - 5 - scrollY + lastScrollY);
    if(targetBoxClassName.startsWith("json-viewer-value")) width = 0;
    left = px(x + width + 20 - scrollX + lastScrollX);
  }

  function onPopupClick(){
    showEditPopUp =! showEditPopUp;
  }

  function setValue(obj, path, value) {
    console.log(obj);
    console.log(path);
    let i
    for (i = 1; i < path.length -1; i++) {
      obj = obj[path[i]];
    }
    obj[path[i]] = value;
  }


  function saveEditing(){
    const path = jsonPath.split(".");
    const jsonEdited = JSON.parse(lastText);
    setValue(masterJson, path, jsonEdited);
    $viewStore.response.body = masterJson;
    console.log($viewStore.response.body);
    onPopupClick();
    isVisible = false;
    updateNotification("done!")
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
      json={$viewStore.request.information}/>
  </DevtoolSection>
  <DevtoolSection open={$viewStore.sectionExpanded.Payload} section="Payload">
    <JsonViewer json={$viewStore.request.body}/>
  </DevtoolSection>

  {#if $viewStore.request.headers}
    <DevtoolSection
      open={$viewStore.sectionExpanded.RequestHeaders}
      section="Request Headers">
      <JsonViewer json={$viewStore.request.headers}/>
    </DevtoolSection>
  {/if}

  {#if $viewStore.response}
    <DevtoolSection
      open={$viewStore.sectionExpanded.ResponseHeaders}
      section="Response Headers">
      <JsonViewer json={$viewStore.response.headers} />
    </DevtoolSection>

  <DevtoolSection section="Response" open={$viewStore.sectionExpanded.Response}>
    {#if $viewStore.response.bodyType === "json"}
      <JsonViewer json={$viewStore.response.body} on:json-toggle={onResponseValueEvent} />
    {:else}
      <p>{$viewStore.response.body}</p>
    {/if}
  </DevtoolSection>

  {/if}

{/if}

{#if isVisible}
  <div style="position: fixed; top: {top}; left: {left}; " id="edit_buttons">
    <JsonActions jsonCatched={jsonCatched}/>
  </div>
{/if}

{#if showEditPopUp}
  <div class='bo-popup'>
    <div class='bo-popup-content'>
      <JsonEdit jsonToEdit={jsonCatched}/>
<!--      <div class='bo-popup-close' on:click={(e)=>{onPopupClick()}}></div>-->
      <div class="buttons">
        <div class="bo-button" id="abort" on:click={(e)=>{onPopupClick()}}>DISCARD</div>
        <div class="bo-button" id="save" on:click={(e)=>{saveEditing()}}>SAVE</div>
      </div>
    </div>
  </div>
{/if}



<style lang="scss">
  .hl-devtool-request {
    @apply bg-gray-50;
  }

  .buttons{
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    padding: 5px;
    text-align: center;
    @apply bg-gray-50;
  }

</style>