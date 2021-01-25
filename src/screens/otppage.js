import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Images } from 'assets/Icons';
import { heightPerc } from 'helpers/styleHelper';
import TextComponent from 'components/text';
import { Colors } from 'constants/ThemeConstants';
import { FontType } from 'constants/AppConstants';

const CELL_COUNT = 4;

export function OTPScreen({ navigation }) {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ height: heightPerc(30) }}>
				<ImageBackground source={Images.splashScreen} style={styles.image}>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Image source={Images.logo} style={{ width: '50%', height: '50%' }} resizeMode="contain" />
					</View>
				</ImageBackground>
			</View>
			<View style={styles.sectionStyle}>
				<TextComponent style={styles.text}>One Step ahead!</TextComponent>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
					<TextComponent style={styles.subText}>Enter the 4 digit OTP</TextComponent>
					<CodeField
						ref={ref}
						{...props}
						value={value}
						onChangeText={setValue}
						cellCount={CELL_COUNT}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View
								// Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
								onLayout={getCellOnLayoutHandler(index)}
								key={index}
								style={[styles.cellRoot, isFocused && styles.focusCell]}>
								<Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
							</View>
						)}
					/>
				</View>
				<TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Home')} style={styles.loginButton}>
					<TextComponent type={FontType.BOLD} style={{ fontSize: 16, color: Colors.white }}>
						Verify
					</TextComponent>
				</TouchableOpacity>
				<TextComponent style={styles.subText}>
					Didn't get the OTP?
					<TextComponent style={{ textDecorationLine: 'underline', fontSize: 14 }} type={FontType.BOLD}>
						{' '}
						Resend OTP
					</TextComponent>
				</TextComponent>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		color: '#2196f3',
		fontSize: 24,
		fontWeight: '600',
		padding: 10,
	},
	sectionStyle: {
		flex: 3,
		flexDirection: 'column',
		padding: 20,
	},
	subText: {
		color: '#777777',
		paddingTop: 10,
		paddingRight: 10,
		textAlign: 'center',
		fontSize: 14,
	},
	inputStyle: {
		width: 20,
		margin: 5,
	},
	root: { padding: 20, minHeight: 300 },
	title: { textAlign: 'center', fontSize: 30 },
	codeFieldRoot: {
		marginTop: 20,
		width: 280,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	cellRoot: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	cellText: {
		color: '#000',
		fontSize: 36,
		textAlign: 'center',
	},
	focusCell: {
		borderBottomColor: Colors.primaryThemeColor,
		borderBottomWidth: 2,
	},
	loginButton: { height: 50, backgroundColor: Colors.primaryThemeColor, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
});
