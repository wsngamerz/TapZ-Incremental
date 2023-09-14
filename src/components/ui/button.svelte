<script lang="ts">
  export let type: "blue" | "red" | "green" | "yellow" = "blue";

  const buttonVariant = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700",
  }[type];
</script>

<button on:click class={`block px-2 py-1 rounded text-white transition duration-100 ${buttonVariant}`}>
  <slot />
</button>