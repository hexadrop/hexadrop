import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/container.ts', './src/service.decorator.ts'],
	fixedExtension: false,
	format: ['esm'],
	minify: true,
	sourcemap: true,
});
