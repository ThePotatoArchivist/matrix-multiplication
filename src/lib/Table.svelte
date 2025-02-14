<script lang="ts" generics="T">
    import type { Snippet } from 'svelte'

    let { values, children }: {
        values: T[][],
        children: Snippet<[T, number, number]>,
    } = $props()
</script>

<table>
    <tbody>
        {#each values as rowValues, row}
            <tr>
                {#each rowValues as value, column}
                    <td>
                        {@render children(value, row, column)}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
    }
</style>
