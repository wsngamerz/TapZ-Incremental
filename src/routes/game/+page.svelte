<script lang="ts">
  import { gameModel, updateGameModel } from "$lib/store";
  import { startGame } from "$lib/game";
  import Header from "../../components/header.svelte";
  import Zombie from "../../components/zombie.svelte";

  startGame();

  let damageIndicators: HTMLElement;

  const clickHandler = (event: MouseEvent) => {
    const damage = $gameModel.attack();
    if (damage > 0) damageIndicator(event.clientX, event.clientY, damage);
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
</script>

<div class="flex flex-col w-full h-full">
  <Header />

  <main class="flex-grow flex items-center justify-center overflow-hidden">
    <Zombie on:click={clickHandler} />
  </main>

  <div class="indicators" bind:this={damageIndicators}></div>
</div>