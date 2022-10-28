<script>
	import './prism-atom-dark.css';
</script>

<div class="header">
	<nav>
		<a href="/">Home</a>
		<a href="/examples">Examples</a>
		<a href="https://github.com/micha-lmxt/hooks-as-store">GitHub</a>
	</nav>
</div>
<main>
	<div class="ph">
		<slot />
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	nav {
		padding: 0.5rem;
		background: transparent;
		display: flex;
		color: white;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	a {
		opacity: 1;
		color: white;
		margin: 1rem;
	}
	:global(body) {
		background: rgb(8, 1, 80);
	}
	.ph {
		background-color: #fefeff;
		flex-grow: 1;
		max-width: min(95%,900px);
		min-height: 300px;
		padding: 1rem;
		border-radius: 4px;
	}
</style>
