import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/class.ts', './src/nullable.ts', './src/primitives.ts'],
		tsconfig: '../../tsconfig.json',
	},
]);
