<script lang="ts">
  import Progress from "../../components/ui/progress.svelte";
  import { SettingsIcon, MedalIcon, ShieldIcon, CrossIcon, BrainIcon, CoinsIcon } from "lucide-svelte";
  import { attack, brains, experience, health, level, maxExperience, maxHealth, money } from "$lib/store";

  $: healthPercentage = $health / $maxHealth * 100;
  $: experiencePercentage = $experience / $maxExperience * 100 ;

  // perform number formatting
  $: healthContent = `${$health}/${$maxHealth} hp`;
  $: experienceContent = `${$experience} xp`;
  $: levelContent = `${$level}`;
  $: brainsContent = `${$brains}`;
  $: moneyContent = `${$money}`;

  let damageIndicators: HTMLElement;

  const clickHandler = (event: MouseEvent) => {
    damageIndicator(event.clientX, event.clientY);

    health.update((n: number) => n - $attack);

    if ($health === 0) {
      health.set($maxHealth);

      brains.update((n: number) => n + 1);
      experience.update((n: number) => n + 1);
    }

    if ($experience === $maxExperience) {
      experience.set(0);
      maxExperience.update((n: number) => n + 1);
      level.update((n: number) => n + 1);
    }
  };

  const damageIndicator = (x: number, y: number) => {
    console.log(x,y)

    const indicator = document.createElement("div");
    indicator.classList.add("damage-indicator");
    indicator.style.setProperty("--x", `${x}px`);
    indicator.style.setProperty("--y", `${y}px`);
    indicator.innerText = `-${$attack}`;
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
         on:click={clickHandler}>
      <div class="zombie"/>
    </div>
  </main>

  <div class="indicators" bind:this={damageIndicators}></div>
</div>