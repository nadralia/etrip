import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import { Images } from 'assets/Icons';
import TextComponent from 'components/text';
import { Colors } from 'constants/ThemeConstants';
import { APP_CONSTANT, FontType } from 'constants/AppConstants';
import { heightPerc } from 'helpers/styleHelper';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import ButtonComponent from 'components/button-component';
import { connect } from 'react-redux';
import { setUser } from 'src/store/actions';

function LoginScreen({ navigation, setUser }) {
	const [loading, setLoading] = useState(false);
	const [user, setUserValue] = useState({
		email: 'admin@example.com',
		password: '12345678',
	});

	const handleLogin = () => {
		setLoading(true);
		Axios.post(DOMAIN_API_URL(API_URL.LOGIN), {
			...user,
		})
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				setUser(res.data);
				AsyncStorage.setItem(APP_CONSTANT.USER, JSON.stringify(res.data));
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const { email, password } = user;

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
				<TextComponent style={styles.text}>Welcome back!</TextComponent>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Input
						defaultValue={email}
						style={styles.inputStyle}
						placeholder="Your Mobile Number"
						leftIcon={{ type: 'font-awesome', name: 'mobile', color: Colors.textWhite }}
					/>
					<Input
						defaultValue={password}
						style={styles.inputStyle}
						placeholder="Your Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', color: Colors.textWhite }}
						secureTextEntry={true}
					/>
				</View>
				<ButtonComponent onPress={handleLogin} loading={loading}>
					Login
				</ButtonComponent>
				<TextComponent style={styles.subText}>Forgot Password?</TextComponent>
			</View>
		</ScrollView>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (value) => dispatch(setUser(value)),
	};
};
export default connect(null, mapDispatchToProps)(LoginScreen);

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
		padding: 10,
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
