<script lang="ts">
  import './index.scss';
  import HttpTextArea from './components/http-text-area.svelte';
  import Httply from './components/httply-logo.svelte';
  import Devtool from './components/devtool.svelte';
  import Notification from './components/notification/notification.svelte';
  import { inputStore, updateHttpInput } from './stores/input.store';
  import { viewStore } from './stores/view.store';
  import {
    notificationStore,
    updateNotification
  } from './components/notification/notification.store';
  import { onDestroy, onMount } from 'svelte';
  import { pasteHotkey } from './shared/paste-hotkey.util';
  import { play, share } from './actions/play.action';
  import { manageSharedUrl } from './apis/manage-shared-url.api';
  import { mainMessageStore } from './components/notification/notification.store';

  (window as any).svelteLogStores = window.location.href.startsWith(
    'http://localhost:3000'
  );

  manageSharedUrl();

  let httpTextArea;

  let timesAskedForPaste = 0;

  function updateInputArea() {
    if (httpTextArea) {
      httpTextArea.selectAll();
      if (timesAskedForPaste < 3) {
        timesAskedForPaste++;
        const hotkey = pasteHotkey();
        if (hotkey)
          updateNotification(`If you copied a request, press <b>${hotkey}</b> to paste`);
      }
    }
  }

  document.onvisibilitychange = function () {
    if (document.visibilityState === 'visible') {
      updateInputArea();
    }
  };

  //window.addEventListener('focus', updateInputArea);

  function onClick() {
    updateHttpInput(`fetch("https://api.tvmaze.com/search/shows?q=billions")`);
    updateNotification(
      `Press <b>space</b> to send the request. <br><small>Or use the play ▶ button</small>`
    );
    httpTextArea.blur();
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'v' && e.ctrlKey) {
      if (!$inputStore.autoplay) {
        updateNotification(`Press <b>space</b> to send the request`);
        httpTextArea.blur();
      } else play($inputStore.request, $viewStore.request.information.Domain);
    }
    if (e.key == ' ') {
      if ($notificationStore.show || !httpTextArea.hasFocus())
        play($inputStore.request, $viewStore.request.information.Domain);
    }
  };

  onMount(() => {
    document.addEventListener('keyup', onKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener('keyup', onKeyDown);
  });

  function onCopy() {
    share($viewStore.shareLink);
  }
</script>

<Notification />
<div class="bo-header shadow">
  <div class="bo-header-container">
    <a class="logo-text" href="/">
      <Httply />
    </a>
    <div class="ml-auto">
      <a href="https://github.com/butopen/httply">github</a>
      <!-- 
      <a href="/docs">docs</a>
      <a href="/pricing" class="ml-0 md:ml-8">pricing</a>
      <a href="/about">about</a>
      <a href="/faqs">faqs</a>
      <a href="/login" class="ml-0 md:ml-8">login</a>
      <a href="/signup" class="font-black">signup</a>
      -->
    </div>
  </div>
</div>

<div
  class="my-4 mx-auto flex h-20 max-w-xl items-center px-2 text-center text-sm text-gray-500">
  {#if $viewStore.shareLink}
    <div class="w-full text-center">
      <input type="text" bind:value={$viewStore.shareLink} />
      <div class="mt-4">
        Share this request:
        <button class="bo-button ml-2" on:click={onCopy}>Copy shareable link</button>
      </div>
    </div>
  {/if}
  {#if $mainMessageStore.message}
    <span class="truncate">{@html $mainMessageStore.message}</span>
  {/if}
  {#if !($mainMessageStore.message || $viewStore.shareLink)}
    <span class="text-xs text-gray-500"
      >Copy a network request (<b>Copy as Node.js fetch</b>) and paste it below</span>
    <a
      class="ml-2 cursor-pointer text-xs text-blue-300 hover:text-blue-400 hover:underline"
      on:click={onClick}>Try with an example</a>
  {/if}
</div>
<div class="ml-auto" class:request-ready={$viewStore.request.information.Url}>
  <HttpTextArea bind:this={httpTextArea} />
  {#if $viewStore.request.information.Url}
    <Devtool />
  {/if}
</div>

{#if !$viewStore.request.information.Url}
  <p
    class="my-4 mx-auto max-w-xl px-2 text-center text-xs text-gray-400"
    class:opacity-10={$notificationStore.show}>
    Use case #1: <b>you open a ticket to describe a bad request</b>
    <br />
    The
    <Httply />
    way → Paste the request here and use the
    <Httply />
    link instead: a complete overview of the request, the response, headers, cookies
  </p>
{/if}

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .logo {
    @apply inline-block h-8 w-8 text-gray-400;
  }

  .logo-text {
    @apply inline-block h-8 text-2xl lowercase italic leading-8 text-gray-400;
  }

  .request-ready {
    @apply grid grid-cols-1 items-start md:grid-cols-2;
  }

  .primary {
    @apply text-green-400;
  }
</style>
