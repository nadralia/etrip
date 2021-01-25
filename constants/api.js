const DOMAIN = 'http://139.59.35.224';

export const API_URL = {
	LOGIN: '/auth/login',

	//CUSTOMER
	GET_CUSTOMER: '/customers',
	ADD_CUSTOMER: '/customers',
	EDIT_CUSTOMER: '/customers/',
	DELETE_CUSTOMER: '/customers/',

	//VEHICLE
	GET_VEHICLE: '/vehicles',
	GET_VEHICLES_BY_USER_ID: '/vehiclesByUserId',
	ADD_VEHICLE: '/vehicles',
	EDIT_VEHICLE: '/vehicles/',
	DELETE_VEHICLE: '/vehicles/',

	//USER
	GET_USER: '/users',
	ADD_USER: '/users',
	EDIT_USER: '/users/',
	DELETE_USER: '/users/',

	//DD
	GET_VEHICLE_DD: '/master/vehicles',
	GET_PRODUCTS_DD: '/master/products',

	//TRIPS
	ADD_TRIP: '/trips',
	GET_TRIPS: '/trips',
};

export const DOMAIN_API_URL = (value) => DOMAIN + value;
