import { defineConfig, UserConfigExport } from 'vite';

export default defineConfig({
	test: {
		include: ['**/*.{test,spec}.{ts,tsx}'],
		coverage: {
			include: ['**/src/**/*.{ts,tsx}'],
			extension: '.ts',
		},
	},
} as UserConfigExport);
