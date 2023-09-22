<script lang="ts">
  import type { ComponentType } from "svelte";

  export let value: number = 100;
  export let colour: "red" | "yellow" | "green" | "blue";
  export let icon: ComponentType | undefined = undefined;
  export let content: string | undefined = undefined;
  export let iconText: string | undefined = undefined;
  export let type: "light" | undefined = undefined;


  const variants = {
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
  };
</script>

<div class={`flex gap-1 w-full bg-gray-900 rounded h-12 p-1 ${type === "light" && "h-3 p-1"}`}>
  {#if icon}
    <div class="relative h-full rounded aspect-square {variants[colour]} flex items-center justify-center">
      <svelte:component this="{icon}" class="text-white w-8 h-8" />
      {#if iconText}
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">{iconText}</span>
      {/if}
    </div>
  {/if}

  <div class="relative w-full">
    <div class="{variants[colour]} h-full rounded-sm transition-[width] duration-75 ease-out" style="width: {value}%"></div>

    {#if content}
      <div class="absolute rounded mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-lg">
        {content}
      </div>
    {/if}
  </div>

</div>