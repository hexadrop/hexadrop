import { default as hexatool } from '@hexatool/eslint-config';

export default hexatool({
	formatters: true,
	typescript: {
		overrides: {
			'typescript/ban-types': 'off',
			'typescript/no-explicit-any': 'off',
			'typescript/no-invalid-void-type': 'off',
		},
		tsconfigPath: './tsconfig.json',
	},
});
