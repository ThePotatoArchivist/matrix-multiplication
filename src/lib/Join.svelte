<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';

    let { values, join, children }: {
        values: T[],
        join: Snippet,
        children: Snippet<[T]>,
    } = $props()
</script>

{#each values as value, index}
    {@render children(value)}
    {#if index + 1 < values.length}
        {@render join()}
    {/if}
{/each}
