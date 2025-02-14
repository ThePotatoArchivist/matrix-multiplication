<script lang="ts" generics="T">
    import AbstractMatrix from './AbstractMatrix.svelte';

    let { values, boolean = false }: { values: T[][], boolean?: boolean } = $props()
</script>

<AbstractMatrix {values}>
    {#snippet children(value)}
        {#if boolean}
            <input type="checkbox" checked={value !== 0} disabled />
        {:else}
            {value}
        {/if}
    {/snippet}
</AbstractMatrix>

<style>
    input[type="checkbox"] {
        width: 1em;
        height: 1em;
    }
</style>
