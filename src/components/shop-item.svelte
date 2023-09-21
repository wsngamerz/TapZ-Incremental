<script lang="ts">
  import type { Upgrade } from "$lib/upgrades/upgrade";
  import { UpgradeType } from "$lib/upgrades/upgradeType";
  import { PlayerUpgrade } from "$lib/upgrades/playerUpgrade";
  import { gameManager } from "$lib/store";

  import Button from "./ui/button.svelte";
  import UpgradeModal from "./upgrade-modal.svelte";

  export let upgrade: Upgrade;

  let showModal = false;

  let type = UpgradeType[upgrade.type];
  let name = upgrade.name;
  let extra = upgrade.description;
  let icon = upgrade.icon;

  let upgradeTypeStyles = {
    DPC: "bg-red-800",
    DPS: "bg-blue-800",
    MULTI: "bg-green-800"
  }[type];

  $: canAfford = $gameManager.saveData.resources.money >= cost;
  $: level = upgrade.getCount();
  let cost = upgrade.getCost();

  $: glintClass = [
    "",
    "rare",
    "epic",
    "legendary"
    // ][level > 0 ? (Math.round(Math.random() * 4)) : 0];
  ][0];

  const buyItem = (e) => {
    if (canAfford) {
      upgrade.buy();
    }

    cost = upgrade.getCost();

    e.stopPropagation();
  };

  const handleUpgradeClick = () => {
    showModal = true;
  };
</script>

<UpgradeModal upgrade="{upgrade}" bind:showModal />

<div class={`upgrade-glint ${glintClass}`} on:click={handleUpgradeClick}>
  <div class={`rounded flex gap-2 bg-gray-800 p-2 ${level === 0 ? "bg-opacity-70" : ""}`}>
    {#if icon}
      <div class={`block p-2 rounded aspect-square ${upgradeTypeStyles}`}>
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
        <div class="flex gap-1">
          {#if upgrade instanceof PlayerUpgrade}
            {#each upgrade.items as playerUpgrade}
              <div class={`flex justify-between aspect-square bg-gray-900 p-1 rounded ${playerUpgrade.has() && "border border-yellow-600 text-gray-400 bg-opacity-30"}`}>
                <svelte:component this={playerUpgrade.icon} class="w-4 h-4" />
              </div>
            {/each}
          {/if}
        </div>

        <Button type="yellow" disabled="{!canAfford}" on:click={buyItem}>£{cost}</Button>
      </div>
    </div>
  </div>
</div>