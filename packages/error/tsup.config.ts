import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/index.ts', './src/invalid-argument.ts', './src/not-found.ts'],
	},
]);
