<script lang="ts">
  import { onMount } from "svelte";
  import { gameManager, updateGameManager } from "$lib/store";
  import { formatNumber } from "$lib/utils";
  import { startGame } from "$lib/game";

  import Slideout from "../../components/slideout.svelte";
  import Header from "../../components/header.svelte";
  import Zombie from "../../components/zombie.svelte";

  let damageIndicators: HTMLElement;

  const pointerHandler = (event: PointerEvent) => {
    const damage = $gameManager.attack();
    if (damage > 0)
      damageIndicator(event.clientX, event.clientY, damage);

    updateGameManager();
  };

  const damageIndicator = (x: number, y: number, damage: number) => {
    const indicator = document.createElement("div");
    indicator.classList.add("damage-indicator");
    indicator.style.setProperty("--x", `${x}px`);
    indicator.style.setProperty("--y", `${y}px`);
    indicator.innerText = `-${formatNumber(damage)}`;
    damageIndicators.appendChild(indicator);

    setTimeout(() => indicator.remove(), 1_000);
  };

  onMount(() => {
    startGame();
  });
</script>

<div class="relative flex flex-col w-full h-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
  <Header />

  <main class="flex-grow flex items-center justify-center overflow-hidden">
    <Zombie on:pointerdown={pointerHandler} />
  </main>

  <Slideout />

  <div class="indicators" bind:this={damageIndicators}></div>
</div>