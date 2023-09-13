<script lang="ts">
  import { BrainIcon, CoinsIcon, CrossIcon, ShieldIcon } from "lucide-svelte";
  import Progress from "./ui/progress.svelte";
  import { gameModel } from "$lib/store.js";

  $: healthPercentage = $gameModel.saveData.health / $gameModel.saveData.maxHealth * 100;
  $: experiencePercentage = $gameModel.saveData.experience / $gameModel.saveData.maxExperience * 100;

  // perform number formatting
  $: healthContent = `${$gameModel.saveData.health}/${$gameModel.saveData.maxHealth} hp`;
  $: experienceContent = `${$gameModel.saveData.experience} xp`;
  $: levelContent = `${$gameModel.saveData.level}`;
  $: brainsContent = `${$gameModel.saveData.brains}`;
  $: moneyContent = `${$gameModel.saveData.money}`;
</script>

<header class="block w-full space-y-2 p-1.5 max-w-4xl mx-auto">
  <div class="flex gap-2">
    <Progress iconText={levelContent} icon={ShieldIcon} content={experienceContent} value={experiencePercentage}
              colour="blue" />
    <Progress icon={BrainIcon} content={brainsContent} colour="green" />
    <Progress icon={CoinsIcon} content={moneyContent} colour="yellow" />
  </div>

  <Progress icon={CrossIcon}
            value={healthPercentage}
            colour="red"
            content={healthContent} />
</header>