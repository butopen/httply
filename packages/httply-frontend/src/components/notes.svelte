<script lang="ts">
import {viewStore} from "../stores/view.store.ts";
import DevtoolSection from "./devtool-section.svelte";
import CommentArea, {lastText} from './comment-area.svelte';


function clearNotes(){
    $viewStore.notes = "";
}

function saveNotes(){
    $viewStore.notes = lastText;
    console.log($viewStore.notes);
}

</script>


<div class="notes">
    <DevtoolSection open={$viewStore.sectionExpanded.Notes} section="Notes">
        <CommentArea text={$viewStore.notes}></CommentArea>
        <div class="buttons">
            <div class="bo-button" id="clear" on:click={(e)=>{clearNotes()}}>CLEAR ALL</div>
            <div class="bo-button" id="save" on:click={(e)=>{saveNotes()}}>SAVE</div>
        </div>
    </DevtoolSection>
</div>

<style>

.buttons{
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    padding: 5px;
    text-align: center;
    @apply bg-gray-50;
}

</style>