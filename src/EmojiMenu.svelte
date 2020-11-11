<script>
  import twemoji from "twemoji";
  import emojiJson from "emoji.json";
  import EmojiGroup from "./EmojiGroup.svelte";
  import demoji from "discord-emoji";

  export let emojiClicked;

  const discordMap = {};

  for (const [groupName, group] of Object.entries(demoji)) {
    for (const [name, emoji] of Object.entries(group)) {
      discordMap[emoji] = name;
    }
  }

  const emojiCats = {};
  for (const emoji of emojiJson) {
    if (!emojiCats[emoji.group]) emojiCats[emoji.group] = [];
    emojiCats[emoji.group].push({
      twemoji: twemoji.parse(emoji.char, {
        folder: "svg",
        ext: ".svg",
      }),
      emoji,
      discordName: discordMap[emoji.char],
      url:
        "https://twemoji.maxcdn.com/v/13.0.1/svg/" +
        twemoji.convert.toCodePoint(emoji.char) +
        ".svg",
    });
  }

  let search = "";
</script>

<style>
  menu {
    width: 300px;
    border: 1px solid #ccc;
    padding: 1em;
    border-radius: 3px;
  }

  input {
    width: 100%;
  }
</style>

<menu>
  <input bind:value={search} />
  {#each Object.keys(emojiCats) as k}
    <EmojiGroup emojiGroup={emojiCats[k]} name={k} {search} {emojiClicked} />
  {/each}
</menu>
