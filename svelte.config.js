import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({ typescript: {} }),
		mdsvex({
			extensions: ['.md', '.svelte'],
			layout: {
				// posts: './src/lib/components/layouts/posts.svelte'
			}
		})
	],

	extensions: ['.md', '.svelte'],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),
		prerender: {
			default: true
		}
	}
}

export default config
