import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md', '.svelte'],
			layout: {
				posts: './src/lib/components/layouts/posts.svelte'
			}
		})
	],

	kit: {
		adapter: adapter()
	}
}

export default config
