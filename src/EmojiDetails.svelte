<script>
  import { onMount } from "svelte";
  import EmojiComponent from "./EmojiComponent.svelte";
  import htmlToEl from "./htmlToEl.js";

  export let emoji;
  export let componentClicked;

  let container;
  let components = [];
  let svg = null;

  function updateSelected() {
    console.log("updateSelected");
    svg = emoji ? htmlToEl(emoji.svg) : null;
    updateSVG(svg);
  }

  function updateSVG(svg) {
    console.log("updateSVG");
    if (!container) return;
    container.innerHTML = "";
    components = [];

    if (svg) container.appendChild(svg);

    for (const path of svg.querySelectorAll("path, circle, ellipse")) {
      const component = svg.cloneNode();
      component.appendChild(path.cloneNode());
      components.push(component);
    }
  }

  $: updateSelected(emoji);
  updateSelected(emoji);
</script>

<style>
  div {
    padding: 20px;
  }
  .moji > :global(svg) {
    height: 100px;
  }
</style>

<div>
  <span class="moji" bind:this={container} />
  {#each components as component}
    <EmojiComponent {component} {componentClicked} />
  {/each}
</div>
