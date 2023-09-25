<script lang="ts">
  import type Achievement from "$lib/achievements/achievement";

  import Progress from "../components/ui/progress.svelte";

  export let achievement: Achievement;

  $: progress = achievement.calculateProgress();
</script>

<div class="rounded flex gap-2 bg-gray-800 p-2">
  <div class={`flex items-center justify-center p-2 bg-gray-600 rounded aspect-square shrink-0 grow-0 ${(progress === 100) ? "border border-amber-400": ""}`}>
    <svelte:component this={achievement.icon} class="w-14 h-14" />
  </div>

  <div class="flex flex-col flex-grow justify-between text-gray-500 text-sm">
    <div>
      <h2 class="text-gray-200">{achievement.name}</h2>
      <h3>{achievement.description}</h3>
    </div>
    <div class="flex flex-col items-end gap-1">
      <Progress value={progress} colour="green" type="light" />
      <span>{progress}%</span>
    </div>
  </div>
</div>