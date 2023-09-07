<script lang="ts">
  import Progress from "../../components/ui/progress.svelte";
  import { SettingsIcon, MedalIcon, ShieldIcon, CrossIcon, BrainIcon, CoinsIcon } from "lucide-svelte";
  import { health } from "$lib/store";

  $: healthPercentage = $health * 10;
  $: healthContent = `${$health}/10`;

  const clickHandler = () => {
    health.update((n: number) => n - 1);

    if ($health === 0) {
      health.set(10);
    }
  };
</script>

<div class="flex flex-col w-full h-full">
  <header class="block w-full space-y-2 p-2 max-w-4xl mx-auto">
    <div class="flex gap-2">
      <Progress icon={ShieldIcon} content="Lvl: 1" value={20} colour="blue" />
      <Progress icon={BrainIcon} content="1,042" colour="green" />
      <Progress icon={CoinsIcon} content="2,435" colour="yellow" />
    </div>

    <div class="flex gap-2">
      <div class="h-12 aspect-square p-2 bg-gray-900 rounded">
        <MedalIcon class="h-full w-full" />
      </div>

      <Progress icon={CrossIcon}
                value={healthPercentage}
                colour="red"
                content={healthContent}/>

      <div class="h-12 aspect-square p-2 bg-gray-900 rounded">
        <SettingsIcon class="h-full w-full" />
      </div>
    </div>
  </header>

  <main class="flex-grow flex items-center justify-center">

    <div class="transition duration-200 hover:ease-out ease-in hover:scale-110"
         on:click={clickHandler}>
      <div class="zombie"/>
    </div>
  </main>
</div>