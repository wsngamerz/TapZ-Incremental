<script>
  import "../app.css";
</script>

<slot />

<style lang="postcss">
    :global(html) {
        color: theme(colors.gray.100);
        background-color: theme(colors.gray.800);
    }
</style>