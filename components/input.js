import { FontType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import React from 'react';
import { TextInput, View } from 'react-native';
import TextComponent from './text';

const EtripTextInput = ({
	placeholder = 'Place holder',
	multiline = false,
	keyboardType = 'default',
	onChange,
	name,
	value = '',
	secureTextEntry,
	icon = null,
	disabled = false,
	maxLength = 100,
	defaultValue = '',
	error = false,
	errorText,
}) => {
	let valueProp = value ? { value } : {};
	let props = {
		maxLength,
		multiline,
		secureTextEntry,
		numberOfLines: multiline ? 4 : 1,
		keyboardType,
		placeholder: `Enter ${placeholder}`,
		editable: !disabled,
		placeholderTextColor: Colors.grey,
		defaultValue: value,
		defaultValue,
		style: {
			fontFamily: 'ProximaNova-Regular',
			fontSize: 16,
			padding: 0,
			paddingVertical: 2,
			width: '100%',
			color: disabled ? Colors.grey : error ? Colors.red : Colors.themeBlack,
		},
		onChangeText: (value) => onChange && onChange({ name, value }),
		...valueProp,
	};
	return (
		<View
			style={{
				paddingVertical: 10,
				paddingBottom: 4,
				paddingHorizontal: 10,
				borderBottomColor: Colors.accDividerColor,
				borderBottomWidth: 1,
				marginBottom: 5,
				width: '100%',
				backgroundColor: Colors.white,
				borderRadius: 10,
			}}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<TextComponent type={FontType.BOLD} style={{ color: error ? Colors.red : Colors.themeBlack }}>
					{placeholder}
				</TextComponent>
				{error ? (
					<TextComponent type={FontType.BOLD} style={{ color: error ? Colors.red : Colors.themeBlack, fontSize: 10, paddingLeft: 5 }}>
						({errorText})
					</TextComponent>
				) : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{icon && <View style={{ paddingRight: 5 }}>{icon}</View>}
				<TextInput {...props} />
			</View>
		</View>
	);
};
// const EtripTextInput = ({ placeholder = 'Place holder', multiline = false, keyboardType = 'default', onChange, name, secureTextEntry }) => {
// 	let props = {
// 		multiline,
// 		secureTextEntry,
// 		numberOfLines: multiline ? 4 : 1,
// 		keyboardType,
// 		placeholder,
// 		placeholderTextColor: Colors.grey,
// 		style: { fontFamily: 'ProximaNova-Regular', fontSize: 16 },
// 		onChangeText: (value) => onChange && onChange(name, value),
// 	};
// 	return (
// 		<View
// 			style={{
// 				paddingVertical: 0,
// 				paddingHorizontal: 5,
// 				borderBottomColor: Colors.accDividerColor,
// 				borderBottomWidth: 1,
// 				marginBottom: 5,
// 				width: '100%',
// 			}}>
// 			<TextInput {...props} />
// 		</View>
// 	);
// };

export default EtripTextInput;
