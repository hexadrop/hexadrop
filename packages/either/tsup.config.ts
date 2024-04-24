import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: ['./src/either.ts'],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
