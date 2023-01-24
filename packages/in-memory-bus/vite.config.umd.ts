import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import externalize from '../../vite.plugin.external';

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
	plugins: [externalize(), tsconfigPaths()],
});
