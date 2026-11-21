import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	deps: { neverBundle: ['bun:test'] },
	dts: true,
	entry: [
		'./src/query.ts',
		'./src/bus.mock-bun.ts',
		'./src/bus.mock-vitest.ts',
		'./src/bus.sync.ts',
		'./src/bus.ts',
		'./src/decorator.ts',
		'./src/query-handlers.ts',
		'./src/in-memory.query-handlers.ts',
		'./src/ioc.query-handlers.ts',
	],
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
