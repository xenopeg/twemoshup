<script>
  import EmojiDetails from "./EmojiDetails.svelte";
  import EmojiMenu from "./EmojiMenu.svelte";
  import EmojiMashup from "./EmojiMashup.svelte";
  import Emoji from "./Emoji.svelte";

  let selectedEmoji = null;
  let components = [];

  export let name;
</script>

<style>
  main {
    /* text-align: center;*/
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  app {
    display: flex;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <app>
    <EmojiMenu emojiClicked={(e) => (selectedEmoji = e)} />
    <div>
      <EmojiDetails
        emoji={selectedEmoji}
        componentClicked={(c) => {
          components = [...components, c];
          console.log(components);
        }} />
      <EmojiMashup {components} />
    </div>
  </app>
</main>
