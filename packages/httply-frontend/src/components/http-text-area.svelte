<script lang="ts">
  import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
  import { javascript } from '@codemirror/lang-javascript';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { inputStore, updateEditorFocused as uef, updateHttpInput } from '../stores/input.store';
  import { play } from '../actions/play.action';
  import { viewStore } from '../stores/view.store';

  const updateEditorFocused = wrap(uef, (target, ...args) => {
    console.log('wrapped updateEditorFocused', target, args);
    let options = args[args.length - 1];
    options.beforeReturn = (result) => {
      console.log('result: ', result);
      return result;
    };
  });

  function wrap(f, observer) {
    const original = f;
    const wrapper = function (...args) {
      let options = {
        skipThrow: false,
        override: null,
        onError: (error) => {},
        beforeReturn: (result) => {
          return result;
        },
        executeOriginal: () => {
          return original.apply(this, args);
        }
      };
      observer.apply(this, [...args, options]);
      if (options.override) {
        // @ts-ignore
        return options.override(args);
      } else {
        try {
          let rv = options.executeOriginal();
          return options.beforeReturn(rv);
        } catch (e) {
          options.onError(e);
          if (!options.skipThrow) throw e;
        }
      }
    };
    return wrapper;
  }

  let textareaContainer: HTMLDivElement;

  let lastContent: string;
  let lastText: string;

  let cmView;

  export function blur() {
    if (cmView) cmView.dom.blur();
  }

  function onFocus(e: FocusEvent) {
    updateEditorFocused(true);
  }

  function onBlur(e: FocusEvent) {
    updateEditorFocused(false);
  }

  function recreateView() {
    cmView = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          javascript(),
          EditorView.domEventHandlers({
            focus: (e) => onFocus(e),
            blur: (e) => onBlur(e)
          }),
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
    updateCMView(lastContent);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'v' && e.ctrlKey) {
      updateHttpInput(cmView.state.doc.toString());
    }
  };

  onMount(() => {
    recreateView();
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

  export function selectAll() {
    cmView.focus();
    cmView.dispatch({
      selection: { anchor: 0, head: cmView.state.doc.length }
    });
  }
</script>

<div class="http-paste-textarea-container" bind:this={textareaContainer} />

<style lang="scss">
  .http-paste-textarea-container {
    @apply w-full border border-gray-200;
  }
</style>
