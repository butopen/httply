<script lang="ts">
  import { loggedWritable } from '../../shared/store.util';
  import Icon from '../../shared/components/icon.svelte';
  import { createEventDispatcher } from 'svelte';
  import {EditAction} from "./plugins/edit.action";
  import {CopyAction} from "./plugins/copy.action";

  export let jsonCatched;

  let actions = [
      new EditAction(),
      new CopyAction(),
  ]

  const dispatch = createEventDispatcher();
  let isClicked = false;
  const s = loggedWritable({});


  function onClick(){
      isClicked = !isClicked;
      console.log("cliccato il bottone ",isClicked);
      console.log(jsonCatched);
  }

</script>


<div class:clicked={isClicked} >
        {#each actions as action}
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold h-6 w-6 border border-gray-400 rounded shadow">
                <Icon class="button h-4 w-4"
                    name= {action.name}
                    tooltip={action.tooltip}
                    on:click={(e)=> action.onClick(jsonCatched)}
                />
            </button>
        {/each}
</div>

<style lang="scss">
  .json-actions {
    @apply fixed block;
  }
</style>
