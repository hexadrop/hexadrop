import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: [
			'./src/command.ts',
			'./src/bus.mock-bun.ts',
			'./src/bus.sync.ts',
			'./src/bus.ts',
			'./src/decorator.ts',
			'./src/command-handlers.ts',
			'./src/in-memory.command-handlers.ts',
			'./src/ioc.command-handlers.ts',
		],
		minify: true,
	},
]);
