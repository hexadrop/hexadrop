import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/index.ts', './src/bus.ts', './src/decorator.ts'],
	},
]);
