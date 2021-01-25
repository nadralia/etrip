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
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { connect } from 'react-redux';
import Axios from 'axios';
import { showToast } from 'components/toast';

// const products = [
// 	{
// 		label: 'product1',
// 		value: 'football',
// 	},
// 	{
// 		label: 'product2',
// 		value: 'baseball',
// 	},
// 	{
// 		label: 'product3',
// 		value: 'hockey',
// 	},
// ];
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

function EditCustomer({ navigation, route, current_user, removeUser }) {
	const { params } = route;
	const id = params._id;
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [customer, setCustomer] = useState({
		companyName: '',
		contactName1: '',
		contactMobile1: '',
		contactMobile2: '',
		pan: '',
		gst: '',
		product: '',
		address: '',
		...params,
	});

	const onChange = ({ name, value }) => {
		setCustomer({
			...customer,
			[name]: value,
		});
	};

	const onSubmit = () => {
		console.log('customer', customer);
		setLoading(true);
		Axios.patch(
			`${DOMAIN_API_URL(API_URL.EDIT_CUSTOMER)}${id}`,
			{
				companyName,
				contactName1,
				contactMobile1,
				contactMobile2,
				pan,
				gst,
				product,
				address,
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
		Axios.delete(`${DOMAIN_API_URL(API_URL.DELETE_CUSTOMER)}${id}`, {
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

	const { companyName, contactName1, contactMobile1, contactName2, contactMobile2, address, gst, pan, product } = customer;

	return (
		<View style={{ flex: 1 }}>
			<Header title="Customer Detail" />
			<ScrollView contentContainerStyle={styles.container}>
				<EtripTextInput placeholder="Company Name" name="companyName" defaultValue={companyName} onChange={onChange} />
				<EtripTextInput placeholder="Contact Person 1" name="contactName1" defaultValue={contactName1} onChange={onChange} />
				<EtripTextInput placeholder="Mobile 1" name="contactMobile1" defaultValue={contactMobile1} onChange={onChange} />
				<EtripTextInput placeholder="Contact Person 2" name="contactName2" defaultValue={contactName2} onChange={onChange} />
				<EtripTextInput placeholder="Mobile 2" name="contactMobile2" defaultValue={contactMobile2} onChange={onChange} />
				<EtripTextInput placeholder="Address" name="address" defaultValue={address} onChange={onChange} />
				<EtripTextInput placeholder="GST No" name="gst" defaultValue={gst} />
				<EtripTextInput placeholder="Pan No" name="pan" defaultValue={pan} />
				<EtripSelect data={products} placeholder="Select an Item" name="product" defaultValue={product} onChange={onChange} />
				{/* <View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1, marginRight: 3 }}>
						<EtripTextInput placeholder="Latitude" />
					</View>
					<View style={{ flex: 1 }}>
						<EtripTextInput placeholder="Longitude" />
					</View>
				</View> */}
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between' }}>
				<ButtonComponent onPress={deleteFun} loading={deleteLoading} style={{ width: '48%', backgroundColor: Colors.danger }}>
					Delete Customer
				</ButtonComponent>
				<ButtonComponent onPress={onSubmit} loading={loading} style={{ width: '48%' }}>
					Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);

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
