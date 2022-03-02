<style lang="scss">
  .hl-notification {
    @apply fixed inset-x-0 top-20 z-50 mx-auto w-64 rounded bg-gradient-to-br from-white to-gray-50 p-2 text-center text-sm text-gray-500 shadow-md;
  }
</style>

<script lang="ts">
  import { notificationStore, updateHideNotification } from './notification.store';
  import { fly } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';

  let interval;

  onMount(() => {
    interval = setInterval(() => {
      if ($notificationStore.show && new Date().getTime() > $notificationStore.valideUpTo)
        updateHideNotification();
    }, 50);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

{#if $notificationStore.show}
  <div class="hl-notification" transition:fly={{ y: 50, duration: 300 }}>
    {@html $notificationStore.message}
  </div>
{/if}
