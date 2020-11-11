<script>
  import { onMount } from "svelte";
  import EmojiComponent from "./EmojiComponent.svelte";
  import htmlToEl from "./htmlToEl.js";

  export let emoji;
  export let componentClicked;

  $: svg = emoji ? htmlToEl(emoji.svg) : null;

  let container;
  let components = [];

  const updateSVG = (svg) => {
    if (!container) return;
    container.innerHTML = "";
    components = [];

    if (svg) container.appendChild(svg);

    for (const path of svg.querySelectorAll("path, circle, ellipse")) {
      const component = svg.cloneNode();
      component.appendChild(path.cloneNode());
      components.push(component);
    }
  };

  onMount(() => {
    updateSVG(svg);
  });
  $: updateSVG(svg);
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
  {#if svg}
    <span class="moji" bind:this={container} />
    {#each components as component}
      <EmojiComponent {component} {componentClicked} />
    {/each}
  {/if}
</div>
