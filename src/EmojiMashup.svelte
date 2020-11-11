<script>
  import { onMount } from "svelte";

  export let components;
  let container;

  const updateSVG = (components) => {
    if (!container) return;
    container.innerHTML = "";
    let parent;

    for (const c of components) {
      if (container.innerHTML === "") {
        parent = c.cloneNode();
        container.appendChild(parent);
      }
      parent.appendChild(c.querySelector("path, circle, ellipse").cloneNode());
    }
  };

  onMount(() => {
    updateSVG(components);
  });
  $: updateSVG(components);
</script>

<style>
  div {
    padding: 20px;
  }
  .moji > :global(svg) {
    height: 200px;
  }
</style>

<div><span class="moji" bind:this={container} /></div>
