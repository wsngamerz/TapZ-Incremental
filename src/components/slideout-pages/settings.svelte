<script>
  import Button from "../ui/button.svelte";

  const resetData = () => {
    localStorage.clear();
    location.reload();
  };
</script>

<div class="w-full h-full overflow-y-auto">
    <div class="flex-grow flex items-center justify-center bg-gray-600 rounded p-2">
      <h1 class="font-black text-3xl">Settings</h1>
    </div>

    <Button on:click={resetData}>Reset data</Button>
</div>
