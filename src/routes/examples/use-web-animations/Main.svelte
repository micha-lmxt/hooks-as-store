<script lang="ts">
	import useWebAnimations from '@wellyshen/use-web-animations';
	import { beforeUpdate } from 'svelte';
	import { hook } from '$lib';

	const blockAnimation = hook(useWebAnimations<HTMLDivElement>, {
		keyframes: { width: ['0', '100%', '0'], left: ['0', '0', '100%'] },
		animationOptions: {
			duration: 2000,
			fill: 'forwards',
			easing: 'cubic-bezier(0.74, 0.06, 0.4, 0.92)'
		}
	});
	$: ({ ref: blockRef, getAnimation: getBlockAnim } = $blockAnimation);

	const textAnimation = hook(useWebAnimations<HTMLDivElement>, {
		keyframes: { opacity: ['0', '1'] },
		animationOptions: {
			delay: 1600,
			duration: 1000,
			fill: 'forwards'
		}
	});
	$: ({ ref: textRef, getAnimation: getTxtAnim } = $textAnimation);
	const heartAnimation = hook(useWebAnimations<HTMLDivElement>, {
		keyframes: {
			transform: ['translate3d(0, 0, 0)', 'translate3d(0, -100%, 0)']
		},
		animationOptions: {
			delay: 2000,
			duration: 250,
			fill: 'forwards',
			easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
		}
	});
	$: ({ ref: heartRef, getAnimation: getHeartAnim } = $heartAnimation);
	const handlePlayback = (e: MouseEvent) => {
		const method = (e.target as HTMLButtonElement).id;

		(getBlockAnim() as any)[method]();
		(getTxtAnim() as any)[method]();
		(getHeartAnim() as any)[method]();
	};

	const handleSeek = (e: HTMLInputEvent) => {
		const value = parseInt((e.target as HTMLInputElement).value, 10);

		const blockAnim = getBlockAnim();
		const blockTiming = blockAnim?.effect?.getTiming();
		if (blockAnim?.playState === 'running') blockAnim.pause();
		// @ts-ignore
		blockAnim.currentTime = ((blockTiming?.duration as number) / 100) * value;

		const txtAnim = getTxtAnim();
		const txtTiming = txtAnim?.effect?.getTiming();
		if (txtAnim?.playState === 'running') txtAnim.pause();
		// @ts-ignore
		txtAnim.currentTime =
			// @ts-ignore
			((txtTiming.delay + (txtTiming.duration as number)) / 100) * value;

		const heartAnim = getHeartAnim();
		const heartTiming = heartAnim?.effect?.getTiming();
		if (heartAnim?.playState === 'running') heartAnim.pause();
		// @ts-ignore
		heartAnim.currentTime =
			// @ts-ignore
			((heartTiming.delay + (heartTiming.duration as number)) / 100) * value;
	};
</script>

<div class="container">
	<h1 class="title">USE-WEB-ANIMATIONS</h1>
	<p class="subtitle">
		React hook for highly-performant and manipulable animations using Web Animations API.
	</p>
	<div class="mask">
		<div class="block" bind:this={blockRef.current} />
		<span class="txt" bind:this={textRef.current}> BLACK LIVES MATTER </span>
		<span class="heart" bind:this={heartRef.current}> ❤ </span>
	</div>
	<div>
		<div>
			<button id="play" class="btn" type="button" on:click={handlePlayback}> PLAY </button>
			<button id="pause" class="btn" type="button" on:click={handlePlayback}> PAUSE </button>
			<button id="reverse" class="btn" type="button" on:click={handlePlayback}> REVERSE </button>
			<button id="finish" class="btn" type="button" on:click={handlePlayback}> FINISH </button>
		</div>
		<input class="slider" type="range" defaultValue="0" on:input={handleSeek} />
	</div>
</div>

<style>
	.title,
	.subtitle {
		color: white;
	}
	.container {
		box-sizing: border-box;
		
		max-height: 70%;
		display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 5%;
  text-align: center;
	}

	.mask {
		 position: relative;
    margin-bottom: 2.5rem;
    width: min(99%,77vw);
    text-align: left;
    overflow: hidden;
    user-select: none;
	}
	

	.block {
		position: absolute;
		height: 100%;
		background: #fff;
	}

	.txt {
		 font-family: "Bowlby One SC", cursive;
    font-size: 8vw;
    opacity: 0;
	color:#fff;
	}

	.heart {
		position: absolute;
    top: 100%;
    margin-left: 1rem;
    font-size: 6vw;
    color: #f00;
	}

	.btn {
		padding: 0.5rem;
		border: 1px dashed #fff;
		font-weight: bold;
		color: #fff;
		background: none;
		cursor: pointer;
	}
	.btn:not(:first-of-type) {
		margin-left: -1px;
	}

	.btn:hover {
		background: rgb(255 255 255 / 20%);
	}

	.btn:focus {
		outline: none;
	}

	.slider {
		position: relative;
		margin-top: 1.5rem;
		width: 100%;
		background: none;
		appearance: none;
	}
	.slider:focus {
		border: none;
		outline: none;
	}

	.slider::-moz-range-track {
		background: #fff;
	}

	.slider::-webkit-slider-thumb {
		appearance: none;
		width: 21px;
		height: 21px;
		background: #fff;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 21px;
		height: 21px;
		border: none;
		background: #fff;
		cursor: pointer;
	}

	.slider::after {
		content: '';
		position: absolute;
		top: 10px;
		width: 100%;
		height: 1px;
		background: #fff;
		cursor: pointer;
	}
	@media (max-width: 600px) {

	.container{
		padding-left: 12.5%;
    padding-right: 12.5%;
	}

  }
</style>
