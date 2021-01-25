import { FontType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import TextComponent from './text';

const EtripMultiSelectDD = ({ vehicleDDByUserID, placeholder = '', name = '', onChange }) => {
	const vehicles = [
		{
			name: 'Vehicle',
			id: 0,
			// these are the children or 'sub items'
			children: vehicleDDByUserID.map(({ label, value }) => {
				return {
					name: value,
					id: value,
				};
			}),
		},
	];

	const vehicleDDByUserIDTemp = vehicleDDByUserID.map(({ label, value }) => {
		return {
			name: value,
			id: value,
		};
	});
	const [state, setState] = useState({
		vehicleNumber: [],
		vehicleModal: null,
		vehicleName: null,
	});

	const handleChange = (name, value) => {
		const vehicleName = Object.assign({}, ...vehicleDDByUserIDTemp.filter((vehicle) => vehicle.id === value[0])).name;
		// console.log(vehicleDDTemp.filter((vehicle) => vehicle.id === value[0]));
		setState({
			...state,
			vehicleName,
			[name]: value,
		});
		onChange && onChange({ name, value: value[0] });
	};

	const { vehicleModal, vehicleNumber, vehicleName } = state;

	return (
		<View style={{ backgroundColor: Colors.white, padding: 5, marginBottom: 5, borderRadius: 8 }}>
			{placeholder ? (
				<TextComponent type={FontType.BOLD} style={{ color: false ? Colors.red : Colors.themeBlack, paddingLeft: 5, paddingTop: 5 }}>
					{placeholder}
				</TextComponent>
			) : null}
			<SectionedMultiSelect
				items={vehicles}
				single
				IconRenderer={Icon}
				uniqueKey="id"
				subKey="children"
				selectText="Select Vehicle"
				showDropDowns={false}
				readOnlyHeadings={true}
				onSelectedItemsChange={(selectedItems) => handleChange('vehicleNumber', selectedItems)}
				searchPlaceholderText="Search Vehicle"
				selectedItems={vehicleNumber}
				// selectToggleTextColor={Colors.grey}
				renderSelectText={() => (
					<TextComponent style={{ color: Colors.grey }}>{vehicleNumber.length ? vehicleName : `Select ${placeholder}`}</TextComponent>
				)}
				styles={{
					subItemText: {
						fontFamily: 'ProximaNova-Regular',
						fontSize: 15,
					},
					searchTextInput: {
						fontFamily: 'ProximaNova-Regular',
						fontSize: 15,
					},
					itemText: {
						fontFamily: 'ProximaNova-Regular',
						fontSize: 15,
					},
					container: {
						borderColor: '#CDCDCD',
						borderWidth: 1,
					},
					selectToggle: {
						// height: 30,
						// alignItems: 'center',
						justifyContent: 'flex-start',
						paddingLeft: 5,
						paddingVertical: 3,
					},
				}}
				hideConfirm
			/>
		</View>
	);
};

const mapStateToProps = ({ user: { vehicleDDByUserID } }) => {
	return { vehicleDDByUserID };
};

export default connect(mapStateToProps, null)(EtripMultiSelectDD);
