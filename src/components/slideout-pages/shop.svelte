<script>
  import Button from "../ui/button.svelte";
</script>

<div class="w-full h-full grid gap-2">
  <div class="grid md:flex gap-2">
    <div class="flex-grow flex items-center justify-center bg-gray-600 rounded p-2">
      <h1 class="font-black text-3xl">Shop</h1>
    </div>

    <div class="flex flex-col gap-2">
      <Button>Sell all brains</Button>

      <div class="grid grid-cols-2 gap-2">
        <Button>Display: All</Button>
        <Button>Buy: x1</Button>
      </div>
    </div>
  </div>

  <div class="h-full overflow-y-scroll grid md:grid-cols-2 lg:grid-cols-3 gap-2 pr-2">
    {#each {length: 20} as _, i}
      <div class="rounded block bg-gray-800 h-24 p-2">
        <span class="text-gray-500">{i}</span>
      </div>
    {/each}
  </div>
</div>
