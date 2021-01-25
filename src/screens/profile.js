import React from 'react';
import { Button, Text, Avatar } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Colors } from 'constants/ThemeConstants';
import Header from 'components/header';
import TextComponent from 'components/text';
import { APP_CONSTANT, FontType } from 'constants/AppConstants';
import { heightPerc } from 'helpers/styleHelper';
import { connect } from 'react-redux';
import { removeUser } from 'src/store/actions';
import { removeLocalData } from 'helpers/localStorage';

const styles = StyleSheet.create({
	headerStyle: {
		height: heightPerc(20),
		backgroundColor: Colors.primaryThemeColor,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	outerCircle: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		position: 'absolute',
		bottom: -50,
	},
	innerCircle: {
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		width: 90,
		height: 90,
		borderRadius: 45,
	},
	profilePart: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 50,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: Colors.primaryThemeColor,
	},
	subText: {
		color: '#777777',
		fontSize: 15,
	},
	inputStyle: {
		// paddingLeft: 10,
		// letterSpacing: 1.2,
		// height: 20,
		fontFamily: 'ProximaNova-Regular',
	},
	logoutButton: { height: 50, backgroundColor: Colors.danger, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
});
function ProfileScreen({ navigation, removeUser }) {
	const handleLogout = async () => {
		let res = await removeLocalData(APP_CONSTANT.USER);
		removeUser();
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', paddingBottom: 10 }}>
			<Header title="Profile" rightIcon={false} />
			{/* <ScrollView> */}
			<View style={styles.headerStyle}>
				<View style={styles.outerCircle}>
					<View style={styles.innerCircle}>
						<Avatar.Icon size={90} icon="account" color={Colors.white} />
					</View>
				</View>
			</View>
			<View style={styles.profilePart}>
				<TextComponent style={styles.title}>Kirubaharan Balakrishnan</TextComponent>
				<TextComponent style={styles.subText}>Administrator</TextComponent>
			</View>
			<View style={{ flex: 2, paddingLeft: 20, paddingRight: 20 }}>
				<View style={{ flex: 1 }}>
					<Input
						style={styles.inputStyle}
						placeholder="Location"
						leftIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.textWhite }}
					/>
					<Input
						style={styles.inputStyle}
						placeholder="Mobile"
						leftIcon={{ type: 'font-awesome', name: 'mobile', color: Colors.textWhite }}
						value="+91 "
					/>
					<Input
						style={styles.inputStyle}
						placeholder="Password"
						leftIcon={{ type: 'font-awesome', name: 'lock', color: Colors.textWhite }}
						secureTextEntry={true}
					/>
				</View>

				<TouchableOpacity activeOpacity={1} onPress={handleLogout} style={styles.logoutButton}>
					<TextComponent type={FontType.BOLD} style={{ fontSize: 16, color: Colors.white }}>
						Log out
					</TextComponent>
				</TouchableOpacity>
				{/* <Button title="Log out" onPress={() => navigation.navigate('Home')} /> */}
			</View>
			{/* </ScrollView> */}
		</ScrollView>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: () => dispatch(removeUser()),
	};
};
export default connect(null, mapDispatchToProps)(ProfileScreen);
