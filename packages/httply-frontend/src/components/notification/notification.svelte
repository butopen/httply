<script lang="ts">
    import {notificationStore, updateHideNotification} from "./notification.store";
    import { fly } from 'svelte/transition';
    import {onDestroy, onMount} from "svelte";
    
    let interval
    
    onMount(()=>{
        interval = setInterval(()=>{
            if($notificationStore.show && new Date().getTime() > $notificationStore.valideUpTo)
                updateHideNotification()
        }, 50)
    })
    
    onDestroy(()=>{
        clearInterval(interval)
    })
    
</script>
{#if $notificationStore.show}
    <div class="hl-notification" transition:fly="{{ y: 50, duration: 300 }}">
        {@html $notificationStore.message}
    </div>
{/if}

<style lang="scss">
  .hl-notification {
    @apply bg-gradient-to-br from-white to-gray-50 shadow-md fixed inset-x-0 mx-auto z-50 w-64 top-20 rounded p-2 text-sm text-center text-gray-500
  }
</style>
