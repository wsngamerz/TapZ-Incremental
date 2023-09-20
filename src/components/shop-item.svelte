<script lang="ts">
  import Button from "./ui/button.svelte";
  import { gameModel } from "$lib/store";
  import { UpgradeType } from "$lib/upgrades/upgradeType";

  export let id: string;

  let upgrade = $gameModel.upgradeManager.getUpgradeById(id);
  let type = UpgradeType[upgrade?.type];
  let name = upgrade?.name || "Unknown";
  let extra = upgrade?.description || "Unknown";
  let icon = upgrade?.icon || null;

  let badgeVariant = {
    DPC: "bg-red-700",
    DPS: "bg-blue-700",
    MULTI: "bg-green-700"
  }[type];

  $: canAfford = $gameModel.saveData.resources.money >= cost;
  $: level = $gameModel.saveData.upgrades[id].level || 0;
  let cost = upgrade?.getCost() || 0;

  $: glintClass = [
    "",
    "rare",
    "epic",
    "legendary"
    // ][level > 0 ? (Math.round(Math.random() * 4)) : 0];
  ][0];

  const buyItem = () => {
    if (canAfford) {
      upgrade?.buy();
    }

    cost = upgrade?.getCost() || 0;
  };
</script>

<div class={`upgrade-glint ${glintClass}`}>
  <div class={`rounded flex gap-2 bg-gray-800 p-2 ${level === 0 ? "bg-opacity-70" : ""}`}>
    {#if icon}
      <div class="block p-2 bg-gray-600 rounded aspect-square">
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
</div>