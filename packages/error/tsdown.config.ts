import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/domain-error.ts', './src/invalid-argument.ts', './src/not-found.ts'],
	fixedExtension: false,
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
