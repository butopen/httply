<script lang="ts">

    import {inputStore} from "../stores/input.store";

</script>

{#if $inputStore.request}
    <div class="hl-devtool-request">
        url: {$inputStore.request.url}
        method: {$inputStore.request.options?.method}
    </div>
{/if}


<style lang="scss">

  .hl-devtool-request {

  }

</style>
