<script>
  import Button from "../ui/button.svelte";
  import Layout from "./layout.svelte"

  const resetData = () => {
    localStorage.clear();
    location.reload();
  };
</script>


<Layout>
  <span slot="title">Settings</span>

  <Button on:click={resetData}>Reset data</Button>
</Layout>
