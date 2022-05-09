<script lang="ts">
  import {
    keymap,
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    lineNumbers,
    highlightActiveLineGutter,
    EditorView
  } from '@codemirror/view';
  import { Extension, EditorState } from '@codemirror/state';
  import {
    defaultHighlightStyle,
    syntaxHighlighting,
    indentOnInput,
    bracketMatching,
    foldGutter,
    foldKeymap
  } from '@codemirror/language';
  import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
  import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
  import {
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap
  } from '@codemirror/autocomplete';
  import { lintKeymap } from '@codemirror/lint';
  import { json } from '@codemirror/lang-json';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { loggedWritable } from '../shared/store.util';

  const store = loggedWritable({
    content: ''
  });

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
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap
          ]),
          json() /*
          EditorView.domEventHandlers({
            focus: (e) => onFocus(e),
            blur: (e) => onBlur(e)
          }),*/,
          EditorView.updateListener.of((update) => {
            const text = cmView.state.doc.toString();
            if (text && text != lastText && text != lastContent) {
            }
            lastText = text;
          })
        ]
      }),
      parent: textareaContainer
    });
    const state = cmView.state;
    updateCMView(lastContent);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'v' && e.ctrlKey) {
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

  store.subscribe((s) => {
    lastContent = s.content;
    updateCMView(s.content);
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

<div class="json-editor" bind:this={textareaContainer} />

<style lang="scss">
  .json-editor {
    @apply w-full border border-gray-200;
  }
</style>
