<script lang="ts">
  import { gameManager } from "$lib/store";

  import Layout from "./layout.svelte";
</script>

<Layout>
  <span slot="title">Stats</span>

  <div class="space-y-2">
    <div class="flex gap-2">
      <span class="bg-gray-900 py-0.5 px-4 rounded">DPC: {$gameManager.getDpc()}</span>
      <span class="bg-gray-900 py-0.5 px-4 rounded">DPS: {$gameManager.getDps()}</span>
    </div>
    <pre
      class="text-sm sm:text-base flex text-left items-center space-x-4 bg-gray-800 text-white rounded p-4">{JSON.stringify($gameManager.saveData, null, 2)}</pre>
  </div>
</Layout>