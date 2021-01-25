import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import EtripTextInput from 'components/input';
import EtripSelect from 'components/select';
import { Colors } from 'constants/ThemeConstants';
import ETripDivider from 'components/divider';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import Axios from 'axios';
import { connect } from 'react-redux';
import { editBookingDetails } from 'src/store/actions';
import { removeEmptySpace } from 'helpers';

const pod = [
	{
		label: 'Yes',
		value: 'yes',
	},
	{
		label: 'No',
		value: 'no',
	},
];

const OtherInfo = ({
	current_user,
	removeUser,
	product,
	weight,
	startKm,
	endKm,
	vehicle,
	driverName,
	contactNumber,
	boxCount,
	parking,
	containerWages,
	editBookingDetails,
	punture,
	podRequired,
	toll,
	halt,
	podSubmitted,
	rto,
	tollClaimable,
	haltClaimable,
	extraDelivery,
	extraDeliveryClaimable,
	parkingClaimable,
	containerWagesClaimable,
	rtoClaimable,
	agentName,
	agentCommission,
	agentCommissionClaimable,
	vehicleDDByUserID,
}) => {
	const [vehicles, setvehicles] = useState([]);
	const [products, setproducts] = useState([]);

	const onChange = ({ name, value }) => {
		editBookingDetails('otherInfo', name, value);
	};

	const getVehicle = () => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_VEHICLE), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				setvehicles(
					res.data &&
						res.data.map((res) => {
							return {
								label: res.ownerName,
								value: res._id,
							};
						})
				);
				console.log(
					res.data.map((res) => {
						return {
							label: res.ownerName,
							value: res._id,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
			});
	};
	const getProducts = () => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_PRODUCTS_DD), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				setproducts(
					res.data &&
						res.data.map((res) => {
							return {
								label: res._type,
								value: res._id,
							};
						})
				);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
			});
	};

	useEffect(() => {
		getVehicle();
		getProducts();
	}, []);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white, paddingHorizontal: 10 }}>
			<EtripSelect data={products} placeholder="Product" name="product" defaultValue={product} onChange={onChange} />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ width: '48%' }}>
					<EtripTextInput placeholder={'Weight (tons)'} keyboardType="phone-pad" name="weight" defaultValue={weight} onChange={onChange} />
				</View>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ width: '48%' }}>
					<EtripTextInput placeholder={'Start KM'} name="startKm" keyboardType="phone-pad" defaultValue={startKm} onChange={onChange} />
				</View>
				<View style={{ width: '48%' }}>
					<EtripTextInput
						// error={removeEmptySpace(endKm) - removeEmptySpace(startKm) < 1}
						errorText="End KM not Valid"
						placeholder={'End KM'}
						name="endKm"
						keyboardType="phone-pad"
						defaultValue={endKm}
						onChange={onChange}
					/>
				</View>
			</View>
			<EtripSelect data={vehicleDDByUserID} placeholder="Vehicle" name="vehicle" defaultValue={vehicle} onChange={onChange} />
			<EtripTextInput placeholder={'Driver Name'} name="driverName" defaultValue={driverName} onChange={onChange} />
			<EtripTextInput
				placeholder={'Driver Contact Number'}
				keyboardType="phone-pad"
				name="contactNumber"
				defaultValue={contactNumber}
				onChange={onChange}
			/>
			<EtripTextInput
				placeholder={'No. Of Boxes Loading'}
				keyboardType="phone-pad"
				name="boxCount"
				defaultValue={boxCount}
				onChange={onChange}
			/>
			<ETripDivider withOr text="X" />
			<TextComponent style={{ alignSelf: 'center', fontSize: 18, textDecorationLine: 'underline' }} type={FontType.BOLD}>
				Other Expenses
			</TextComponent>
			{/* <EtripTextInput placeholder={'Parking Charges'} onChange={onChange} /> */}
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput placeholder={'Toll Charges'} keyboardType="phone-pad" name="toll" defaultValue={toll} onChange={onChange} />
				</View>
				{toll ? <CheckBox checked={tollClaimable} onPress={() => onChange({ name: 'tollClaimable', value: !tollClaimable })} /> : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput placeholder={'Halt Charges'} keyboardType="phone-pad" name="halt" defaultValue={halt} onChange={onChange} />
				</View>
				{halt ? <CheckBox checked={haltClaimable} onPress={() => onChange({ name: 'haltClaimable', value: !haltClaimable })} /> : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput
						placeholder={'Extra Delivery Charges'}
						keyboardType="phone-pad"
						name="extraDelivery"
						defaultValue={extraDelivery}
						onChange={onChange}
					/>
				</View>
				{extraDelivery ? (
					<CheckBox
						checked={extraDeliveryClaimable}
						onPress={() => onChange({ name: 'extraDeliveryClaimable', value: !extraDeliveryClaimable })}
					/>
				) : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput
						placeholder={'Parking Charges'}
						keyboardType="phone-pad"
						name="parking"
						defaultValue={parking}
						onChange={onChange}
					/>
				</View>
				{parking ? (
					<CheckBox checked={parkingClaimable} onPress={() => onChange({ name: 'parkingClaimable', value: !parkingClaimable })} />
				) : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput
						placeholder={'Container Work Charges'}
						keyboardType="phone-pad"
						name="containerWages"
						defaultValue={containerWages}
						onChange={onChange}
					/>
				</View>
				{containerWages ? (
					<CheckBox
						checked={containerWagesClaimable}
						onPress={() => onChange({ name: 'containerWagesClaimable', value: !containerWagesClaimable })}
					/>
				) : null}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput
						placeholder={'RTO/PC/Checkpost Charges'}
						keyboardType="phone-pad"
						name="rto"
						defaultValue={rto}
						onChange={onChange}
					/>
				</View>
				{rto ? <CheckBox checked={rtoClaimable} onPress={() => onChange({ name: 'rtoClaimable', value: !rtoClaimable })} /> : null}
			</View>

			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput placeholder={'Agent Name'} name="agentName" defaultValue={agentName} onChange={onChange} />
				</View>
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 8 }}>
					<EtripTextInput
						placeholder={'Agent Commission'}
						keyboardType="phone-pad"
						name="agentCommission"
						defaultValue={agentCommission}
						onChange={onChange}
					/>
				</View>
				{agentCommission ? (
					<CheckBox
						checked={agentCommissionClaimable}
						onPress={() => onChange({ name: 'agentCommissionClaimable', value: !agentCommissionClaimable })}
					/>
				) : null}
			</View>

			<EtripSelect data={pod} placeholder="POD Required" name="podRequired" defaultValue={podRequired} onChange={onChange} />
		</ScrollView>
	);
};
const mapStateToProps = ({
	user: { current_user, vehicleDDByUserID },
	bookingDetails: {
		otherInfo: {
			product,
			weight,
			startKm,
			endKm,
			vehicle,
			driverName,
			contactNumber,
			boxCount,
			punture,
			podRequired,
			toll,
			halt,
			extraDelivery,
			parking,
			containerWages,
			rto,
			agentCommission,
			pod,
			podSubmitted,
			tollClaimable,
			haltClaimable,
			extraDeliveryClaimable,
			parkingClaimable,
			containerWagesClaimable,
			rtoClaimable,
			agentCommissionClaimable,
			agentName,
		},
	},
}) => {
	return {
		product,
		weight,
		startKm,
		endKm,
		vehicle,
		driverName,
		contactNumber,
		boxCount,
		parking,
		containerWages,
		punture,
		podRequired,
		current_user,
		toll,
		halt,
		extraDelivery,
		pod,
		rto,
		podSubmitted,
		tollClaimable,
		haltClaimable,
		extraDeliveryClaimable,
		parkingClaimable,
		containerWagesClaimable,
		rtoClaimable,
		agentName,
		agentCommission,
		agentCommissionClaimable,
		vehicleDDByUserID,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editBookingDetails: (field, label, value) => dispatch(editBookingDetails(field, label, value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherInfo);
