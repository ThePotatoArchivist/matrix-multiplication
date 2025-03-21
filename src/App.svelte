<script lang="ts">
    import { untrack } from 'svelte';
    import AbstractMatrix from './lib/AbstractMatrix.svelte';
    import EditableMatrix from './lib/EditableMatrix.svelte';
    import ReadonlyMatrix from './lib/ReadonlyMatrix.svelte';
    import Join from './lib/Join.svelte';
    import NumberCheckbox from './lib/NumberCheckbox.svelte';

    function range(size: number) {
        return [...Array(size)].map((_, index) => index)
    }

    function repeat<T>(size: number, value: T | ((index: number) => T)): T[] {
        return typeof value === "function" ? range(size).map(index => (value as (index: number) => T)(index)) : Array(size).fill(value)
    }

    function resize<T>(height: number, width: number, values: T[][], defaultValue: T): T[][] {
        return values.length === height && (values.length === 0 || values[0].length === width) 
            ? values
            : repeat(height, row => repeat(width, col => row in values && col in values[row] ? values[row][col] : defaultValue))
    }

    let boolean = $state(false)

    let matrix1Height = $state(2)
    let matrixShared = $state(2)
    let matrix2Width = $state(2)

    let matrix1: number[][] = $state([])
    let matrix2: number[][] = $state([])

    $effect(() => {
        matrix1 = resize(matrix1Height, matrixShared, untrack(() => matrix1), 0)
    })
    $effect(() => {
        matrix2 = resize(matrixShared, matrix2Width, untrack(() => matrix2), 0)
    })

    let matrixResult = $derived(repeat(matrix1Height, row => repeat(matrix2Width, col => 
        repeat(matrixShared, index => (matrix1[row]?.[index] ?? 0) * (matrix2[index]?.[col] ?? 0)).reduce((a, b) => a + b, 0)
    )))

    let colors = $derived(repeat(matrixShared, index => index * 360 / matrixShared).map(hue => `hsl(${hue}deg 70% 50% / 30%)`))
</script>

{#snippet matrixValue(value: number)}
    {#if boolean}
        <input type="checkbox" checked={value !== 0} disabled />
    {:else}
        {value}
    {/if}
{/snippet}

<main>
    <label class="info">
        <input type="checkbox" bind:checked={boolean} />
        Boolean Mode
    </label>

    <div class="multiply">

        <div class="dimensions">
            <input type="number" min={1} bind:value={matrix1Height} />
            &times;
            <input type="number" min={1} bind:value={matrixShared} />
        </div>
        <EditableMatrix bind:values={matrix1} {boolean} />

        <div class="empty"></div>
        <div class="symbol">&times;</div>

        <div class="dimensions">
            <input type="number" min={1} bind:value={matrixShared} />
            &times;
            <input type="number" min={1} bind:value={matrix2Width} />
        </div>
        <EditableMatrix bind:values={matrix2} {boolean} />

        <div class="empty" style:grid-column="span 2"></div>
        <div class="symbol">=</div>

        <ReadonlyMatrix values={matrixResult} {boolean} />

    </div>

    <div class="show">
        <div class="empty"></div>

        <AbstractMatrix values={matrix2}>
            {#snippet children(value, row, _)}
                <span class="highlight" style:background-color={colors[row]}>
                    {@render matrixValue(value)}
                </span>
            {/snippet}
        </AbstractMatrix>

        <div class="empty" style:grid-column="span 2"></div>

        <AbstractMatrix values={matrix1}>
            {#snippet children(value, _, col)}
                <span class="highlight" style:background-color={colors[col]}>
                    {@render matrixValue(value)}
                </span>
            {/snippet}
        </AbstractMatrix>

        <AbstractMatrix values={matrixResult}>
            {#snippet children(_, row, col)}
                <Join values={range(matrixShared)}>
                    {#snippet join()}{' + '}{/snippet}
                    {#snippet children(index)}
                        <span class="highlight" style:background-color={colors[index]}>
                            {@render matrixValue(matrix1[row]?.[index] ?? 0)} &sdot; {@render matrixValue(matrix2[index]?.[col] ?? 0)}
                        </span>
                    {/snippet}
                </Join>
            {/snippet}
        </AbstractMatrix>

        <span class="symbol">=</span>

        <ReadonlyMatrix values={matrixResult} {boolean} />

    </div>
</main>

<style>
    main {
        display: contents;
    }

    input {
        width: 1em;
        text-align: center;
    }

    input[type="checkbox"] {
        height: 1em;
    }

    .multiply {
        display: grid;
        width: max-content;
        grid-template-rows: auto auto;
        grid-auto-flow: column;
        gap: 0.5em 1em;
        place-items: center;
    }

    .show {
        display: grid;
        width: max-content;
        grid-template-columns: auto auto auto auto;
        grid-template-rows: auto auto;
        gap: 0.5em;
        align-items: center;
    }

    .symbol {
        font-size: 2em;
    }

    .highlight {
        padding: 0.1em 0.2em;
        border-radius: 0.2em;
    }

    main > * {
        margin: 1em 0;
    }

    .dimensions {
        font-size: 0.75em;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25em;
    }

    .info {
        font-size: 0.67em;
    }

    label {
        user-select: none;
    }
</style>
