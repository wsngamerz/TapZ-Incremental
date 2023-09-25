<script lang="ts">
  import { VERSION } from "$lib/data";
  import { gameManager } from "$lib/store.js";

  import { BrainIcon, CoinsIcon, CrossIcon, ShieldIcon } from "lucide-svelte";
  import Progress from "./ui/progress.svelte";
  import { formatNumber } from "$lib/utils";

  $: healthPercentage = $gameManager.saveData.zombie.health / $gameManager.saveData.zombie.maxHealth * 100;
  $: experiencePercentage = $gameManager.saveData.experience / $gameManager.saveData.maxExperience * 100;

  // perform number formatting
  $: healthContent = `${formatNumber($gameManager.saveData.zombie.health)}/${formatNumber($gameManager.saveData.zombie.maxHealth)} hp`;
  $: experienceContent = `${formatNumber($gameManager.saveData.experience)} xp`;
  $: levelContent = `${formatNumber($gameManager.saveData.level)}`;
  $: brainsContent = `${formatNumber($gameManager.saveData.resources.brains)}`;
  $: moneyContent = `${formatNumber($gameManager.saveData.resources.money)}`;
</script>

<header class="block w-full space-y-2 p-1.5">
  <div class="flex gap-2">
    <Progress iconText={levelContent} icon={ShieldIcon} content={experienceContent} value={experiencePercentage} colour="blue" />
    <Progress icon={BrainIcon} content={brainsContent} colour="green" />
    <Progress icon={CoinsIcon} content={moneyContent} colour="yellow" />
  </div>

  <Progress icon={CrossIcon}
            value={healthPercentage}
            colour="red"
            content={healthContent} />

  <span class="absolute text-gray-600 text-xs">TapZ {VERSION}</span>
</header>