<script>
  import get from "./get.js";
  export let emoji;

  export let emojiClicked;
  console.log(emojiClicked);

  const string = JSON.stringify(emoji, null, 4);
  let svg = null;
  async function loadSvg(url) {
    svg = await get(url);
  }
  $: loadSvg(emoji.url);
  loadSvg(emoji.url);
</script>

<style>
  .moji {
    display: inline-block;
  }

  .moji > :global(svg) {
    height: 20px;
  }
</style>

<span
  class="moji"
  title={string}
  on:click={(_) => emojiClicked({ emoji, svg })}>
  {#if svg}
    {@html svg}
  {/if}
</span>
