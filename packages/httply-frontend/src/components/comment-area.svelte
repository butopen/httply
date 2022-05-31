<script lang="ts" context="module">
    export let lastText:string;
    export let errors:boolean;
    //  contains last update done on editor
</script>

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
    import {defaultHighlightStyle, syntaxHighlighting, indentOnInput,
        bracketMatching, foldGutter, foldKeymap} from '@codemirror/language';
    import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
    import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
    import {autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap} from '@codemirror/autocomplete';
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import {loggedWritable} from "../shared/store.util";

    export let text: string;

    const store = loggedWritable({
        content: text
    });

    let textareaContainer: HTMLDivElement;
    let lastContent: string;
    // export let lastText: string; !
    let cmView;

    export function blur() {
        if (cmView) cmView.dom.blur();
    }
    function recreateView() {
        cmView = new EditorView({
            state: EditorState.create({
                extensions: [
                    syntaxHighlighting(defaultHighlightStyle),
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightSpecialChars(),
                    history(),
                    foldGutter(),
                    drawSelection(),
                    dropCursor(),
                    EditorState.allowMultipleSelections.of(true),
                    indentOnInput(),
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
                        indentWithTab
                    ]),
                    EditorView.updateListener.of((update) => {
                        const text = cmView.state.doc.toString();
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
        if ((e.key == 'v' && e.ctrlKey) || (e.key == " ")) {
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

    // insert rows
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

<div class="json-editor" bind:this={textareaContainer}></div>

<style lang="scss">
  .json-editor {
    @apply w-full border border-gray-200;
  }
</style>