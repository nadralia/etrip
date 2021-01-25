module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					screens: './screens',
					contexts: './contexts',
					constants: './constants',
					components: './components',
				},
			},
		],
	],
};
