<script lang="ts">
  import { gameModel, updateGameModel } from "$lib/store";
  import { startGame } from "$lib/game";
  import Slideout from "../../components/slideout.svelte";
  import Header from "../../components/header.svelte";
  import Zombie from "../../components/zombie.svelte";
  import { onMount } from "svelte";

  let damageIndicators: HTMLElement;

  const clickHandler = (event: MouseEvent) => {
    const damage = $gameModel.attack();
    if (damage > 0) {
      $gameModel.click();
      damageIndicator(event.clientX, event.clientY, damage);
    }
    updateGameModel();
  };

  const damageIndicator = (x: number, y: number, damage: number) => {
    const indicator = document.createElement("div");
    indicator.classList.add("damage-indicator");
    indicator.style.setProperty("--x", `${x}px`);
    indicator.style.setProperty("--y", `${y}px`);
    indicator.innerText = `-${damage}`;
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
      <Zombie on:click={clickHandler} />
    </main>

    <Slideout />

    <div class="indicators" bind:this={damageIndicators}></div>
</div>