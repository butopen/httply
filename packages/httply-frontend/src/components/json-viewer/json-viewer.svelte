<script lang="ts">
  import type { Json } from '../../shared/json.model';
  import { JsonViewerLogic, RenderedJsonRow } from './json-viewer.logic';
  import { createEventDispatcher } from 'svelte';

  let dispatch = createEventDispatcher();
  export let json: Json = {};
  export let masterJson: Json = {};
  export let isMaster: boolean = true;

  if (isMaster) masterJson = json;

  interface JsonViewerEvent {
    type: 'mouseleave' | 'mouseenter' | 'json-viewer';
    json: Json;
    key: string;
    value: string;
    mouseEvent?: MouseEvent;
    expanded?: boolean;
    jsonPath: string;
    masterJson: Json;
  }

  export let jsonPath = '';

  const jsonViewer = new JsonViewerLogic();

  let rendered: RenderedJsonRow[] = [];

  $: {
    rendered = jsonViewer.toRenderedValues(json);
  }

  function onToggle(e: MouseEvent, r: RenderedJsonRow) {
    e.stopPropagation();
    if (['object', 'array'].includes(r.jsonType)) {
      r.expanded = !r.expanded;
    }
    rendered = [...rendered];
  }

  function onChildJsonValueEvent(jsonViewerEvent: { detail: JsonViewerEvent }) {
    dispatch('json-viewer', jsonViewerEvent.detail);
  }

  function onValueMouseEnter(e: MouseEvent, r: { key: string; value: Json }) {
    dispatch('json-viewer', {
      type: 'mouseenter',
      json: json[r.key],
      key: r.key,
      value: r.value,
      mouseEvent: e,
      jsonPath,
      masterJson
    });
  }

  function onValueMouseLeave(
    e: MouseEvent,
    r: { key: string; value: Json; expanded: boolean }
  ) {
    dispatch('json-viewer', {
      type: 'mouseleave',
      json: json[r.key],
      key: r.key,
      value: r.value,
      mouseEvent: e,
      jsonPath,
      masterJson,
      expanded: r.expanded
    });
  }
</script>

<div class="hl-json-viewer">
  <ul class:master={isMaster}>
    {#each rendered as r}
      <li class:expanded={r.expanded}>
        <div
          on:click={(e) => onToggle(e, r)}
          class="json-viewer-row {r.jsonType}"
          on:mouseenter={(e) => onValueMouseEnter(e, r)}
          on:mouseleave={(e) => onValueMouseLeave(e, r)}>
          <span class="json-viewer-key">{r.key}</span>
          {#if r.key}
            <span class="json-viewer-ddots">:</span>
          {/if}
          {#if !r.expanded}
            <span title={r.tooltip} class="json-viewer-value collapsed {r.jsonType}"
              >{r.value}</span>
          {/if}
        </div>
        {#if r.expanded}
          <svelte:self
            jsonPath={jsonPath + '.' + r.key}
            isMaster={false}
            {masterJson}
            json={r.json}
            on:json-viewer={onChildJsonValueEvent} />
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .hl-json-viewer {
    @apply block bg-white;
  }

  ul {
    @apply m-0 ml-2.5 list-none p-0;
  }

  ul.master {
    @apply pt-1;
  }

  ul:not(.master) {
    @apply ml-1.5 border-l border-gray-100;
  }

  ul:not(.master):hover {
    @apply border-gray-200;
  }

  li {
    @apply m-0 ml-3 list-none p-0 text-xs leading-4;
    width: 600px;
  }

  .json-viewer-row {
    @apply inline-flex h-4 whitespace-nowrap leading-4;
  }

  .json-viewer-key {
    color: #a000a5;
    @apply relative;
  }

  .json-viewer-ddots {
    color: #240024;
  }

  .json-viewer-value {
    @apply ml-2 inline-block w-full truncate;
  }

  .json-viewer-value.string {
    color: #008b00;
  }

  .json-viewer-value.number {
    color: #5e37ff;
  }

  .json-viewer-value.null {
    color: #ec4a00;
  }

  .json-viewer-value.object,
  .json-viewer-value.array {
    @apply w-full truncate;
  }

  .json-viewer-value.string:before,
  .json-viewer-value.string:after {
    content: '"';
  }

  .json-viewer-row.object,
  .json-viewer-row.array {
    @apply cursor-pointer;
  }

  .json-viewer-row:not(.object, .array) {
    @apply ml-4;
  }

  .json-viewer-row.object:before,
  .json-viewer-row.array:before {
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M10,6 L14,9 L10,12 z"/></svg>');
    opacity: 50%;
    transition: transform 150ms ease-in-out;
  }

  .json-viewer-value.object.collapsed,
  .json-viewer-value.array.collapsed {
    @apply max-w-md truncate whitespace-nowrap text-gray-400;
  }

  li.expanded > .json-viewer-row.object:before,
  li.expanded > .json-viewer-row.array:before {
    transform-origin: 50% 50%;
    transform: translate(0, -4px) rotate(90deg);
  }
</style>
