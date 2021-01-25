import React from 'react';
import { Text } from 'react-native';

import { FontType } from 'constants/AppConstants';

const TextComponent = ({ children, style, type, onPress, numberOfLines }) => {
	const getFontFamily = (type) => {
		switch (type) {
			case FontType.REGULAR:
				return 'ProximaNova-Regular';
			case FontType.SEMIBOLD:
				return 'ProximaNova-Extrabld';
			case FontType.BOLD:
			default:
				return 'ProximaNova-Bold';
		}
	};
	return (
		<Text
			onPress={onPress}
			numberOfLines={numberOfLines}
			style={[
				{
					fontFamily: getFontFamily(type),
					fontSize: 14,
				},
				style,
			]}>
			{children}
		</Text>
	);
};

export default TextComponent;

TextComponent.defaultProps = {
	type: FontType.REGULAR,
};
