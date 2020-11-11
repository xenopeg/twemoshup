<script>
  import Emoji from "./Emoji.svelte";

  export let name;
  export let emojiGroup;
  export let search;

  export let emojiClicked;

  let emojis = [];
  let filteredEmojis = [];

  const updateFilter = (emojiGroup, search) => {
    emojis = emojiGroup.filter((e) => {
      return (
        e.emoji.name.indexOf(search) > -1 ||
        (e.discordName && e.discordName.indexOf(search) > -1)
      );
    });
    filteredEmojis = emojis.slice(0, 20);
  };

  $: updateFilter(emojiGroup, search);
</script>

<div>
  <div><b>{name}</b></div>
  {#each filteredEmojis as e}
    <Emoji emoji={e} {emojiClicked} />
  {/each}
  {#if filteredEmojis.length < emojis.length}...{/if}
</div>
