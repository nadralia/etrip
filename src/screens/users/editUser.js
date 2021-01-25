import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Header from 'components/header';
import { FontType, IconType, TOAST_VARIABLES } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import EtripTextInput from 'components/input';
import EtripSelect from 'components/select';
import ButtonComponent from 'components/button-component';
import IconComponent from 'components/icon-component';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
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

function EditUser({ navigation, route, current_user, removeUser }) {
	const { params } = route;
	const id = params._id;
	const [disabled, setDisabled] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		// mobile: '',
		role: '',
		password: '',
		email: '',
		...params,
	});
	const onChange = ({ name, value }) => {
		setUser({
			...user,
			[name]: value,
		});
	};
	const onSubmit = () => {
		setLoading(true);
		Axios.patch(
			`${DOMAIN_API_URL(API_URL.EDIT_USER)}${id}`,
			{
				firstName,
				lastName,
				// mobile: '',
				role,
				password,
				email,
			},
			{
				headers: {
					'x-access-token': current_user.jwt,
					'x-user-id': current_user.userId,
				},
			}
		)
			.then((res) => {
				navigation.goBack();
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
				setLoading(false);
				showToast(TOAST_VARIABLES.Error, JSON.stringify(err.response.data.message));
			});
	};

	const deleteFun = () => {
		setdeleteLoading(true);
		Axios.delete(`${DOMAIN_API_URL(API_URL.DELETE_USER)}${id}`, {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				navigation.goBack();
				setdeleteLoading(false);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
				setdeleteLoading(false);
			});
	};

	const { firstName, lastName, mobile, email, password, role } = user;

	// const toggleDisabled = () => setDisabled(! );
	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header title="User Detail" />
			<ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View style={styles.sectionStyle}>
						<EtripTextInput
							onChange={onChange}
							placeholder="First Name"
							icon={<IconComponent type={IconType.AntDesign} name="user" />}
							name="firstName"
							defaultValue={firstName}
						/>
						<EtripTextInput
							onChange={onChange}
							placeholder="Last Name"
							icon={<IconComponent type={IconType.AntDesign} name="user" />}
							name="lastName"
							defaultValue={lastName}
						/>
						{/* <EtripTextInput
							onChange={onChange}
							maxLength={10}
							placeholder="Mobile Number"
							icon={<IconComponent type={IconType.AntDesign} name="mobile" name="mobile1" />}
							name="mobile"
							defaultValue={mobile}
						/> */}
						<EtripTextInput
							onChange={onChange}
							placeholder="Email"
							icon={<IconComponent type={IconType.AntDesign} name="mail" />}
							name="email"
							defaultValue={email}
						/>
						<EtripSelect onChange={onChange} data={roles} placeholder="Role" name="role" defaultValue={role} />
						<EtripTextInput
							onChange={onChange}
							placeholder="Password"
							secureTextEntry
							icon={<IconComponent type={IconType.FontAwesome} name="lock" />}
							name="password"
							defaultValue={password}
						/>
					</View>
				</View>
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between' }}>
				<ButtonComponent onPress={deleteFun} loading={deleteLoading} style={{ width: '48%', backgroundColor: Colors.danger }}>
					Delete User
				</ButtonComponent>
				<ButtonComponent onPress={onSubmit} loading={loading} style={{ width: '48%' }}>
					{disabled ? 'Edit' : 'Save'} Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 10,
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
		// padding: 20,
	},
	inputStyle: {
		paddingLeft: 10,
		letterSpacing: 1.2,
		height: 20,
	},
	loginButton: { height: 50, backgroundColor: Colors.primaryThemeColor, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});
