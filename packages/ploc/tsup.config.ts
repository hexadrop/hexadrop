import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/index.ts', './src/ploc.memory.ts', './src/ploc.memory-hook.ts', './src/ploc.react.ts'],
	},
]);
