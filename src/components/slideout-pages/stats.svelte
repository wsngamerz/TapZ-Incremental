<script lang="ts">
  import {gameModel} from "$lib/store"

  import Layout from "./layout.svelte"
</script>

<Layout>
  <span slot="title">Stats</span>

  <pre class="text-sm sm:text-base flex text-left items-center space-x-4 bg-gray-800 text-white rounded p-4">
      {JSON.stringify($gameModel.saveData, null, 2)}
    </pre>
</Layout>