<script lang="ts">
  import { gameManager } from "$lib/store.js";

  let zombie: HTMLElement;

  const hueClasses = [
    "hue-rotate-0",
    "hue-rotate-30",
    "hue-rotate-90",
    "hue-rotate-180"
  ];

  $: {
    if (zombie) {
      if ($gameManager.saveData.zombie.health <= 0) {
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
</script>

<div role="button" tabindex="0"
     on:pointerdown on:keypress={e => e.key === "Enter" && e.target?.click()}
     class="transition duration-200 hover:ease-out ease-in hover:scale-110"
     on:mouseup={e => e.preventDefault()}>
  <div bind:this={zombie} class="zombie" />
</div>