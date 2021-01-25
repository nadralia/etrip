import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import IconComponent from './icon-component';
import TextComponent from './text';
import { DATE_PICKER_TYPE, FontType, FORMATS, IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';

const EtripDatePicker = ({
	iconOnly = false,
	name = '',
	mode = DATE_PICKER_TYPE.DATE,
	onChange,
	defaultValue = null,
	format = FORMATS.DATE,
	placeholder = null,
}) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [date, setDate] = useState(defaultValue);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		console.log(date);
		const value = moment(date).format(mode === DATE_PICKER_TYPE.DATE ? FORMATS.DATE : FORMATS.TIME);
		hideDatePicker();
		setDate(value);
		if (onChange) {
			onChange({ name, value });
		}
	};

	return (
		<Fragment>
			{!iconOnly ? (
				<View style={{ flex: 1, paddingTop: 10 }}>
					{placeholder ? (
						<TextComponent type={FontType.BOLD} style={{ color: false ? Colors.red : Colors.themeBlack, paddingLeft: 10 }}>
							{placeholder}
						</TextComponent>
					) : null}
					<TouchableOpacity
						activeOpacity={1}
						onPress={showDatePicker}
						style={{
							paddingVertical: 0,
							paddingHorizontal: 5,
							borderBottomColor: Colors.accDividerColor,
							borderBottomWidth: 1,
							marginBottom: 5,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<View style={{ flex: 9, padding: placeholder ? 8 : 15, paddingLeft: 5 }}>
							<TextComponent style={{ fontSize: 15, color: date ? Colors.themeBlack : Colors.grey }}>
								{date || 'Pick your date'}
							</TextComponent>
						</View>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<IconComponent name="calendar" type={IconType.AntDesign} color={Colors.grey} size={20} />
						</View>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={showDatePicker} activeOpacity={1} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<IconComponent name="calendar" type={IconType.AntDesign} color={Colors.grey} size={20} />
				</TouchableOpacity>
			)}
			<DateTimePickerModal mode={mode} isVisible={isDatePickerVisible} onConfirm={handleConfirm} onCancel={hideDatePicker} />
		</Fragment>
	);
};

export default EtripDatePicker;
