<script lang="ts">
  import type { ComponentType } from "svelte";

  export let text: string;
  export let href: string;
  export let icon: ComponentType;
</script>

<a href="{href}" class="flex flex-col gap-1 flex-shrink-0 flex-grow-0 bg-gray-600 aspect-square overflow-hidden rounded-sm p-2 text-center">
  <svelte:component this="{icon}" class="flex-grow w-full" />
  <span class="text-sm font-light">{text}</span>
</a>