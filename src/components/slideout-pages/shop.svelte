<script>
  import Button from "../ui/button.svelte";
  import Layout from "./layout.svelte"
</script>


<Layout>
  <span slot="title">Shop</span>

  <div slot="extra" class="flex flex-col gap-2">
    <Button>Sell all brains</Button>

    <div class="grid grid-cols-2 gap-2">
      <Button>Display: All</Button>
      <Button>Buy: x1</Button>
    </div>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
    {#each {length: 20} as _, i}
      <div class="rounded block bg-gray-800 h-24 p-2">
        <span class="text-gray-500">{i}</span>
      </div>
    {/each}
  </div>
</Layout>