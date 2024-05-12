import hexatool from '@hexatool/eslint-config';

export default hexatool({
	rules: {
		'typescript/ban-types': 'off',
		'typescript/no-explicit-any': 'off',
		'typescript/no-invalid-void-type': 'off',
	},
});
