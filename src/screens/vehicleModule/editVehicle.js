import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import Header from 'components/header';
import { FontType, IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import EtripTextInput from 'components/input';
import EtripSelect from 'components/select';
import ButtonComponent from 'components/button-component';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { connect } from 'react-redux';
import { removeUser } from 'src/store/actions';
import IconComponent from 'components/icon-component';

import { VehicleContext } from 'contexts/VehicleContext';

const products = [
	{
		label: 'Product1',
		value: 'football',
	},
	{
		label: 'Product2',
		value: 'baseball',
	},
	{
		label: 'Product3',
		value: 'hockey',
	},
];

function EditVehicle({ navigation, route, current_user, removeUser }) {
	const { vehicleList, clearVehicleList, removeVehicleList } = useContext(VehicleContext);
	const { params } = route;
	const id = params._id;

	const [loading, setLoading] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [vehicle, setVehicle] = useState({
		ownerName: '',
		contactMobile1: '',
		contactMobile2: '',
		vehicleNumber: '',
		vehicleModal: '',
		city: '',
		pan: '',
		address: '',
		bankName: '',
		branchName: '',
		ifsc: '',
		accountNumber: '',
		...params,
		...params.bankInfo,
	});

	const onChange = ({ name, value }) => {
		setVehicle({
			...vehicle,
			[name]: value,
		});
	};

	const {
		ownerName,
		contactMobile1,
		contactMobile2,
		vehicleNumber,
		vehicleModal,
		city,
		pan,
		address,
		bankName,
		branchName,
		ifsc,
		accountNumber,
		vehiceleList,
	} = vehicle;

	const onSubmit = () => {
		const { bankName, branchName, ifsc, accountNumber } = vehicle;
		const array3 = [...vehiceleList, ...vehicleList];

		console.log('--------00000000----------', array3);
		setLoading(true);
		Axios.patch(
			`${DOMAIN_API_URL(API_URL.EDIT_VEHICLE)}${id}`,
			{
				ownerName,
				contactMobile1,
				contactMobile2,
				vehicleNumber,
				vehicleModal,
				city,
				pan,
				address,
				bankInfo: { bankName, branchName, ifsc, accountNumber },
				vehiceleList: array3,
			},
			{
				headers: {
					'x-access-token': current_user.jwt,
					'x-user-id': current_user.userId,
				},
			}
		)
			.then((res) => {
				clearVehicleList();
				navigation.goBack();
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
				setLoading(false);
			});
	};

	const deleteFun = () => {
		setdeleteLoading(true);
		Axios.delete(`${DOMAIN_API_URL(API_URL.DELETE_VEHICLE)}${id}`, {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				clearVehicleList();
				navigation.goBack();
				setdeleteLoading(false);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
				setdeleteLoading(false);
			});
	};

	const removeVehicle = (_id) => {
		let vehiceleList = vehicle.vehiceleList.filter((vehicle) => vehicle._id !== _id);
		setVehicle({ ...vehicle, vehiceleList });
	};

	// console.log('vehiceleList...DD', vehicle, vehicle.vehiceleList);
	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header title="Vehicle Detail" />
			<ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View style={styles.sectionStyle}>
						<EtripTextInput onChange={onChange} placeholder="Owner Name" name="ownerName" defaultValue={ownerName} />
						<EtripTextInput onChange={onChange} placeholder="Phone Number 1" name="contactMobile1" defaultValue={contactMobile1} />
						<View style={{ padding: 10, backgroundColor: Colors.white, elevation: 3, borderRadius: 8 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<TextComponent type={FontType.BOLD}>Vehicles</TextComponent>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate('ChooseVehicle', {
											screen: 'edit',
										})
									}
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										height: 30,
										width: 30,
										borderRadius: 8,
										backgroundColor: Colors.primaryThemeColor,
									}}>
									<IconComponent name="plus" color={Colors.white} type={IconType.AntDesign} />
								</TouchableOpacity>
							</View>
							<View>
								{vehicle.vehiceleList.length > 0 ? (
									<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }} />
								) : null}
								{vehicle.vehiceleList.map((vehicle, i) => (
									<View
										key={i}
										style={{
											justifyContent: 'space-between',
											paddingVertical: 5,
											flexDirection: 'row',
											borderWidth: 1,
											padding: 5,
											borderColor: Colors.whiteGrey,
											borderRadius: 5,
											marginTop: 5,
										}}>
										<View>
											<TextComponent type={FontType.BOLD}>{'Vehicle Modal'}</TextComponent>
											<TextComponent style={{ color: Colors.primaryThemeColor }}>{vehicle.vehicleModal}</TextComponent>
										</View>
										<View>
											<Pressable
												style={{
													height: 30,
													width: 30,
													backgroundColor: Colors.like,
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 5,
												}}
												onPress={() => removeVehicle(vehicle._id)}>
												<IconComponent name="delete" type={IconType.AntDesign} color={Colors.white} />
											</Pressable>
										</View>
									</View>
								))}

								{vehicleList.map((vehicle, i) => (
									<View
										key={i}
										style={{
											justifyContent: 'space-between',
											paddingVertical: 5,
											flexDirection: 'row',
											borderWidth: 1,
											padding: 5,
											borderColor: Colors.whiteGrey,
											borderRadius: 5,
											marginTop: 5,
										}}>
										<View>
											<TextComponent type={FontType.BOLD}>{'Vehicle Modal'}</TextComponent>
											<TextComponent style={{ color: Colors.primaryThemeColor }}>{vehicle.vehicleModal}</TextComponent>
										</View>
										<View>
											<Pressable
												style={{
													height: 30,
													width: 30,
													backgroundColor: Colors.like,
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 5,
												}}
												onPress={() => removeVehicleList(vehicle.id)}>
												<IconComponent name="delete" type={IconType.AntDesign} color={Colors.white} />
											</Pressable>
										</View>
									</View>
								))}
							</View>
						</View>
						<EtripTextInput onChange={onChange} placeholder="City" name="city" defaultValue={city} />
						<EtripTextInput onChange={onChange} placeholder="Address" name="address" defaultValue={address} />
						<EtripTextInput onChange={onChange} placeholder="Pan No" name="pan" defaultValue={pan} />
					</View>
					<View style={[{ paddingTop: 10 }]}>
						<TextComponent style={{ fontSize: 20, paddingLeft: 5, alignSelf: 'center' }}>Bank Details</TextComponent>
						<View style={[styles.sectionStyle, { paddingTop: 0 }]}>
							<EtripTextInput placeholder="Bank Name" onChange={onChange} name="bankName" defaultValue={bankName} />
							<EtripTextInput placeholder="Bank Name" onChange={onChange} name="branchName" defaultValue={branchName} />
							<EtripTextInput placeholder="Account Number" onChange={onChange} name="ifsc" defaultValue={ifsc} />
							<EtripTextInput placeholder="IFSC Code" onChange={onChange} name="accountNumber" defaultValue={accountNumber} />
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between' }}>
				<ButtonComponent onPress={deleteFun} loading={deleteLoading} style={{ width: '48%', backgroundColor: Colors.danger }}>
					Delete Vehicle
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

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicle);

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
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
