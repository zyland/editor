import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			"codemirror",
			"@codemirror/state",
			"@codemirror/language",
			"@codemirror/theme-one-dark",
			"flark",
		]
	}
});
