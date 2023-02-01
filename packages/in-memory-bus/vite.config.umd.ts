import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['umd'],
			fileName: () => `hexadrop-in-memory-bus.umd.min.js`,
			entry: ['src/index.ts'],
			name: 'memobus',
		},
		minify: true,
		sourcemap: false,
		emptyOutDir: false,
		rollupOptions: {
			output: {
				globals: {
					uuid: 'uuid',
				},
			},
		},
	},
	plugins: [externalizeDeps(), tsconfigPaths()],
});
