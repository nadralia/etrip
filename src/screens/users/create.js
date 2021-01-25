import React, { useRef, useState } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from 'components/header';
import { FontType, IconType, TOAST_VARIABLES } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import EtripTextInput from 'components/input';
import ButtonComponent from 'components/button-component';
import IconComponent from 'components/icon-component';
import EtripSelect from 'components/select';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import Axios from 'axios';
import { connect } from 'react-redux';
import { removeUser } from 'src/store/actions';
import { showToast } from 'components/toast';

const roles = [
	{
		label: 'Super User',
		value: 'super',
	},
	{
		label: 'Admin',
		value: 'admin',
	},
	{
		label: 'User',
		value: 'user',
	},
];

function UserCreateScreen({ navigation, current_user, removeUser }) {
	let alertRef = useRef();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		mobile: '',
		role: '',
		password: '',
		email: '',
	});
	const onChange = ({ name, value }) => {
		setUser({
			...user,
			[name]: value,
		});
	};
	const onSubmit = () => {
		setLoading(true);
		Axios.post(
			DOMAIN_API_URL(API_URL.ADD_USER),
			{
				...user,
			},
			{
				headers: {
					'x-access-token': current_user.jwt,
					'x-user-id': current_user.userId,
				},
			}
		)
			.then((res) => {
				// alertRef.current.alertWithType('success', 'Success', 'User Created Successfully');
				navigation.goBack();
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				// removeUser();
				setLoading(false);
				showToast(TOAST_VARIABLES.Error, JSON.stringify(err.response.data.message));
				// alertRef.current.alertWithType('error', 'Error', 'Error');
			});
	};
	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<DropdownAlert ref={alertRef} />
			<Header title="Add User" />
			<ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View style={styles.sectionStyle}>
						<EtripTextInput
							onChange={onChange}
							placeholder="First Name"
							icon={<IconComponent type={IconType.AntDesign} name="user" />}
							name="firstName"
						/>
						<EtripTextInput
							onChange={onChange}
							placeholder="Last Name"
							icon={<IconComponent type={IconType.AntDesign} name="user" />}
							name="lastName"
						/>
						{/* <EtripTextInput
							onChange={onChange}
							maxLength={10}
							placeholder="Mobile Number"
							icon={<IconComponent type={IconType.AntDesign} name="mobile" name="mobile1" />}
							name="mobile"
						/> */}
						<EtripTextInput
							onChange={onChange}
							placeholder="Email"
							icon={<IconComponent type={IconType.AntDesign} name="mail" />}
							name="email"
						/>
						<EtripSelect onChange={onChange} data={roles} placeholder="Role" name="role" />
						<EtripTextInput
							onChange={onChange}
							placeholder="Password"
							secureTextEntry
							icon={<IconComponent type={IconType.FontAwesome} name="lock" />}
							name="password"
						/>
					</View>
				</View>
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white }}>
				<ButtonComponent loading={loading} onPress={onSubmit}>
					Create
				</ButtonComponent>
			</View>
		</View>
	);
}

const mapStateToProps = ({ user: { current_user } }) => {
	return {
		current_user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: () => dispatch(removeUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
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
		padding: 10,
	},
	inputStyle: {
		paddingLeft: 10,
		letterSpacing: 1.2,
		height: 20,
	},
	loginButton: {
		height: 50,
		backgroundColor: Colors.primaryThemeColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		marginTop: 10,
	},
});
