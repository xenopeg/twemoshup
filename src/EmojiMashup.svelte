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

  function dl(filename, data) {
    const link = document.createElement("a");
    link.download = filename;
    link.style.display = "none";
    document.body.append(link);
    link.href = data;
    link.click();
    link.remove();
  }

  function getSVG() {
    dl(
      `mash.${Date.now()}.svg`,
      "data:image/svg+xml;base64,\n" + btoa(container.innerHTML)
    );
  }

  function getPNG() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", 512);
    canvas.setAttribute("height", 512);
    const ctx = canvas.getContext("2d");

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64,\n" + btoa(container.innerHTML)
    );
    img.setAttribute("width", 512);
    img.setAttribute("height", 512);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      // Now is done
      console.log(canvas.toDataURL("image/png"));
      dl(`mash.${Date.now()}.png`, canvas.toDataURL("image/png"));
    };
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
    style={'display:' + (components.length > 0 ? 'inline-block' : 'none')}
    on:click={(_) => getSVG()}>Download SVG</button>
  <button
    style={'display:' + (components.length > 0 ? 'inline-block' : 'none')}
    on:click={(_) => getPNG()}>Download PNG</button>
</div>
