<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import Table from './Table.svelte';

    let { values, children }: {
        values: T[][],
        children: Snippet<[T, number, number]>,
    } = $props()
</script>

<div class="matrix">
    <div class="bracket left"></div>
    <Table {values} {children} />
    <div class="bracket right"></div>
</div>

<style>
    .matrix {
        display: flex;
        flex-direction: row;
        font-variant-numeric: tabular-nums;
    }

    .bracket {
        width: 0.3em;
        border: 1px solid currentColor;
    }

    .bracket.left {
        border-right: none;
    }

    .bracket.right {
        border-left: none;
    }

    .matrix > :global(table) {
        flex-grow: 1;
        border-collapse: separate;
        border-spacing: 0.75em 0.25em;
    }

    .matrix > :global(table td) {
        text-align: center;
    }
</style>
