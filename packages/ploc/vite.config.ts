import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import externalize from '../../vite.plugin.external';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es', 'umd'],
			fileName: format => `hexadrop-ploc.${format === 'es' ? 'mjs' : 'umd.min.js'}`,
			entry: ['src/index.ts'],
			name: 'plocadrop',
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
