<script lang="ts">
  import { XIcon } from "lucide-svelte";

  export let showModal;

  let dialog;

  $: if (dialog && showModal) dialog.showModal();
</script>

<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="w-full max-h-[70vh] max-w-4xl bg-transparent text-white"
>
  <div on:click|stopPropagation>
    <div class="flex justify-between items-end">
      <div class="text-xl bg-gray-700 rounded-t px-1 pt-1">
        <h2 class="bg-gray-600 flex flex-1 px-4 py-2 rounded-sm">
          <slot name="header" />
        </h2>
      </div>

      <button class="bg-gray-700 px-4 h-8 rounded-t" autofocus on:click={() => dialog.close()}>
        <XIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="bg-gray-700 p-4 rounded-b">
      <slot />
    </div>
  </div>
</dialog>

<style>
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes fade {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
  }

  dialog[open] {
      animation: zoom 0.1s ease-in;
  }

  dialog[open]::backdrop {
      animation: fade 0.2s ease-in;
  }

</style>