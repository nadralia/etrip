import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import IconComponent from 'components/icon-component';
import { FontType, IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import { View } from 'react-native';
import TextComponent from './text';

const placeholderFormat = {
	label: 'Select a sport...',
	value: null,
	color: '#9EA0A4',
};

const EtripSelect = ({ data, placeholder = '', disabled, onChange, name, defaultValue = null }) => {
	const [value, setValue] = useState(defaultValue);
	return (
		<View style={{ paddingLeft: 10, paddingTop: 5 }}>
			<TextComponent type={FontType.BOLD}>{placeholder}</TextComponent>
			<RNPickerSelect
				placeholder={{ ...placeholderFormat, label: `Select ${placeholder}` }}
				items={data}
				onValueChange={(value) => {
					onChange({ name, value });
					setValue(value);
				}}
				disabled={disabled}
				style={{
					iconContainer: {
						top: 15,
						right: 9,
					},
					inputAndroid: {
						fontSize: 16,
						paddingLeft: 0,
						paddingVertical: 5,
						paddingBottom: 5,
						borderBottomWidth: 0.5,
						borderColor: Colors.accDividerColor,
						color: disabled ? Colors.grey : Colors.themeBlack,
						fontFamily: 'ProximaNova-Regular',
						paddingRight: 30, // to ensure the text is never behind the icon
					},
				}}
				value={value}
				useNativeAndroidPickerStyle={false}
				textInputProps={{ underlineColor: 'yellow' }}
				Icon={() => {
					return <IconComponent type={IconType.AntDesign} name="down" size={14} color={Colors.grey} />;
				}}
			/>
		</View>
	);
};

export default EtripSelect;
