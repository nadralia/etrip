import ButtonComponent from 'components/button-component';
import Header from 'components/header';
import IconComponent from 'components/icon-component';
import TextComponent from 'components/text';
import { IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

const buttons = [
	{
		name: 'Booking',
		route: 'Booking',
	},
	{
		name: 'Pre-Booking',
		route: 'PreBooking',
	},
	{
		name: 'Quick-Booking',
		route: 'QuickBooking',
	},
];

const BookingMain = ({ navigation }) => (
	<View style={{ flex: 1, backgroundColor: Colors.white }}>
		<Header title="Select Booking type" />
		<View style={{ padding: 10, justifyContent: 'center', flex: 1 }}>
			{buttons.map((button, i) => (
				<Ripple
					key={i}
					onPress={() => navigation.navigate(button.route)}
					style={{
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row',
						backgroundColor: Colors.primaryThemeColor,
						padding: 20,
						marginBottom: 10,
					}}>
					<TextComponent style={{ color: Colors.white, fontSize: 18 }}>Proceed with {button.name}</TextComponent>
					<IconComponent color={Colors.white} name="right" size={18} type={IconType.AntDesign} />
				</Ripple>
			))}
		</View>
	</View>
);

export default BookingMain;

const styles = StyleSheet.create({
	signUpButton: {
		margin: 1,
		width: '100%',
		borderRadius: 0,
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		alignSelf: 'center',
	},
});
