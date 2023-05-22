<script>
    import { EmojiButton } from "@joeattardi/emoji-button";
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    const picker = new EmojiButton();
    let trigger;
  
    picker.on("emoji", selection => {
      dispatch("change", selection);
    });
  
    function togglePicker() {
      picker.togglePicker(trigger);
    }
  </script>
  
  <button type="button" bind:this={trigger} on:click={togglePicker}>
    😀
  </button>