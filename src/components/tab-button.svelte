<script lang="ts">
import type { ComponentType } from "svelte";

export let active = false;
export let icon: ComponentType | undefined = undefined;
</script>

<button on:click class={`flex-grow p-1 rounded rounded-b-none ${active ? "bg-gray-700" : "bg-[#2B3546]"}`}>
  <span class={`flex items-center justify-center ${active ? "bg-gray-500" : "bg-gray-600"} p-2 rounded-sm`}>
    <svelte:component this={icon} class="text-gray-300" />
  </span>
</button>