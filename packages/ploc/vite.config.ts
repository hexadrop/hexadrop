import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es'],
			fileName: (_, e) => `hexadrop-ploc${e === 'index' ? '' : `-${e}`}.mjs`,
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
