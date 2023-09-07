<script lang="ts">
  export let value: number;
  export let colour: "red" | "yellow" | "green" | "blue";

  const variants = {
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
  };
</script>

<div class="w-full bg-gray-900 rounded h-10 p-1">
  <div class="{variants[colour]} h-full rounded-sm transition-[width] duration-75 ease-out" style="width: {value}%"></div>
</div>