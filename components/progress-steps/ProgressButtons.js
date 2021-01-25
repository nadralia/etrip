import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import IconComponent from 'components/icon-component';
import TextComponent from 'components/text';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import { removeUser } from 'src/store/actions';

const ProgressButtons = (props) => {
	const {
		current_user,
		removeUser,
		tripTitle,
		customerName,
		contactPerson,
		date,
		customerType,
		billType,
		type,
		pickupLocation,
		dropLocations,
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
		totalTripCost,
		customerAdvance,
		transportedAdvance,
		totalDriverCost,
		stepCount,
		activeStep,
	} = props;

	console.log('---------------@@@@@@@--Booking ----Info', props);
	const navigation = useNavigation();
	const onCreate = (isDraft = false) => {
		// console.log('current_user', {
		// 	// bookingId: 'MDU209002',
		// 	type,
		// 	tripTitle,
		// 	customer: customerName,
		// 	billType,
		// 	date,
		// 	pickupLocationList: [pickupLocation],
		// 	dropLocationList: [...dropLocations],
		// 	product,
		// 	weight,
		// 	startKm,
		// 	endKm,
		// 	vehicle,
		// 	driverName,
		// 	contactNumber,
		// 	boxCount,
		// 	chargesCollected: {
		// 		parking,
		// 		containerWages,
		// 		punture: 0,
		// 	},
		// 	podRequired: podRequired ? true : false,
		// 	inDraft: isDraft,
		// 	fareCalc: {
		// 		totalTripCost,
		// 		customerAdvance,
		// 		transportedAdvance,
		// 		totalDriverCost,
		// 	},
		// });

		Axios.post(
			DOMAIN_API_URL(API_URL.ADD_TRIP),
			{
				// bookingId: 'MDU209002',
				type,
				tripTitle,
				customer: customerName,
				billType,
				date,
				pickupLocationList: [pickupLocation],
				dropLocationList: [...dropLocations],
				product,
				weight,
				startKm,
				endKm,
				vehicle,
				driverName,
				contactNumber,
				boxCount,
				chargesCollected: {
					parking,
					containerWages,
					punture: 0,
				},
				podRequired: podRequired ? true : false,
				inDraft: isDraft ? 'yes' : 'no',
				fareCalc: {
					totalTripCost,
					customerAdvance,
					transportedAdvance,
					totalDriverCost,
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
				// alertRef.current.alertWithType('success', 'Success', 'User Created Successfully');
				navigation.goBack();
				// setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				// removeUser();
				// setLoading(false);
				// alertRef.current.alertWithType('error', 'Error', 'Error');
			});
	};
	return (
		<View
			style={{
				flexDirection: 'row',
				borderTopWidth: 1,
				borderColor: Colors.accDividerColor,
				backgroundColor: Colors.white,
				paddingHorizontal: 10,
				paddingVertical: 5,
				alignItems: 'center',
			}}>
			{/* <TextComponent>{activeStep}</TextComponent> */}
			<View style={{ flex: 1 }}>{props.renderPreviousButton()}</View>
			<TouchableOpacity onPress={() => onCreate(true)} style={{ flex: 1, alignItems: 'center' }}>
				<IconComponent type={IconType.Entypo} name="save" size={20} color={Colors.primaryThemeColor} />
			</TouchableOpacity>
			<View style={{ flex: 1, alignItems: 'flex-end' }}>{props.renderNextButton()}</View>
		</View>
	);
};

const mapStateToProps = ({
	user: { current_user },
	bookingDetails: {
		tripDetails: { tripTitle, customerName, contactPerson, date, customerType, type, billType },
		pickupDrop: { pickupLocation, dropLocations },
		otherInfo: { product, weight, startKm, endKm, vehicle, driverName, contactNumber, boxCount, parking, containerWages, punture, podRequired },
		tripFares: { totalTripCost, customerAdvance, transportedAdvance, totalDriverCost },
	},
}) => {
	return {
		tripTitle,
		customerName,
		contactPerson,
		date,
		customerType,
		billType,
		type,
		tripTitle,
		customerName,
		contactPerson,
		date,
		customerType,
		billType,
		type,
		pickupLocation,
		dropLocations,
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
		totalTripCost,
		customerAdvance,
		transportedAdvance,
		totalDriverCost,
		current_user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: (field, label, value) => dispatch(removeUser(field, label, value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressButtons);
