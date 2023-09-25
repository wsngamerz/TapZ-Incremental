<script lang="ts">
  import Layout from "./layout.svelte";
  import AchievementItem from "../achievement-item.svelte";
  import { gameManager } from "$lib/store";
</script>

<Layout>
  <span slot="title">Achievements</span>

  <div class="grid md:grid-cols-2 gap-2">
    {#each $gameManager.achievementManager.getAchievements() as achievement}
      <AchievementItem achievement="{achievement}" />
    {/each}
  </div>
</Layout>