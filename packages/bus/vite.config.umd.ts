import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['umd'],
			fileName: `hexadrop-bus.umd.min.js`,
			entry: 'src/index.ts',
			name: 'hexadrop',
		},
		minify: true,
		sourcemap: false,
		emptyOutDir: false,
	},
	plugins: [externalizeDeps(), tsconfigPaths()],
});
