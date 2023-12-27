import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/abstract.ts', './src/class.ts',  './src/instance.ts', './src/newable.ts', './src/nullable.ts', './src/primitives.ts'],
		tsconfig: '../../tsconfig.json',
	},
]);
