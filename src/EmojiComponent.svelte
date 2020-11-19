<script>
  import { onMount } from "svelte";

  export let component;
  export let componentClicked;

  let container;

  const updateSVG = (svg) => {
    if (!container) return;
    container.innerHTML = "";

    if (svg) container.appendChild(svg);
  };

  onMount(() => {
    updateSVG(component);
  });
  $: updateSVG(component);
</script>

<style>
  div {
    display: inline-block;
    padding: 5px;
    border-radius: 3px;
    background: #f3f3f3;
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
