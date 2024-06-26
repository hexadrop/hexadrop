import { defineConfig } from 'tsup';

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: [
			'./src/domain-event.ts',
			'./src/bus.mock-bun.ts',
			'./src/bus.mock-vitest.ts',
			'./src/bus.async.ts',
			'./src/bus.pub-sub.ts',
			'./src/bus.sync.ts',
			'./src/bus.ts',
			'./src/decorator.ts',
			'./src/event-handlers.ts',
			'./src/in-memory.event-handlers.ts',
			'./src/ioc.event-handlers.ts',
		],
		external: ['bun:test'],
		format: ['esm'],
		minify: true,
		sourcemap: true,
	},
]);
