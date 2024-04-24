import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/domain-error.ts',
			'./src/invalid-argument.ts',
			'./src/not-found.ts',
		],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
