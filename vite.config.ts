import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
// import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const projectRootDir = resolve(__dirname);

const config: UserConfig = {
	plugins: [
		/*alias({
			entries: [
			  {
				find: 'react',
				replacement: resolve(projectRootDir, 'src/lib')
			  }
			]
		  }),*/
		viteCommonjs(),
		sveltekit()
	],
	resolve: {
		alias: {
			react: resolve(projectRootDir, 'src/lib')
		}
	},
	ssr: {
		noExternal: ['use-media', '@wellyshen/use-web-animations']
	}
};

export default config;
