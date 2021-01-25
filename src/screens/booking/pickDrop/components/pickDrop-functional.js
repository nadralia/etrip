import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editBookingDetails } from 'src/store/actions';

import PickDropPresentational from './pickDrop-presentational';

const PickDropFunctional = ({ editBookingDetails, defaultDropLocations = [], defaultPickupLocation = [] }) => {
	const [pickupLocation, setPickupLocation] = useState(defaultPickupLocation);
	const [dropLocations, setDropLocations] = useState(defaultDropLocations);
	const [modalState, setModalState] = useState({
		dropUpModalVisible: false,
		pickUpModalVisible: false,
	});
	const [state, setState] = useState({
		addressName: '',
		loadingCharges: null,
		unLoadingCharges: null,
		momul: null,
		claimable: false,
		momulClaimable: false,
	});

	const onModalChange = (name, value) => {
		setModalState({
			...state,
			[name]: value,
		});
	};

	const onChange = ({ name, value }) => {
		console.log(name, value);
		setState({
			...state,
			[name]: value,
		});
	};

	const updatellocationData = (location, index, isDrop = false) => {
		let dropLocationsTemp = [];
		let pickupTemp = [];
		if (isDrop) {
			dropLocationsTemp = dropLocations.map((droplocation, i) => {
				if (i === index) {
					return {
						...droplocation,
						...location,
					};
				} else {
					droplocation;
				}
			});
			setDropLocations(dropLocationsTemp);
			editBookingDetails('pickupDrop', 'dropLocations', dropLocationsTemp);
		} else {
			pickupTemp = pickupLocation.map((pickupLocation, i) => {
				if (i === index) {
					return {
						...pickupLocation,
						...location,
					};
				} else {
					pickupLocation;
				}
			});
			setPickupLocation(pickupTemp);
			editBookingDetails('pickupDrop', 'pickupLocation', pickupTemp);
		}
	};

	const addPickupLocation = (pickupLocationValue) => {
		setPickupLocation([...pickupLocation, { ...pickupLocationValue, address: pickupLocationValue.addressName }]);
		setModalState({
			...modalState,
			pickUpModalVisible: false,
		});
		setState({
			addressName: '',
			loadingCharges: null,
			momul: null,
			claimable: false,
			momulClaimable: false,
		});
		editBookingDetails('pickupDrop', 'pickupLocation', [...pickupLocation, { ...pickupLocationValue, address: pickupLocationValue.addressName }]);
	};

	const addDropLocation = (dropLocation) => {
		setDropLocations([...dropLocations, { ...dropLocation, address: dropLocation.addressName }]);
		setModalState({
			...modalState,
			dropUpModalVisible: false,
		});
		setState({
			addressName: '',
			loadingCharges: null,
			momul: null,
			claimable: false,
			momulClaimable: false,
		});
		editBookingDetails('pickupDrop', 'dropLocations', [...dropLocations, { ...dropLocation, address: dropLocation.addressName }]);
	};

	return (
		<PickDropPresentational
			onChange={onChange}
			onModalChange={onModalChange}
			state={state}
			modalState={modalState}
			pickupLocations={pickupLocation}
			dropLocations={dropLocations}
			addPickupLocation={addPickupLocation}
			addDropLocation={addDropLocation}
			updatellocationData={updatellocationData}
		/>
	);
};
const mapStateToProps = ({
	bookingDetails: {
		pickupDrop: { pickupLocation, dropLocations },
	},
}) => {
	return { defaultPickupLocation: pickupLocation, defaultDropLocations: dropLocations };
};

const mapDispatchToProps = (dispatch) => {
	return {
		editBookingDetails: (field, label, value) => dispatch(editBookingDetails(field, label, value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PickDropFunctional);
