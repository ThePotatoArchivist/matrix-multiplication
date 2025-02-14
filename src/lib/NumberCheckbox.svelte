<script lang="ts">
    let {
        value = $bindable(),
        disabled = false,
    }: {
        value: number,
        disabled?: boolean,
    } = $props()
</script>

<input type="checkbox" checked={value !== 0} oninput={event => value = event.currentTarget.checked ? 1 : 0} {disabled} />
