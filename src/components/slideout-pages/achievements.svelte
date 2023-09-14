<script lang="ts">
  import Layout from "./layout.svelte";
  import AchievementItem from "../achievement-item.svelte";
  import { BeanIcon, HeartPulseIcon, SkullIcon } from "lucide-svelte";
</script>

<Layout>
  <span slot="title">Achievements</span>

  <div class="grid md:grid-cols-2 gap-2">
    <AchievementItem name="Undefined Bean" description="????" icon="{BeanIcon}" status={25} />
    <AchievementItem name="Murderous instinct" description="Kill 500 zombies" icon="{SkullIcon}" status={56} />
    <AchievementItem name="Questionable habits" description="Click 10k times" icon="{HeartPulseIcon}" status={86} />
  </div>
</Layout>