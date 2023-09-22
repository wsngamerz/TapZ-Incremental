<script lang="ts">
  import { gameManager } from "$lib/store";

  import Button from "../ui/button.svelte";
  import Layout from "./layout.svelte"

  const resetData = () => {
    localStorage.clear();
    location.reload();
  };

  const saveGame = () => {
    $gameManager.save();
  };
</script>


<Layout>
  <span slot="title">Settings</span>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
    <Button on:click={saveGame}>Save</Button>
    <Button on:click={resetData}>Reset data</Button>
  </div>
</Layout>
