import {
	ADD_USER,
	REMOVE_USER,
	BOOKING_DETAILS,
	RESET_BOOKING_DETAILS,
	SET_CUSTOMER_DD,
	SET_VEHICLE_DD,
	SET_VEHICLE_BY_USER_ID,
} from './actionTypes';

export const setUser = (user) => {
	return {
		type: ADD_USER,
		payload: {
			current_user: user,
		},
	};
};

export const setCustomerDD = (customerDD) => {
	return {
		type: SET_CUSTOMER_DD,
		payload: {
			customerDD,
		},
	};
};

export const setVehicleDD = (vehicleDD) => {
	return {
		type: SET_VEHICLE_DD,
		payload: {
			vehicleDD,
		},
	};
};

export const setVehicleDDByUserID = (vehicleDD) => {
	return {
		type: SET_VEHICLE_BY_USER_ID,
		payload: {
			vehicleDD,
		},
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const editBookingDetails = (field, label, value) => {
	return {
		type: BOOKING_DETAILS,
		field,
		label,
		value,
	};
};

export const resetBookingDetails = () => {
	return {
		type: RESET_BOOKING_DETAILS,
	};
};
