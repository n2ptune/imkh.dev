<script lang="ts">
	export let title: string
	export let layout: string
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main>
	<slot />
</main>
