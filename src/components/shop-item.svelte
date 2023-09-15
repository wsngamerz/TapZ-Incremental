<script lang="ts">
  import Button from "./ui/button.svelte";
  import { DPS_UPGRADES } from "$lib/data";
  import { gameModel } from "$lib/store";

  export let id: string;
  export let type: "DPC" | "DPS" | "Multi";

  let badgeVariant = {
    DPC: "bg-red-700",
    DPS: "bg-blue-700",
    Multi: "bg-green-700"
  }[type];

  let upgrade: Upgrade | undefined;
  switch (type) {
    case "DPS":
      upgrade = DPS_UPGRADES.find(u => u.id === id);
      break;

    default:
      upgrade = null;
      break;
  }

  let name = upgrade?.name || "Unknown"
  let extra = upgrade?.description || "Unknown";
  let icon = upgrade?.icon || null;

  $: canAfford = $gameModel.saveData.resources.money >= cost;
  $: level = $gameModel.saveData.upgrades[id].level || 0;
  let cost = upgrade?.getCost() || 0;

  const buyItem = () => {
    if (canAfford) {
      upgrade?.buy();
    }

    cost = upgrade?.getCost() || 0;
  }
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
      <span>Level: {level}</span>
    </div>
    <h3>{extra}</h3>
    <div class="flex justify-between items-end">
      <span class={`font-extralight text-gray-200 text-xs px-3 py-0.5 inline-block rounded-full ${badgeVariant}`}>
        {type}
      </span>
      <Button type="yellow" disabled="{!canAfford}" on:click={buyItem}>£{cost}</Button>
    </div>
  </div>
</div>