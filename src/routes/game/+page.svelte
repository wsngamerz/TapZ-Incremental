<script lang="ts">
  import Progress from "../../components/ui/progress.svelte";
  import { SettingsIcon, MedalIcon, ShieldIcon, CrossIcon, BrainIcon, CoinsIcon } from "lucide-svelte";
  import { gameModel, updateGameModel } from "$lib/store";
  import { startGame } from "$lib/game";

  startGame();

  $: healthPercentage = $gameModel.saveData.health / $gameModel.saveData.maxHealth * 100;
  $: experiencePercentage = $gameModel.saveData.experience / $gameModel.saveData.maxExperience * 100 ;

  // perform number formatting
  $: healthContent = `${$gameModel.saveData.health}/${$gameModel.saveData.maxHealth} hp`;
  $: experienceContent = `${$gameModel.saveData.experience} xp`;
  $: levelContent = `${$gameModel.saveData.level}`;
  $: brainsContent = `${$gameModel.saveData.brains}`;
  $: moneyContent = `${$gameModel.saveData.money}`;

  let zombie: HTMLElement;
  let damageIndicators: HTMLElement;

  const hueClasses = [
    "hue-rotate-0",
    "hue-rotate-30",
    "hue-rotate-90",
    "hue-rotate-180",
  ]

  $: {
    if (zombie) {
      if ($gameModel.saveData.health <= 0) {
        zombie.classList.add("dead");
        zombie.classList.remove(...hueClasses);
      } else {
        zombie.classList.remove("dead");

        // add a random hue class to the zombie if there is no hue* class already
        if (!hueClasses.some(hueClass => zombie.classList.contains(hueClass))) {
          zombie.classList.add(hueClasses[Math.floor(Math.random() * hueClasses.length)]);
        }
      }
    }
  }

  const clickHandler = (event: MouseEvent) => {
    const damage = $gameModel.attack();
    if (damage > 0) damageIndicator(event.clientX, event.clientY, damage);

    if ($gameModel.saveData.experience === $gameModel.saveData.maxExperience) {
      $gameModel.levelUp();
    }

    updateGameModel();
  };

  const damageIndicator = (x: number, y: number, damage:  number) => {
    const indicator = document.createElement("div");
    indicator.classList.add("damage-indicator");
    indicator.style.setProperty("--x", `${x}px`);
    indicator.style.setProperty("--y", `${y}px`);
    indicator.innerText = `-${damage}`;
    damageIndicators.appendChild(indicator);

    setTimeout(() => {
      indicator.remove();
    }, 1_000);
  }
</script>

<div class="flex flex-col w-full h-full">
  <header class="block w-full space-y-2 p-1.5 max-w-4xl mx-auto">
    <div class="flex gap-2">
      <Progress iconText={levelContent} icon={ShieldIcon} content={experienceContent} value={experiencePercentage} colour="blue" />
      <Progress icon={BrainIcon} content={brainsContent} colour="green" />
      <Progress icon={CoinsIcon} content={moneyContent} colour="yellow" />
    </div>

    <div class="flex gap-2">
      <div class="h-14 aspect-square p-2 bg-gray-900 rounded">
        <MedalIcon class="h-full w-full" />
      </div>

      <Progress icon={CrossIcon}
                value={healthPercentage}
                colour="red"
                content={healthContent}/>

      <div class="h-14 aspect-square p-1.5 bg-gray-900 rounded">
        <SettingsIcon class="h-full w-full" />
      </div>
    </div>
  </header>

  <main class="flex-grow flex items-center justify-center overflow-hidden">
    <div class="transition duration-200 hover:ease-out ease-in hover:scale-110"
         on:click={clickHandler}
         on:mouseup={e => e.preventDefault()}>
      <div bind:this={zombie} class="zombie"/>
    </div>
  </main>

  <div class="indicators" bind:this={damageIndicators}></div>
</div>