<script lang="ts" generics="T">
    import AbstractMatrix from './AbstractMatrix.svelte';

    let { values }: { values: T[][] } = $props()
</script>

<AbstractMatrix {values}>
    {#snippet children(value)}
        {value}
    {/snippet}
</AbstractMatrix>
