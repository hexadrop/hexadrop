import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import externalize from '../../vite.plugin.external';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es'],
			fileName: (_format, entryName) =>
				`hexadrop-core${entryName === 'index' ? '' : `-${entryName}`}.mjs`,
			entry: ['src/index.ts', 'src/test.ts'],
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
