import { defineConfig, UserConfigExport } from 'vite';

export default defineConfig({
	test: {
		include: ['**/*.{test,spec}.{ts,tsx}'],
		coverage: {
			provider: 'istanbul',
			include: ['**/src/**/*.{ts,tsx}'],
			exclude: ['**/spec/**/*.ts'],
			extension: '.ts',
		},
	},
} as UserConfigExport);
