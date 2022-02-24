<script lang="ts">
    import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
    import {javascript} from "@codemirror/lang-javascript"
    import {afterUpdate, onMount} from "svelte";
    import {inputStore} from "../stores/input.store";

    let textareaContainer:HTMLDivElement

    let lastContent:string
    
    let cmView
    
    let cmState = EditorState.create({extensions: [basicSetup, javascript()]})

    function recreateView() {
        cmView = new EditorView({
            state: cmState,
            parent: textareaContainer
        })
        updateCMView(lastContent)
    }

    onMount(() => {
        recreateView();
        inputStore.set($inputStore)
    })

    afterUpdate(() => {
        cmView.destroy()
        recreateView()
    })

    function updateCMView(content: string) {
        if (cmView) {
            let transaction = cmState.update({changes: {from: 0, to: cmState.doc.length, insert: content}})
            cmView.dispatch(transaction)
            cmState = transaction.state
        }
    }

    inputStore.subscribe( content => {
        lastContent = content
        updateCMView(content);
    })

</script>

<div class="http-paste-textarea-container" bind:this={textareaContainer}>

</div>

<style lang="scss">
    
    .http-paste-textarea-container {
      @apply w-full border border-gray-200
    }

    

    
    
</style>
