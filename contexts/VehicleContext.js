import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid';

export const VehicleContext = createContext();

const VehicleContextProvider = (props) => {
	const [vehicleList, setVehicleList] = useState([]);
	const addVehicle = (vehicleName, vehicleModal, vehicleNumber) => {
		setVehicleList([...vehicleList, { vehicleName, vehicleModal, vehicleNumber, id: uuid.v1() }]);
	};
	const removeVehicleList = (id) => {
		setVehicleList(vehicleList.filter((vehicle) => vehicle.id !== id));
	};

	const clearVehicleList = () => {
		setVehicleList([]);
	};

	return (
		<VehicleContext.Provider value={{ vehicleList, addVehicle, removeVehicleList, clearVehicleList }}>{props.children}</VehicleContext.Provider>
	);
};

export default VehicleContextProvider;
