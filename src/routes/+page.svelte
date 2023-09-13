<script>
  import NavButton from "../components/nav-button.svelte";

  import { AwardIcon, GlobeIcon, SettingsIcon, ShareIcon, ShieldIcon } from "lucide-svelte";
  import { VERSION } from "$lib/game";
</script>

<main class="w-full h-full grid grid-rows-[auto_100px] overflow-hidden">
  <div class="flex flex-col gap-16 items-center justify-center">
    <div class="flex flex-col items-end w-fit">
      <h1 class="text-9xl font-black">TapZ</h1>
      <span>{VERSION}</span>
    </div>

    <a href="/game" class="bg-green-700 px-12 py-3 rounded-sm font-black">Play</a>
  </div>

  <nav class="bg-gray-900 flex gap-2 p-2 justify-center overflow-x-auto">
    <NavButton icon="{ShareIcon}" href="/share" text="Share" />
    <NavButton icon="{AwardIcon}" href="/medals" text="Medals" />
    <NavButton icon="{ShieldIcon}" href="/ranking" text="Ranking" />
    <NavButton icon="{SettingsIcon}" href="/settings" text="Settings" />
    <NavButton icon="{GlobeIcon}" href="https://williamneild.com" text="Website" />
  </nav>
</main>