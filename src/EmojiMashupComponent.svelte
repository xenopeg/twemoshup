<script>
  import { onMount } from "svelte";

  export let component;
  export let componentClicked;
  export let index;
  export let selectedIndex;
  export let onDelete;
  export let onMove;

  let container;

  const updateSVG = (svg) => {
    console.log(svg);
    if (!container) return;
    container.innerHTML = "";

    if (svg) container.appendChild(svg.cloneNode(true));
  };

  onMount(() => {
    updateSVG(component.svg);
  });
  $: updateSVG(component.svg);
</script>

<style>
  :global(.selected).container {
    border: 1px solid red;
    padding: 4px !important;
  }
  .container {
    width: 150px;
    padding: 5px;
    border-radius: 3px;
    background: #f3f3f3;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .moji {
    display: inline-block;
    flex-grow: 1;
    height: 30px;
  }
  .moji > :global(svg) {
    height: 30px;
  }
  button {
    border-radius: 2px;
    border-width: 0;
    background: #ccc;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0 5px;
  }
</style>

<div
  class="container"
  class:selected={index === selectedIndex}
  on:click={componentClicked}>
  <div
    class="moji"
    bind:this={container}
    on:click={(_) => componentClicked(component)} />
  <button on:click={(_) => onMove('up')}>🔺</button>
  <button on:click={(_) => onMove('down')}>🔻</button>
  <button on:click={(_) => onDelete()}>❌</button>
</div>
