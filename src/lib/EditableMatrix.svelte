<script lang="ts">
    import AbstractMatrix from './AbstractMatrix.svelte';

    let { values = $bindable(), boolean = false }: { values: number[][], boolean?: boolean } = $props()

    
</script>

<AbstractMatrix {values}>
    {#snippet children(value, row, column)}
        {#if boolean}
            <input type="checkbox" checked={value !== 0} oninput={event => values[row][column] = event.currentTarget.checked ? 1 : 0} />
        {:else}
            <input type="number" bind:value={values[row][column]} />
        {/if}
    {/snippet}
</AbstractMatrix>


<style>
    input {
        width: 1.5em;
        text-align: center;
    }

    input[type="checkbox"] {
        height: 1em;
    }
</style>
