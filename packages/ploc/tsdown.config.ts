import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/ploc.ts', './src/ploc.memory.ts', './src/ploc.memory-hook.ts', './src/ploc.react.ts'],
	fixedExtension: false,
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
