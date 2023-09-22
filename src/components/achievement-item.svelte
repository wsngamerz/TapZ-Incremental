<script lang="ts">
  import type { ComponentType } from "svelte";

  import Progress from "../components/ui/progress.svelte";

  export let icon: ComponentType;
  export let name: string;
  export let description: string;
  export let status: number;

</script>

<div class="rounded flex gap-2 bg-gray-800 p-2">
  {#if icon}
    <div class="flex items-center justify-center p-2 bg-gray-600 rounded aspect-square shrink-0 grow-0">
      <svelte:component this={icon} class="w-14 h-14" />
    </div>
  {/if}

  <div class="flex flex-col flex-grow justify-between text-gray-500 text-sm">
    <div>
      <h2 class="text-gray-200">{name}</h2>
      <h3>{description || ""}</h3>
    </div>
    <div class="flex flex-col items-end gap-1">
      <Progress value={status} colour="green" type="light" />
      <span>{status}%</span>
    </div>
  </div>
</div>