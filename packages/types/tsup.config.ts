import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm', 'cjs'],
		dts: true,
		clean: true,
		entry: ['./src/index.ts', './src/class.ts', './src/nullable.ts', './src/primitives.ts'],
	},
]);
