import React, { useEffect, useState, useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from 'components/header';
import TextComponent from 'components/text';
import { showToast } from 'components/toast';
import { FontType, IconType, TOAST_VARIABLES } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import EtripTextInput from 'components/input';
import ButtonComponent from 'components/button-component';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { connect } from 'react-redux';
import IconComponent from 'components/icon-component';
import { Pressable } from 'react-native';
import { colors } from 'react-native-elements';
import { removeUser } from 'src/store/actions';

import { VehicleContext } from 'contexts/VehicleContext';

const sports = [
	{
		label: 'Football',
		value: 'football',
	},
	{
		label: 'Baseball',
		value: 'baseball',
	},
	{
		label: 'Hockey',
		value: 'hockey',
	},
];

function VehicleCreateScreen({ navigation, current_user, removeUser, route }) {
	const { vehicleList, clearVehicleList, removeVehicleList } = useContext(VehicleContext);

	const [vehicleListLocal, setvehicleListLocal] = useState(vehicleList);

	const [loading, setLoading] = useState(false);
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
	});

	useEffect(() => {
		setvehicleListLocal(vehicleList);
	}, [vehicleList]);

	const onChange = ({ name, value }) => {
		setVehicle({
			...vehicle,
			[name]: value,
		});
	};

	const onSubmit = () => {
		setLoading(true);
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
		} = vehicle;
		Axios.post(
			DOMAIN_API_URL(API_URL.ADD_VEHICLE),
			{
				ownerName,
				contactMobile1,
				contactMobile2,
				vehiceleList: vehicleList.map((vehicle) => {
					return {
						vehicleNumber: vehicle.vehicleNumber[0],
						vehicleModal: vehicle.vehicleModal,
					};
				}),
				city,
				pan,
				address,
				bankInfo: {
					bankName,
					branchName,
					ifsc,
					accountNumber,
				},
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
				// removeUser();
				setLoading(false);
				showToast(TOAST_VARIABLES.Error, JSON.stringify(err.response.data.message));
			});
	};

	const removeVehicle = (vehicleNumber) => {
		let vehicleList = vehicleListLocal.filter((vehicle) => vehicle.vehicleNumber !== vehicleNumber);
		setvehicleListLocal([...vehicleList]);
		removeVehicleList(vehicleNumber);
	};

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header title="Add Vehicle" />
			<ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View style={styles.sectionStyle}>
						<EtripTextInput placeholder="Owner Name" name={'ownerName'} onChange={onChange} />
						<EtripTextInput maxLength={10} placeholder="Phone Number 1" name={'contactMobile1'} onChange={onChange} />
						{/* <EtripTextInput placeholder="Vehicle number" name={'vehicleNumber'} onChange={onChange} />
						<EtripTextInput placeholder="Vehicle Modal" name={'vehicleModal'} onChange={onChange} /> */}

						<View style={{ padding: 10, backgroundColor: Colors.white, elevation: 3, borderRadius: 8 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<TextComponent type={FontType.BOLD}>Vehicles</TextComponent>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate('ChooseVehicle', {
											vehicleList: vehicleListLocal,
											screen: 'add',
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
								{vehicleListLocal.length > 0 ? (
									<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }} />
								) : null}
								{vehicleListLocal.map((vehicle, i) => (
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
											<View style={{ paddingBottom: 10 }}>
												<TextComponent type={FontType.BOLD}>{'Vehicle Name'}</TextComponent>
												<TextComponent style={{ color: Colors.primaryThemeColor }}>{vehicle.vehicleName}</TextComponent>
											</View>
											<View>
												<TextComponent type={FontType.BOLD}>{'Vehicle Modal'}</TextComponent>
												<TextComponent style={{ color: Colors.primaryThemeColor }}>{vehicle.vehicleModal}</TextComponent>
											</View>
										</View>
										<View style={{ alignItems: 'center', justifyContent: 'center' }}>
											<Pressable
												onPress={() =>
													navigation.navigate('ChooseVehicle', {
														vehicleList: vehicleListLocal,
														vehicle,
														activeItem: i,
														screen: 'add',
													})
												}
												style={{
													height: 30,
													width: 30,
													backgroundColor: Colors.green,
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 5,
													marginBottom: 5,
												}}>
												<IconComponent name="edit" type={IconType.AntDesign} color={Colors.white} />
											</Pressable>
											<Pressable
												style={{
													height: 30,
													width: 30,
													backgroundColor: Colors.like,
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 5,
												}}
												onPress={() => removeVehicle(vehicle.id)}>
												<IconComponent name="delete" type={IconType.AntDesign} color={Colors.white} />
											</Pressable>
										</View>
									</View>
								))}
							</View>
						</View>

						<EtripTextInput placeholder="City" name={'city'} onChange={onChange} />
						<EtripTextInput placeholder="Address" name={'address'} onChange={onChange} />
						<EtripTextInput placeholder="Pan No" name={'pan'} onChange={onChange} />
					</View>
					<View style={[{ paddingTop: 0 }]}>
						<TextComponent style={{ fontSize: 20, paddingLeft: 5, alignSelf: 'center' }}>Bank Details</TextComponent>
						<View style={[styles.sectionStyle, { paddingTop: 0 }]}>
							<EtripTextInput placeholder="Bank Name" name={'bankName'} onChange={onChange} />
							<EtripTextInput placeholder="Branch Name" name={'branchName'} onChange={onChange} />
							<EtripTextInput placeholder="Account Number" name={'accountNumber'} onChange={onChange} />
							<EtripTextInput placeholder="IFSC Code" name={'ifsc'} onChange={onChange} />
						</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCreateScreen);

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
