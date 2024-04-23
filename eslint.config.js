import hexatool from '@hexatool/eslint-config';

export default hexatool({
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
	formatters: true,
});
