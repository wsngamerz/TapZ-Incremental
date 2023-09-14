<script>
  import {
    BrainCircuitIcon,
    CurrencyIcon,
    FlaskConicalIcon,
    GrabIcon,
    SwordIcon,
    SwordsIcon,
    UtensilsIcon
  } from "lucide-svelte";

  import Button from "../ui/button.svelte";
  import Layout from "./layout.svelte";
  import ShopItem from "../shop-item.svelte";
</script>


<Layout>
  <span slot="title">Shop</span>

  <div slot="extra" class="flex flex-col gap-2">
    <Button type="green">Sell all brains</Button>

    <div class="grid grid-cols-2 gap-2">
      <Button>Display: All</Button>
      <Button>Buy: x1</Button>
    </div>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
    <ShopItem icon="{GrabIcon}" name="Fists" extra="+1 dmg" type="DPC" />
    <ShopItem icon="{UtensilsIcon}" name="Kitchen Set" extra="+3 dmg" type="DPC" />
    <ShopItem icon="{SwordIcon}" name="Spicy Sword" extra="+7 dmg" type="DPC" />

    <ShopItem icon="{SwordsIcon}" name="Militia" extra="+2 dmg/s" type="DPS" />
    <ShopItem icon="{CurrencyIcon}" name="Turret" extra="+5 dmg/s" type="DPS" />

    <ShopItem icon="{BrainCircuitIcon}" name="Enhanced Brains" extra="+50% brain value" type="Multi" />
    <ShopItem icon="{FlaskConicalIcon}" name="Scientific Extraction" extra="+1 brain/kill" type="Multi" />
  </div>
</Layout>