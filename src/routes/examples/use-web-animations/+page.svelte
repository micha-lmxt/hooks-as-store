<script lang="ts">
	import Main from './Main.svelte';
	import Text from './Text.svx';
	import License from './License.svx';
	let license = false;
</script>

<h1>use-web-animations</h1>
<div class="outer">
	<Main />
</div>
<Text />
<button on:click={() => (license = !license)}>License</button>

<div style:display={license ? 'block' : 'none'}>
	<License />
</div>

<style>
	.outer {
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
