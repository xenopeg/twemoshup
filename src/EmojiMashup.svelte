<script>
  import { onMount } from "svelte";
  import EmojiMashupComponent from "./EmojiMashupComponent.svelte";

  export let components;
  export let onDelete;
  export let onMove;
  let container;
  let selectedIndex;

  const updateSVG = (components) => {
    console.log("Update SVG");
    if (!container) return;
    container.innerHTML = "";
    let parent;
    for (const c of components) {
      console.log("Update SVG nodes");
      if (container.innerHTML === "") {
        parent = c.svg.cloneNode();
        container.appendChild(parent);
      }
      parent.appendChild(
        c.svg.querySelector("path, circle, ellipse").cloneNode()
      );
    }
  };

  function getSVG() {
    var link = document.createElement("a");
    link.download = "ohno.svg";
    link.style.display = "none";
    document.body.append(link);
    link.href = "data:image/svg+xml;base64,\n" + btoa(container.innerHTML);
    link.click();
    link.remove();
  }

  onMount(() => {
    updateSVG(components);
  });

  $: updateSVG(components);
</script>

<style>
  .container {
    padding: 20px;
  }
  .editor {
    display: flex;
  }
  .moji > :global(svg) {
    height: 200px;
  }
  .mashup {
    padding: 20px;
  }
</style>

<div class="container">
  <div class="editor">
    <div>
      <h5>Components:</h5>
      {#each components as component, index}
        <EmojiMashupComponent
          {component}
          {selectedIndex}
          {index}
          componentClicked={(_) => (selectedIndex = index)}
          onMove={(dir) => onMove(component, dir)}
          onDelete={(_) => onDelete(component)} />
      {/each}
    </div>
    <div class="mashup"><span class="moji" bind:this={container} /></div>
  </div>
  <button
    style={'display:' + (components.length > 0 ? 'block' : 'none')}
    on:click={(_) => getSVG()}>Download</button>
</div>
