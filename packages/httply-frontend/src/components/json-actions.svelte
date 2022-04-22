<script lang="ts">
  import { loggedWritable } from '../shared/store.util';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const s = loggedWritable({});
</script>

<div class="json-actions">azioni</div>

<style lang="scss">
  .json-actions {
    @apply fixed block;
  }
</style>
