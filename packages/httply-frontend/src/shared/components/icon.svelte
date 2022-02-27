<script lang="ts">
    import type {HttplyIcon} from "./icons";
    import {hlIcons} from "./icons";
    import {afterUpdate} from "svelte";

    export let name: HttplyIcon

    let clazz: string = "";
    let defaultClasses = "";
    export {clazz as class};

    afterUpdate(() => {
        if (clazz) {
            const classes = clazz.split(" ")
            const hasHeight = classes.find(c => c.startsWith("h"))
            const hasWidth = classes.find(c => c.startsWith("w"))
            const hasColor = classes.find(c => c.startsWith("text"))
            if (!hasColor)
                defaultClasses += " text-gray-400"
            if (!hasWidth)
                defaultClasses += " w-6"
            if (!hasHeight)
                defaultClasses += " h-6"
        } else
            defaultClasses += "text-gray-400  w-6 h-6"
    })

</script>


<svg on:click class={(clazz || '') + defaultClasses } 
     stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={hlIcons[name]} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


<style lang="scss">
    svg {
      @apply inline-block
    }
</style>
