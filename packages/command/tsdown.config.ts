import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	deps: { neverBundle: ['bun:test'] },
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
	fixedExtension: false,
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
