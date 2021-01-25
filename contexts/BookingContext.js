import React, { createContext, useState } from 'react';
import * as R from 'ramda';
import uuid from 'react-native-uuid';

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
	const [booking, setBooking] = useState({
		tripDetails: {},
		pickupDrop: {
			pickupLocation: [],
			dropLocations: [],
		},
		otherInfo: {},
		tripFares: {},
	});

	console.log('-----------@@@Booking@@@@--------', booking);

	/** Updates a field in the FormObject
	 *	@type {String} label  The field key
	 *	@type {Any}	value   The value for that field
	 *	@return {void}
	 */
	const setField = R.curry((label, value) => {
		setBooking({ ...booking, [label]: value });
	});

	/**
	 * Updates fields in the FormObject
	 * @param  {Object} props An updated FormObject
	 * @return void
	 */
	const setFields = (props) => {
		setBooking({ ...booking, ...props });
	};

	return <BookingContext.Provider value={{ booking, setField, setFields }}>{children}</BookingContext.Provider>;
};

export default BookingContextProvider;
