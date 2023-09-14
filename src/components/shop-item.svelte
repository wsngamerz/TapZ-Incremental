<script lang="ts">
  import type { ComponentType } from "svelte";
  import Button from "./ui/button.svelte";

  export let name: string;
  export let extra: string;
  export let type: "DPC" | "DPS" | "Multi";
  export let icon: ComponentType;

  let badgeVariant = {
    DPC: "bg-red-700",
    DPS: "bg-blue-700",
    Multi: "bg-green-700"
  }[type];

</script>

<div class="rounded flex gap-2 bg-gray-800 p-2">
  {#if icon}
    <div class="block p-2 bg-gray-600 rounded aspect-square shrink-0 grow-0">
      <svelte:component this={icon} class="w-12 h-12" />
    </div>
  {/if}

  <div class="flex-grow text-gray-500 text-sm">
    <div class="flex justify-between">
      <h2 class="text-gray-200">{name}</h2>
      <span>Level: 0</span>
    </div>
    <h3>{extra || ""}</h3>
    <div class="flex justify-between items-end">
      <span class={`font-extralight text-gray-200 text-xs px-3 py-0.5 inline-block rounded-full ${badgeVariant}`}>
        {type}
      </span>
      <Button type="yellow">Buy</Button>
    </div>
  </div>
</div>