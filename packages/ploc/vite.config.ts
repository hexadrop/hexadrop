import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es'],
			fileName: (_, m) => `hexadrop-ploc${m === 'index' ? '' : `-${m}`}.mjs`,
			entry: ['src/index.ts', 'src/memory.ts', 'src/react.ts'],
		},
		minify: false,
		sourcemap: false,
	},
	plugins: [
		dts({
			skipDiagnostics: true,
			entryRoot: 'src',
		}),
		externalizeDeps(),
		tsconfigPaths(),
	],
});
