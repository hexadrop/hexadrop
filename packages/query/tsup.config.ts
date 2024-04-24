import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/query.ts',
			'./src/bus.mock-bun.ts',
			'./src/bus.sync.ts',
			'./src/bus.ts',
			'./src/decorator.ts',
			'./src/query-handlers.ts',
			'./src/in-memory.query-handlers.ts',
			'./src/ioc.query-handlers.ts',
		],
		external: ['bun:test'],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
