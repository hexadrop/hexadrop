import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/domain-error.ts', './src/invalid-argument.ts', './src/not-found.ts'],
		minify: true,
	},
]);
