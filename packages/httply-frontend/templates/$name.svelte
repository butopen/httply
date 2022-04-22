<script lang="ts">
  import { loggedWritable } from '../shared/store.util';
  import { queryParams } from '../shared/url-params.service';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const params = queryParams<{ id: string }>();

  const $store = loggedWritable({
    token: params.id
  });
</script>

<div class="$name" />

<style lang="scss">
  .$name {
    @apply block;
  }
</style>
