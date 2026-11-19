import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// one self-contained index.html, so the build can be opened straight from disk
export default defineConfig({
	base: './',
	plugins: [viteSingleFile()],
	build: {
		assetsInlineLimit: 100 * 1024 * 1024,
		chunkSizeWarningLimit: 100 * 1024,
	},
});
