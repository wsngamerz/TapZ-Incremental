<script lang="ts">
  import { onMount } from "svelte";
  import { gameManager, updateGameManager } from "$lib/store";
  import { formatNumber } from "$lib/utils";
  import { startGame } from "$lib/game";

  import Slideout from "../../components/slideout.svelte";
  import Header from "../../components/header.svelte";
  import Zombie from "../../components/zombie.svelte";
  import { browser } from "$app/environment";

  let gameWindow: HTMLElement;
  let loadingIndicator: HTMLElement;
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
    const start = Date.now();
    startGame();
    const end = Date.now();

    const duration = end - start;
    console.log(`Game started in ${duration}ms`);
    loadingIndicator.remove();

    if (browser) {
      // Fade in the game window after the game has started with slight delay
      setTimeout(() => gameWindow.classList.remove("opacity-0"), Math.max(0, 200 - duration));
    }
  });
</script>

<div bind:this={gameWindow} class="game-window opacity-0">
  <Header />

  <main class="flex-grow flex items-center justify-center overflow-hidden">
    <Zombie on:pointerdown={pointerHandler} />
  </main>

  <Slideout />

  <div class="indicators" bind:this={damageIndicators}></div>
</div>

<div bind:this={loadingIndicator} class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
  <span class="font-mono font-black text-3xl">
    Loading...
  </span>
</div>