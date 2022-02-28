<script lang="ts">
    import "./index.scss";
    import HttpTextArea from "./components/http-text-area.svelte"
    import Httply from "./components/httply-logo.svelte"
    import Devtool from "./components/devtool.svelte"
    import {updateHttpDomain, updateHttpInput} from "./stores/input.store";

    (window as any).svelteLogStores = true
    function onClick(){
        updateHttpInput(`fetch("https://httply.com/example")`)
        updateHttpDomain(`https://httply.com`)
    };
</script>

<div class="bo-header shadow">
    <div class="bo-header-container">
        <div class="logo-text">
           <Httply />
        </div>
        <div class="ml-auto">
            <a href="https://github.com/butopen/httply">github</a>
            <a href="/docs">docs</a>
            <a href="/pricing" class="ml-8">pricing</a>
            <a href="/about">about</a>
            <a href="/faqs">faqs</a>
            <a href="/login" class="ml-8">login</a>
            <a href="/signup" class="font-black">signup</a>
        </div>
    </div>
</div>

<p class="text-gray-500 text-sm px-2 my-4 max-w-xl text-center mx-auto">
    Use case #1: <b>you open a ticket to describe a bad request</b> 
    <br />
    The <Httply /> way → Paste the request here and use the <Httply /> link instead: 
    a complete overview of the request, the response, 
    headers, cookies
</p>
<div>
    <span class="text-gray-400 text-xs">Copy a network request (<b>Copy as fetch</b>) and paste it below</span>
    <a
            class="text-blue-300 hover:text-blue-400 cursor-pointer text-xs hover:underline"
            on:click={onClick}
    >Try with an example</a>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 items-start">
    <HttpTextArea></HttpTextArea>
    <Devtool></Devtool>
</div>


<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }


  .logo {
    @apply h-8 w-8 text-gray-400 inline-block;
  }

  .logo-text {
    @apply h-8 text-gray-400 text-2xl italic inline-block leading-8
  }


</style>
