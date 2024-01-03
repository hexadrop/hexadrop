import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: ['./src/container.ts', './src/service.decorator.ts'],
		minify: true,
		sourcemap: true,
	},
]);
