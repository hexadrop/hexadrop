import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/abstract.ts',
			'./src/class.ts',
			'./src/instance.ts',
			'./src/newable.ts',
			'./src/nullable.ts',
			'./src/primitives.ts',
		],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
