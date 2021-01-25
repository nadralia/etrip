import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import EtripDatePicker from 'components/datepicker';
import EtripTextInput from 'components/input';
import EtripSelect from 'components/select';
import { Colors } from 'constants/ThemeConstants';
import { connect } from 'react-redux';
import { editBookingDetails } from 'src/store/actions';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';

const billTypeData = [
	{
		label: 'Cash',
		value: 'cash',
	},
	{
		label: 'Credit',
		value: 'credit',
	},
];
const bTypeData = [
	{
		label: 'Billing',
		value: 'billing',
	},
	{
		label: 'No Billing',
		value: 'no billing',
	},
];

const TripDetails = ({
	tripTitle,
	customerName,
	contactPerson,
	date,
	customerType,
	editBookingDetails,
	type,
	billType,
	current_user,
	customerDD,
	removeUser,
}) => {
	const onChange = ({ name, value }) => {
		console.log('------TripDetails-----@@@@----####', name, value);
		editBookingDetails('tripDetails', name, value);
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white, paddingHorizontal: 10 }}>
			<EtripSelect data={bTypeData} placeholder="Type" name="type" defaultValue={type} onChange={onChange} />
			<EtripTextInput placeholder={'Trip Name'} onChange={onChange} name="tripTitle" defaultValue={tripTitle} />
			<EtripDatePicker name="date" defaultValue={date} onChange={onChange} format="YYYY-MM-DD" />
			<EtripSelect data={customerDD} placeholder="Customer" name="customerName" defaultValue={customerName} onChange={onChange} />
			<EtripSelect data={billTypeData} placeholder="Billing Type" name="billType" defaultValue={billType} onChange={onChange} />
		</ScrollView>
	);
};

const mapStateToProps = ({
	user: { current_user, customerDD },
	bookingDetails: {
		tripDetails: { tripTitle, customerName, contactPerson, date, customerType, type, billType },
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
		current_user,
		customerDD,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editBookingDetails: (field, label, value) => dispatch(editBookingDetails(field, label, value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);
