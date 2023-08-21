import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			"codemirror",
			"@codemirror/state",
			"@codemirror/view",
			"@codemirror/commands",
			"@codemirror/autocomplete",
			"@codemirror/language",
			"@codemirror/theme-one-dark",
			"@codemirror/lang-javascript",
			"@lezer/highlight",
			"@lezer/lr",
			"@lezer/common",
			"@zyland/core",
		]
	}
});
