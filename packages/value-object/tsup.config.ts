import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: [
			'./src/boolean.value-object.ts',
			'./src/date.value-object.ts',
			'./src/number.value-object.ts',
			'./src/string.value-object.ts',
			'./src/uuii.value-object.ts',
			'./src/ulid.value-object.ts',
		],
		minify: true,
		sourcemap: true,
	},
]);
