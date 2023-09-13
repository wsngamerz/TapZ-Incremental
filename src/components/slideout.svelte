<script lang="ts">
  import {
    BarChartIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    MedalIcon,
    SettingsIcon,
    ShoppingCartIcon,
    TrophyIcon
  } from "lucide-svelte";
  import TabButton from "./tab-button.svelte";

  enum Tabs {
    Shop,
    Achievements,
    Leaderboards,
    Stats,
    Settings
  }

  let slideoutElement: HTMLElement;
  let slideoutOpen = false;
  let activeTab: Tabs = Tabs.Shop;

  const toggleSlideout = () => {
    slideoutOpen = !slideoutOpen;
    if (slideoutOpen) slideoutElement.classList.add("slideout-open");
    else slideoutElement.classList.remove("slideout-open");
  };

  const setActiveTab = (tab: Tabs) => {
    if (!slideoutOpen || (activeTab === tab && slideoutOpen)) toggleSlideout();

    activeTab = tab;
  };
</script>

<div bind:this={slideoutElement} class="slideout">
  <div class="block w-full max-w-4xl mx-auto">
    <div class="flex items-end w-full gap-1">
      <TabButton on:click={() => setActiveTab(Tabs.Shop)}
                 active={activeTab === Tabs.Shop}
                 icon={ShoppingCartIcon} />
      <TabButton on:click={() => setActiveTab(Tabs.Achievements)}
                 active={activeTab === Tabs.Achievements}
                 icon={TrophyIcon} />
      <TabButton on:click={() => setActiveTab(Tabs.Leaderboards)}
                 active={activeTab === Tabs.Leaderboards}
                 icon={MedalIcon} />
      <TabButton on:click={() => setActiveTab(Tabs.Stats)}
                 active={activeTab === Tabs.Stats}
                 icon={BarChartIcon} />
      <TabButton on:click={() => setActiveTab(Tabs.Settings)}
                 active={activeTab === Tabs.Settings}
                 icon={SettingsIcon} />

      <button on:click={toggleSlideout} class="bg-gray-700 rounded rounded-b-none px-2 py-1">
        {#if slideoutOpen}
          <ChevronDownIcon class="text-gray-300"/>
        {:else}
          <ChevronUpIcon class="text-gray-300"/>
        {/if}
      </button>
    </div>

    <div class="bg-gray-700 p-2 h-96">
      {#if activeTab === Tabs.Shop}
        <span>Shop</span>
      {:else if activeTab === Tabs.Achievements}
        <span>Achievements</span>
      {:else if activeTab === Tabs.Leaderboards}
        <span>Leaderboards</span>
      {:else if activeTab === Tabs.Stats}
        <span>Stats</span>
      {:else if activeTab === Tabs.Settings}
        <span>Settings</span>
      {/if}
    </div>
  </div>
</div>