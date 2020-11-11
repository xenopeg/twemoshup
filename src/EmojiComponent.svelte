<script>
  import { onMount } from "svelte";

  export let component;
  export let componentClicked;
  console.log(componentClicked);

  let container;

  const updateSVG = (svg) => {
    if (!container) return;
    container.innerHTML = "";

    if (svg) container.appendChild(svg);
  };

  onMount(() => {
    console.log(component);
    updateSVG(component);
  });
  $: updateSVG(component);
</script>

<style>
  div {
    display: inline-block;
    padding: 5px;
    border-radius: 3px;
    background: #fafafa;
    margin: 5px;
  }
  .moji > :global(svg) {
    height: 60px;
  }
</style>

<div
  class="moji"
  bind:this={container}
  on:click={(_) => componentClicked(component)} />
