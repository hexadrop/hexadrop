import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/ploc.ts',
			'./src/ploc.memory.ts',
			'./src/ploc.memory-hook.ts',
			'./src/ploc.react.ts',
		],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
