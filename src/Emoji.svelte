<script>
  import get from "./get.js";
  export let emoji;

  export let emojiClicked;

  let data = "";

  function updateTitle(emoji) {
    data = JSON.stringify(emoji, null, 4);
  }

  let svg = null;
  let curReq = 0;
  async function loadSvg(url) {
    curReq++;
    const draw = curReq;
    const res = await get(url);
    if (draw === curReq) {
      svg = res;
    }
  }

  $: loadSvg(emoji.url);
  loadSvg(emoji.url);

  $: updateTitle(emoji);
  updateTitle(emoji);
</script>

<style>
  .moji {
    display: inline-block;
  }

  .moji > :global(svg) {
    height: 20px;
  }
</style>

<span class="moji" title={data} on:click={(_) => emojiClicked({ emoji, svg })}>
  {#if svg}
    {@html svg}
  {/if}
</span>
