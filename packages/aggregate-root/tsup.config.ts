import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: ['./src/aggregate-root.ts'],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
