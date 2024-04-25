import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/command.ts',
			'./src/bus.mock-bun.ts',
			'./src/bus.mock-vitest.ts',
			'./src/bus.sync.ts',
			'./src/bus.ts',
			'./src/decorator.ts',
			'./src/command-handlers.ts',
			'./src/in-memory.command-handlers.ts',
			'./src/ioc.command-handlers.ts',
		],
		external: ['bun:test'],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
