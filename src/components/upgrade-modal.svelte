<script lang="ts">
  import type { Upgrade } from "$lib/upgrades/upgrade";

  import Modal from "./ui/modal.svelte";
  import Button from "./ui/button.svelte";
  import { UpgradeType } from "$lib/upgrades/upgradeType";
  import { PlayerUpgrade } from "$lib/upgrades/playerUpgrade";
  import { gameManager } from "$lib/store";

  export let showModal = false;
  export let upgrade: Upgrade;

  let upgradeTypeStyles = {
    DPC: "bg-red-800",
    DPS: "bg-blue-800",
    MULTI: "bg-green-800"
  }[UpgradeType[upgrade.type]];

  let isPlayerUpgrade = upgrade instanceof PlayerUpgrade;
</script>

<Modal bind:showModal>
  <span slot="header">{upgrade.name}</span>

  <div class="space-y-2">
    <div class="flex gap-2 bg-gray-600 p-2 rounded-lg">
      <div class="inline-block p-2 bg-gray-800 rounded-lg">
        <svelte:component this={upgrade.icon} class={`w-32 h-32 ${upgradeTypeStyles} rounded p-1`} />
      </div>

      <div class="flex-grow text-gray-300">
        <p>Level: <span>{upgrade.getCount()}</span></p>
        {#if isPlayerUpgrade}
          <p>Base DPC: <span>{upgrade.dpc} (+{upgrade.getBaseDpc() - upgrade.dpc})</span></p>
          <p>Total DPC: <span>{upgrade.getDpc()}</span></p>
        {/if}

        <h3 class="text-white text-lg pt-2">Description</h3>
        <p>{upgrade.description}</p>
      </div>

      <div class="flex flex-col">
        <Button type="yellow"
                on:click={() => upgrade.buy()}
                disabled="{$gameManager.saveData.resources.money < upgrade.getCost()}">
          Upgrade £{upgrade.getCost()}
        </Button>

        {#if isPlayerUpgrade}
          <span class="text-sm text-gray-300 py-1">Increases damage by +{upgrade.getBaseDpc()}</span>
        {/if}
      </div>
    </div>

    {#if isPlayerUpgrade}
      <div>
        <h3 class="text-white text-lg">Items</h3>

        {#if upgrade.items.length === 0}
          <p class="text-gray-400">No items available</p>
        {:else}
          <div class="grid gap-2 grid-cols-1 lg:grid-cols-2">
            {#each upgrade.items as playerUpgrade}
              <div class={`flex gap-2 bg-gray-800 p-2 rounded ${playerUpgrade.has() && "bg-opacity-70"}`}>
                <svelte:component this={playerUpgrade.icon} class="w-16 h-16 bg-gray-900 p-2 rounded" />

                <div class="flex-grow">
                  <h4>{playerUpgrade.name}</h4>
                  <p class="text-gray-400 text-sm">{playerUpgrade.description}</p>
                </div>

                <div>
                  {#if playerUpgrade.has()}
                    <div class="text-gray-400">
                      Bought
                    </div>
                  {:else}
                    <Button type="yellow"
                            on:click={() => playerUpgrade.buy()}
                            disabled="{$gameManager.saveData.resources.money < playerUpgrade.cost}">
                      Buy £{playerUpgrade.cost}
                    </Button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Modal>