<script lang="ts">
  import {
    BrainCircuitIcon,
    CurrencyIcon,
    FlaskConicalIcon,
    GrabIcon,
    SwordIcon,
    SwordsIcon,
    UtensilsIcon
  } from "lucide-svelte";

  import { gameModel } from "$lib/store.js";

  import Button from "../ui/button.svelte";
  import Layout from "./layout.svelte";
  import ShopItem from "../shop-item.svelte";

  const handleSellAll = () => {
    $gameModel.sellBrains();
  };

  let currentBuy = 1;
  let supportedBuys = [1, 10, 100, 1000, -1];

  let currentDisplay = "all";
  let supportedDisplays = ["all", "dpc", "dps", "multi"];

  const handleBuyCountToggle = () => {
    currentBuy = supportedBuys[(supportedBuys.indexOf(currentBuy) + 1) % supportedBuys.length];
  };

  const handleDisplayToggle = () => {
    currentDisplay = supportedDisplays[(supportedDisplays.indexOf(currentDisplay) + 1) % supportedDisplays.length];
  };
</script>


<Layout>
  <span slot="title">Shop</span>

  <div slot="extra" class="flex flex-col gap-2 min-w-[250px]">
    <Button type="green" on:click={handleSellAll}>Sell all brains</Button>

    <div class="grid grid-cols-2 gap-2">
      <Button on:click={handleDisplayToggle}>
        <span class="capitalize">
            Display: {currentDisplay}
        </span>
      </Button>
      <Button on:click={handleBuyCountToggle}>Buy: {(currentBuy === -1 ? "MAX" : `x${currentBuy}`)}</Button>
    </div>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
    {#if currentDisplay === "all" || currentDisplay === "dpc"}
      <ShopItem icon="{GrabIcon}" name="Fists" extra="+1 dmg" type="DPC" />
      <ShopItem icon="{UtensilsIcon}" name="Kitchen Set" extra="+3 dmg" type="DPC" />
      <ShopItem icon="{SwordIcon}" name="Spicy Sword" extra="+7 dmg" type="DPC" />
    {/if}

    {#if currentDisplay === "all" || currentDisplay === "dps"}
      <ShopItem icon="{SwordsIcon}" name="Militia" extra="+2 dmg/s" type="DPS" />
      <ShopItem icon="{CurrencyIcon}" name="Turret" extra="+5 dmg/s" type="DPS" />
    {/if}

    {#if currentDisplay === "all" || currentDisplay === "multi"}
      <ShopItem icon="{BrainCircuitIcon}" name="Enhanced Brains" extra="+50% brain value" type="Multi" />
      <ShopItem icon="{FlaskConicalIcon}" name="Scientific Extraction" extra="+1 brain/kill" type="Multi" />
    {/if}
  </div>
</Layout>