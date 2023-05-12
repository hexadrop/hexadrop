import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['umd'],
			fileName: () => `hexadrop-bus-memory.umd.min.js`,
			entry: 'src/memory.ts',
			name: 'hexadrop',
		},
		minify: true,
		sourcemap: false,
		emptyOutDir: false,
		rollupOptions: {
			output: {
				globals: {
					'@hexadrop/either': 'hexadrop',
					'@hexadrop/error': 'hexadrop',
				},
			},
		},
	},
	plugins: [externalizeDeps(), tsconfigPaths()],
});
