import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/either.ts'],
	fixedExtension: false,
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
