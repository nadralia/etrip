import React from 'react';
import { Text } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextComponent from 'components/text';
import { Colors } from 'constants/ThemeConstants';
import { FontType } from 'constants/AppConstants';
import { Images } from 'assets/Icons';

export function SplashScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground source={Images.splashScreen} style={styles.image}>
				<View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={Images.logo} style={{ width: 100, height: 100 }} />
				</View>

				<View style={styles.sectionStyle}>
					<Text style={styles.text}>Bridges the gap between supplier & transporter with a tech-enabled platform</Text>
				</View>
				<View style={styles.sectionStyle}>
					<TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
						<TextComponent type={FontType.BOLD} style={{ fontSize: 16, color: Colors.primaryThemeColor }}>
							Login
						</TextComponent>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
						<TextComponent type={FontType.BOLD} style={{ fontSize: 16, color: Colors.white }}>
							Register
						</TextComponent>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 16,
		letterSpacing: 1.2,
		lineHeight: 22,
	},
	sectionStyle: {
		flex: 1,
		flexDirection: 'column',
		padding: 20,
		justifyContent: 'space-between',
	},
	registerButton: {
		height: 50,
		backgroundColor: Colors.transparent,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.white,
	},
	loginButton: { height: 50, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
});
