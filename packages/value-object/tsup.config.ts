import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/boolean.value-object.ts',
			'./src/date.value-object.ts',
			'./src/email.value-object.ts',
			'./src/number.value-object.ts',
			'./src/string.value-object.ts',
			'./src/uuii.value-object.ts',
			'./src/ulid.value-object.ts',
		],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
