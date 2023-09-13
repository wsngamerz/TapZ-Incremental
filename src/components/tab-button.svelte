<script lang="ts">
import type { ComponentType } from "svelte";

export let active = false;
export let icon: ComponentType | undefined = undefined;
</script>

<button on:click class={`flex-grow p-1 rounded rounded-b-none transition-all duration-200 ${active ? "bg-gray-700" : "bg-[#2B3546] pb-0"}`}>
  <span class={`flex items-center justify-center transition-all duration-200 ${active ? "bg-gray-500" : "bg-gray-600 rounded-b-none"} p-2 rounded-sm`}>
    <svelte:component this={icon} class="text-gray-300" />
  </span>
</button>