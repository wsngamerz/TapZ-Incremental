<script lang="ts">
  import { page } from '$app/stores';

  import Button from "../components/ui/button.svelte";

  const resetSaveData = () => {
    localStorage.clear();
    location.reload();
  }

  const reloadPage = () => {
    location.reload();
  }
</script>

<div class="container mx-auto p-8 space-y-8">
  <div>
    <h1 class="text-xl font-light text-gray-400">Oh no, an error occurred</h1>
    <h2 class="text-4xl font-black">{$page.status} - {$page.error.message}</h2>
  </div>

  <div class="space-y-2">
    <p>Maybe try one of the following options?:</p>

    <div class="grid grid-cols-4 gap-4">
      <Button on:click={reloadPage}>Refresh page</Button>
      <Button on:click={resetSaveData}>Reset local save data</Button>
    </div>
  </div>
</div>
