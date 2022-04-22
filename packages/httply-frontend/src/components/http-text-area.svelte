<script lang="ts">
  import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
  import { javascript } from '@codemirror/lang-javascript';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { inputStore, updateHttpInput } from '../stores/input.store';
  import { play } from '../actions/play.action';
  import { viewStore } from '../stores/view.store';

  let textareaContainer: HTMLDivElement;

  let lastContent: string;
  let lastText: string;

  let cmView;

  export function blur() {
    if (cmView) cmView.dom.blur();
  }

  function recreateView() {
    cmView = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          javascript() /*
          EditorView.domEventHandlers({
            focus: (e) => onFocus(e),
            blur: (e) => onBlur(e)
          }),*/,
          EditorView.updateListener.of((update) => {
            const text = cmView.state.doc.toString();
            if (text && text != lastText && text != lastContent) {
              updateHttpInput(text);
              play($inputStore.request, $viewStore.request.information.Domain);
            }
            lastText = text;
          })
        ]
      }),
      parent: textareaContainer
    });
    const state = cmView.state;
    /*
    this.decorations = state.doc.length
      ? Decoration.none
      : Decoration.set(
          Decoration.widget({ widget: new PlaceholderWidget(text), side: 1 }).range(0)
        );
        
     */
    //cmView.placeholder(`Press <b>${pasteHotkey()}</b> to paste`);
    updateCMView(lastContent);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'v' && e.ctrlKey) {
      updateHttpInput(cmView.state.doc.toString());
    }
  };

  onMount(() => {
    recreateView();
    cmView.focus();
    document.addEventListener('keyup', onKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener('keyup', onKeyDown);
  });

  afterUpdate(() => {
    cmView.destroy();
    recreateView();
    cmView.focus();
  });

  function updateCMView(content: string) {
    if (cmView) {
      let transaction = cmView.state.update({
        changes: { from: 0, to: cmView.state.doc.length, insert: content }
      });
      cmView.dispatch(transaction);
    }
  }

  inputStore.subscribe((content) => {
    lastContent = content.httpInput;
    updateCMView(content.httpInput);
  });

  export function hasFocus() {
    console.log('focus', cmView.hasFocus);
    return cmView.hasFocus;
  }

  export function selectAll() {
    console.log('selectAll: ');
    cmView.dispatch({
      selection: { anchor: 0, head: cmView.state.doc.length }
    });
    cmView.focus();
  }
</script>

<div class="http-paste-textarea-container" bind:this={textareaContainer} />

<style lang="scss">
  .http-paste-textarea-container {
    @apply w-full border border-gray-200;
  }
</style>
