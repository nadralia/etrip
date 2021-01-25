import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Header from 'components/header';
import { FontType, TOAST_VARIABLES } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import EtripTextInput from 'components/input';
import EtripSelect from 'components/select';
import ButtonComponent from 'components/button-component';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { connect } from 'react-redux';
import { getDrivesDD } from 'src/store/thunk-actions';
import { showToast } from 'components/toast';

const products = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Food products',
		value: 'Food products',
	},
	{
		label: 'Electronics',
		value: 'Electronics',
	},
];

function CustomerCreateScreen({ navigation, current_user, removeUser, getDrivesDD }) {
	const [loading, setLoading] = useState(false);
	const [customer, setCustomer] = useState({
		companyName: '',
		contactName1: '',
		contactMobile1: '',
		contactMobile2: '',
		pan: '',
		gst: '',
		Product: '',
		address: '',
	});

	const onChange = ({ name, value }) => {
		setCustomer({
			...customer,
			[name]: value,
		});
	};

	const onSubmit = () => {
		setLoading(true);

		Axios.post(
			DOMAIN_API_URL(API_URL.ADD_CUSTOMER),
			{
				...customer,
			},
			{
				headers: {
					'x-access-token': current_user.jwt,
					'x-user-id': current_user.userId,
				},
			}
		)
			.then((res) => {
				getDrivesDD(current_user);
				navigation.goBack();
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				// removeUser();
				setLoading(false);
				showToast(TOAST_VARIABLES.Error, JSON.stringify(err.response.data.message));
			});
	};

	return (
		<View style={{ flex: 1 }}>
			<Header title="Create Customer" />
			<ScrollView contentContainerStyle={styles.container}>
				<EtripTextInput placeholder="Company Name" name={'companyName'} onChange={onChange} />
				{/* <EtripTextInput placeholder="Phone Number" name={''} onChange={onChange} /> */}
				<EtripTextInput placeholder="Contact Person 1" name={'contactName1'} onChange={onChange} />
				<EtripTextInput placeholder="Mobile 1" maxLength={10} name={'contactMobile1'} onChange={onChange} />
				<EtripTextInput placeholder="Contact Person 2" name={'contactName2'} onChange={onChange} />
				<EtripTextInput placeholder="Mobile 2" maxLength={10} name={'contactMobile2'} onChange={onChange} />
				<EtripTextInput placeholder="Address" name={'address'} onChange={onChange} />
				<EtripTextInput placeholder="GST No" name={'gst'} onChange={onChange} />
				<EtripTextInput placeholder="Pan No" name={'pan'} onChange={onChange} />
				<EtripSelect data={products} placeholder="Select an Item" name={'product'} onChange={onChange} />
				{/* <View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1, marginRight: 3 }}>
						<EtripTextInput placeholder="Latitude" name={''} onChange={onChange} />
					</View>
					<View style={{ flex: 1 }}>
						<EtripTextInput placeholder="Longitude" name={''} onChange={onChange} />
					</View>
				</View> */}
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white }}>
				<ButtonComponent loading={loading} onPress={() => navigation.navigate('Home')} onPress={onSubmit}>
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
		getDrivesDD: (current_user) => dispatch(getDrivesDD(current_user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreateScreen);

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		// paddingBottom: 10,
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
