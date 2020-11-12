<script>
  import EmojiDetails from "./EmojiDetails.svelte";
  import EmojiMenu from "./EmojiMenu.svelte";
  import EmojiMashup from "./EmojiMashup.svelte";

  let selectedEmoji = null;
  let components = [];
</script>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  app {
    display: flex;
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
