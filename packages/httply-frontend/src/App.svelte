<script lang="ts">
  import './index.scss';
  import HttpTextArea from './components/http-text-area.svelte';
  import Httply from './components/httply-logo.svelte';
  import Devtool from './components/devtool.svelte';
  import Notification from './components/notification/notification.svelte';
  import { inputStore, updateAutoplay, updateHttpInput } from './stores/input.store';
  import { viewStore } from './stores/view.store';
  import { notificationStore, updateNotification } from './components/notification/notification.store';
  import { onDestroy, onMount } from 'svelte';
  import { pasteHotkey } from './shared/paste-hotkey.util';
  import { play } from './actions/play.action';

  (window as any).svelteLogStores = window.location.href.indexOf('localhost') >= 0;

  let httpTextArea;

  let timesAskedForPaste = 0;

  function updateInputArea() {
    if (httpTextArea) {
      httpTextArea.selectAll();
      if (timesAskedForPaste < 3) {
        timesAskedForPaste++;
        const hotkey = pasteHotkey();
        if (hotkey) updateNotification(`Press <b>${hotkey}</b> to paste`);
      }
    }
  }

  document.onvisibilitychange = function () {
    if (document.visibilityState === 'visible') {
      updateInputArea();
    }
  };

  window.addEventListener('focus', updateInputArea);

  function onClick() {
    updateHttpInput(`fetch("https://httply.com/example")`);
    updateNotification(`Press <b>space</b> to send the request. <br><small>Or use the play ▶ button</small>`);
    httpTextArea.blur();
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'v' && e.ctrlKey) {
      if (!$inputStore.autoplay) updateNotification(`Press <b>space</b> to send the request`);
      else play($inputStore.request);
      httpTextArea.blur();
    }
    if (e.key == ' ') {
      if ($notificationStore.show || !$inputStore.focused) play($inputStore.request);
    }
  };

  onMount(() => {
    document.addEventListener('keyup', onKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener('keyup', onKeyDown);
  });
</script>

<Notification />
<div class="bo-header shadow">
  <div class="bo-header-container">
    <div class="logo-text">
      <Httply />
    </div>
    <div class="ml-auto">
      <a href="https://github.com/butopen/httply">github</a>
      <a href="/docs">docs</a>
      <a href="/pricing" class="ml-0 md:ml-8">pricing</a>
      <a href="/about">about</a>
      <a href="/faqs">faqs</a>
      <a href="/login" class="ml-0 md:ml-8">login</a>
      <a href="/signup" class="font-black">signup</a>
    </div>
  </div>
</div>

<p class="my-4 mx-auto max-w-xl px-2 text-center text-sm text-gray-500" class:opacity-10={$notificationStore.show}>
  Use case #1: <b>you open a ticket to describe a bad request</b>
  <br />
  The
  <Httply />
  way → Paste the request here and use the
  <Httply />
  link instead: a complete overview of the request, the response, headers, cookies
</p>
<div class="mx-8 mt-12 leading-tight md:mt-2">
  <span class="text-xs text-gray-400">Copy a network request (<b>Copy as Node.js fetch</b>) and paste it below</span>
  <a class="cursor-pointer text-xs text-blue-300 hover:text-blue-400 hover:underline" on:click={onClick}>Try with an example</a>
</div>

<div class="ml-auto" class:request-ready={$viewStore.request.information.Url}>
  <HttpTextArea bind:this={httpTextArea} />
  {#if $viewStore.request.information.Url}
    <Devtool />
  {/if}
</div>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .logo {
    @apply inline-block h-8 w-8 text-gray-400;
  }

  .logo-text {
    @apply inline-block h-8 text-2xl italic leading-8 text-gray-400;
  }

  .request-ready {
    @apply grid grid-cols-1 items-start md:grid-cols-2;
  }
</style>
