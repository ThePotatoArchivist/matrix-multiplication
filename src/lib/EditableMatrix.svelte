<script lang="ts">
    import AbstractMatrix from './AbstractMatrix.svelte';

    let { values = $bindable() }: { values: number[][] } = $props()
</script>

<AbstractMatrix {values}>
    {#snippet children(_, row, column)}
        <input type="number" bind:value={values[row][column]} />
    {/snippet}
</AbstractMatrix>


<style>
    input {
        width: 1.5em;
        text-align: center;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>
