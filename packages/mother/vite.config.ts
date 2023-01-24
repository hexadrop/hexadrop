import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import externalize from '../../vite.plugin.external';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es'],
			fileName: () => `hexadrop-mother.mjs`,
			entry: ['src/index.ts'],
		},
		minify: false,
		sourcemap: false,
	},
	plugins: [
		dts({
			skipDiagnostics: true,
			rollupTypes: true,
		}),
		externalize(),
		tsconfigPaths(),
	],
});
