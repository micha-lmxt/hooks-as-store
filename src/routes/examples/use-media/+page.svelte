<script>
	import { PartialApp } from 'partial-hydration-sk';
	import { hook } from '$lib';
	import { useMedia } from 'use-media';
	import { useMediaLayout } from 'use-media';

	const isWide = hook(useMedia, { minWidth: '1000px' });
	const isWideLayout = hook(useMediaLayout, { minWidth: '700px' });
</script>

<PartialApp page="page" id="partialapp" />

<div>
	Screen is wide: {$isWide ? '😃' : '😢'}
	<br />
	Screen is wider than 700px: {$isWideLayout ? 'yes' : 'no'}
</div>
