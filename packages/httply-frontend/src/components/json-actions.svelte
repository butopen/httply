<script lang="ts">
  import { loggedWritable } from '../shared/store.util';
  import Icon from '../shared/components/icon.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const s = loggedWritable({});

  function handleEdit(){

  }

</script>

<!--<div class="json-actions">azioni</div>-->
<div class="json-actions">
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold h-6 w-6 border border-gray-400 rounded shadow">
        <Icon class="button h-4 w-4"
        on:click={(e) => handleEdit()}
        name="edit"
        tooltip="Edit Section" />
    </button>
</div>

<style lang="scss">
  .json-actions {
    @apply fixed block;
  }
</style>
