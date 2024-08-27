import hexadrop from '@hexadrop/eslint-config';

export default hexadrop({
	rules: {
		'typescript/ban-types': 'off',
		'typescript/no-explicit-any': 'off',
		'typescript/no-invalid-void-type': 'off',
		'typescript/no-unsafe-function-type': 'off',
	},
});
