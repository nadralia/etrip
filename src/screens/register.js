import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Images } from 'assets/Icons';
import TextComponent from 'components/text';
import { Colors } from 'constants/ThemeConstants';
import { FontType } from 'constants/AppConstants';
import { heightPerc } from 'helpers/styleHelper';

export function RegisterScreen({ navigation }) {
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
				<TextComponent style={styles.text}>Welcome</TextComponent>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Input
						style={styles.inputStyle}
						placeholder="Your Full Name"
						leftIcon={{ type: 'font-awesome', name: 'user', color: Colors.textWhite }}
					/>
					<Input
						style={styles.inputStyle}
						placeholder="Your Mobile Number"
						leftIcon={{ type: 'font-awesome', name: 'mobile', color: Colors.textWhite }}
					/>
					<Input
						style={styles.inputStyle}
						placeholder="Your Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', color: Colors.textWhite }}
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Home')} style={styles.loginButton}>
					<TextComponent type={FontType.BOLD} style={{ fontSize: 16, color: Colors.white }}>
						Register
					</TextComponent>
				</TouchableOpacity>
				<TextComponent style={styles.subText}>
					Already have account ?{' '}
					<TextComponent
						style={{ textDecorationLine: 'underline', fontSize: 16 }}
						onPress={() => navigation.navigate('Login')}
						type={FontType.BOLD}>
						Login
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
		fontSize: 26,
		fontWeight: '600',
		padding: 8,
	},
	sectionStyle: {
		flexGrow: 7,
		flexDirection: 'column',
		padding: 20,
	},
	inputStyle: {
		paddingLeft: 10,
		fontFamily: 'ProximaNova-Regular',
	},
	subText: {
		color: '#777777',
		paddingTop: 10,
		paddingRight: 10,
		textAlign: 'center',
		fontSize: 14,
	},
	loginButton: { height: 50, backgroundColor: Colors.primaryThemeColor, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
});
