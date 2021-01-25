import React, { useState, useContext } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from 'components/header';
import { Colors } from 'constants/ThemeConstants';
import EtripTextInput from 'components/input';
import ButtonComponent from 'components/button-component';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { VehicleContext } from 'contexts/VehicleContext';

const ChooseVehicle = ({ vehicleDD, route, navigation }) => {
	const { vehicleList, addVehicle } = useContext(VehicleContext);

	const { vehicle, activeItem, screen } = route.params;
	const vehicles = [
		{
			name: 'Vehicle',
			id: 0,
			// these are the children or 'sub items'
			children: vehicleDD.map(({ label, value }) => {
				return {
					name: label,
					id: value,
				};
			}),
		},
	];

	const vehicleDDTemp = vehicleDD.map(({ label, value }) => {
		return {
			name: label,
			id: value,
		};
	});

	const [state, setState] = useState({
		vehicleNumber: null,
		vehicleModal: null,
		vehicleName: [],
		...vehicle,
	});

	const onChange = (name, value) => {
		console.log({ name, value });
		const vehicleName = Object.assign({}, ...vehicleDDTemp.filter((vehicle) => vehicle.id === value[0])).name;
		console.log('Vehicle Name:', vehicleName);
		setState({
			...state,
			vehicleName,
			[name]: value,
		});
	};
	const onChangeText = ({ name, value }) => {
		console.log({ name, value });
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSave = () => {
		let array = vehicleList;
		if (vehicle) {
			array = vehicleList.map((vehicle, i) => {
				if (i === activeItem) {
					return {
						...state,
					};
				} else {
					return vehicle;
				}
			});
		} else {
			const { vehicleName, vehicleModal, vehicleNumber } = state;
			const vehicleName1 = Object.assign({}, ...vehicleDDTemp.filter((vehicle) => vehicle.id === vehicleName[0])).name;
			addVehicle(vehicleName1, vehicleModal, vehicleNumber);
		}
		if (screen === 'add') {
			navigation.navigate('VehicleCreateScreen');
		} else {
			navigation.navigate('EditVehicle');
		}
	};

	const { vehicleModal, vehicleNumber, vehicleName } = state;

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header title="Select Vehicle" />
			<View style={{ flex: 1 }}>
				<View>
					<TextComponent type={FontType.BOLD} style={{ paddingLeft: 10, paddingTop: 10 }}>
						Vehicle Name
					</TextComponent>
					<SectionedMultiSelect
						items={vehicles}
						single
						IconRenderer={Icon}
						uniqueKey="id"
						subKey="children"
						selectText="Select Vehicle"
						showDropDowns={false}
						readOnlyHeadings={true}
						onSelectedItemsChange={(selectedItems) => onChange('vehicleName', selectedItems)}
						searchPlaceholderText="Search Vehicle"
						selectedItems={vehicleName}
						styles={{
							subItemText: {
								fontFamily: 'ProximaNova-Regular',
							},
							searchTextInput: {
								fontFamily: 'ProximaNova-Regular',
							},
							itemText: {
								fontFamily: 'ProximaNova-Regular',
							},
							container: {
								borderColor: '#CDCDCD',
								borderWidth: 1,
							},
						}}
						hideConfirm
					/>
				</View>
				<EtripTextInput defaultValue={vehicleNumber} placeholder="Vehicle Number" name={'vehicleNumber'} onChange={onChangeText} />
				<EtripTextInput defaultValue={vehicleModal} placeholder="Vehicle Modal" name={'vehicleModal'} onChange={onChangeText} />
			</View>
			{vehicleModal && vehicleName ? (
				<View style={{ padding: 5 }}>
					<ButtonComponent onPress={handleSave}>{vehicle ? 'Save changes' : 'Save & Go back'}</ButtonComponent>
				</View>
			) : null}
		</View>
	);
};

const mapStateToProps = ({ user: { vehicleDD } }) => {
	return { vehicleDD };
};

export default connect(mapStateToProps, null)(ChooseVehicle);
