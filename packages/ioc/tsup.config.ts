import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/container.ts',
			'./src/service.decorator.ts',
		],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
