import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/ploc.ts', './src/ploc.memory.ts', './src/ploc.memory-hook.ts', './src/ploc.react.ts'],
		minify: true,
		sourcemap: true,
	},
]);
