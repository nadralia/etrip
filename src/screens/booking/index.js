import React, { useCallback } from 'react';
import { View, Alert, BackHandler } from 'react-native';
import Moment from 'moment';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'components/progress-steps';
import Header from 'components/header';
import { Colors } from 'constants/ThemeConstants';
import OtherInfo from './otherInfo';
import PickDrop from './pickDrop';
import TripDetails from './tripDetails';
import TripFares from './tripFares';
import { connect } from 'react-redux';
import { removeUser, resetBookingDetails } from 'src/store/actions';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';

const Booking = ({
	navigation,
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
	removeUser,
	resetBookingDetails,
}) => {
	const defaultScrollViewProps = {
		keyboardShouldPersistTaps: 'handled',
		contentContainerStyle: {
			flex: 1,
			justifyContent: 'center',
		},
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				Alert.alert('Hold on!', 'Are you sure you want to go back?', [
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{ text: 'YES', onPress: () => navigation.goBack() },
				]);
				return true;
			};

			const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

			return () => backHandler.remove();
		}, [])
	);

	const onNextStep = () => {
		console.log('called next step');
	};

	const onPaymentStepComplete = () => {
		alert('Payment step completed!');
	};

	const onPrevStep = () => {
		console.log('called previous step');
	};

	const onSubmitSteps = () => {
		console.log('-----Booking Submit -------', {
			type,
			tripTitle,
			customer: customerName,
			billType,
			date,
			vehicle,
			pickupLocationList: [...pickupLocation],
			dropLocationList: [...dropLocations],
		});
		const dateConvert = Moment(date).format('d MMM');
		const formattedDate = format(date, 'MMMM do, yyyy H:mma');

		console.log('-----Convert Date--------', dateConvert, formattedDate);

		Axios.post(
			DOMAIN_API_URL(API_URL.ADD_TRIP),
			{
				// bookingId: 'MDU209002',
				type,
				tripTitle,
				customer: customerName,
				billType,
				date,
				pickupLocationList: [...pickupLocation],
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
				inDraft: 'no',
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
				navigation.goBack();
				resetBookingDetails();
			})
			.catch((err) => {
				console.log(err);
				// removeUser();
				// setLoading(false);
				// alertRef.current.alertWithType('error', 'Error', 'Error');
			});
	};

	const nextButtonTextStyle = {
		color: Colors.primaryThemeColor,
		bottom: 0,
	};

	const prevButtonTextStyle = {
		color: Colors.like,
	};

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header title="Create Booking" />
			<ProgressSteps labelFontFamily="ProximaNova-Regular" labelFontSize={12} borderWidth={2}>
				<ProgressStep
					label="Trip Details"
					onPrevious={onPrevStep}
					nextBtnTextStyle={nextButtonTextStyle}
					scrollViewProps={defaultScrollViewProps}>
					<TripDetails />
				</ProgressStep>
				<ProgressStep
					label="Pick & Drop"
					onNext={onNextStep}
					nextBtnTextStyle={nextButtonTextStyle}
					previousBtnTextStyle={prevButtonTextStyle}
					onPrevious={onPrevStep}
					scrollViewProps={defaultScrollViewProps}>
					<PickDrop />
				</ProgressStep>
				<ProgressStep
					label="Other Info"
					onNext={onNextStep}
					nextBtnTextStyle={nextButtonTextStyle}
					previousBtnTextStyle={prevButtonTextStyle}
					onPrevious={onPrevStep}
					scrollViewProps={defaultScrollViewProps}>
					<OtherInfo />
				</ProgressStep>
				<ProgressStep
					label="Trip Fares"
					finishBtnText="Create"
					onPrevious={onPrevStep}
					nextBtnTextStyle={nextButtonTextStyle}
					previousBtnTextStyle={prevButtonTextStyle}
					onSubmit={onSubmitSteps}
					scrollViewProps={defaultScrollViewProps}>
					<TripFares />
				</ProgressStep>
			</ProgressSteps>
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
		resetBookingDetails: () => dispatch(resetBookingDetails()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
