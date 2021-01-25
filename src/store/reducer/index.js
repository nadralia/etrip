import * as actionTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';

const user_initalState = {
	current_user: null,
	customerDD: [],
	vehicleDD: [],
	vehicleDDByUserID: [],
};

const booking_initalState = {
	tripDetails: {
		tripTitle: '',
		customerName: '',
		contactPerson: '',
		date: '',
		customerType: '',
		billType: '',
		type: '',
	},
	pickupDrop: {
		pickupLocation: [],
		dropLocations: [],
	},
	otherInfo: {
		product: '',
		weight: '',
		startKm: '',
		endKm: '',
		vehicle: '',
		driverName: '',
		contactNumber: '',
		boxCount: '',
		toll: 0,
		halt: 0,
		extraDelivery: 0,
		parking: 0,
		containerWages: 0,
		rto: 0,
		tollClaimable: false,
		haltClaimable: false,
		extraDeliveryClaimable: false,
		parkingClaimable: false,
		containerWagesClaimable: false,
		rtoClaimable: false,
		punture: 0,
		podRequired: 'no',
		podSubmitted: false,
		agentName: '',
		agentCommission: 0,
		agentCommissionClaimable: false,
	},
	tripFares: {
		totalTripCost: 0,
		customerAdvance: 0,
		transportedAdvance: 0,
		totalDriverCost: 0,
		customerType: 'Fixed',
		driverType: 'Fixed',
		podSubmitted: false,
		podSubmittedOn: '',
		fullPaymentPaidOn: '',
		advanceTo: 'Driver',
	},
};

const user_reducer = (state = user_initalState, action) => {
	switch (action.type) {
		case actionTypes.ADD_USER:
			return {
				...state,
				current_user: action.payload.current_user,
			};
		case actionTypes.REMOVE_USER:
			return {
				...state,
				current_user: null,
			};
		case actionTypes.SET_CUSTOMER_DD:
			return {
				...state,
				customerDD: action.payload.customerDD,
			};
		case actionTypes.SET_VEHICLE_DD:
			return {
				...state,
				vehicleDD: action.payload.vehicleDD,
			};
		case actionTypes.SET_VEHICLE_BY_USER_ID:
			return {
				...state,
				vehicleDDByUserID: action.payload.vehicleDD,
			};
		default:
			return state;
	}
};
const booking_reducer = (state = booking_initalState, action) => {
	switch (action.type) {
		case actionTypes.BOOKING_DETAILS:
			return {
				...state,
				[action.field]: {
					...state[action.field],
					[action.label]: action.value,
				},
			};
		case actionTypes.RESET_BOOKING_DETAILS:
			return {
				...state,
				...booking_initalState,
			};
		default:
			return state;
	}
};

const root_reducer = combineReducers({
	user: user_reducer,
	bookingDetails: booking_reducer,
});

export default root_reducer;
