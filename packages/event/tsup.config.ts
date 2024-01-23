import { defineConfig } from 'tsup';

export default defineConfig([
	{
		format: ['esm'],
		dts: true,
		clean: true,
		entry: [
			'./src/domain-event.ts',
			'./src/bus.mock-bun.ts',
			'./src/bus.async.ts',
			'./src/bus.pub-sub.ts',
			'./src/bus.sync.ts',
			'./src/bus.ts',
			'./src/decorator.ts',
			'./src/event-handlers.ts',
			'./src/in-memory.event-handlers.ts',
			'./src/ioc.event-handlers.ts',
		],
		minify: true,
		sourcemap: true,
		external: ['bun:test'],
	},
]);
