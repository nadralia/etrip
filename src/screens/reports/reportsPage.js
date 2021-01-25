import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from 'constants/ThemeConstants';
import Header from 'components/header';
import IconComponent from 'components/icon-component';
import { FontType, IconType } from 'constants/AppConstants';
import { widthPerc } from 'helpers/styleHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import EtripDatePicker from 'components/datepicker';
import ButtonComponent from 'components/button-component';
import { connect } from 'react-redux';

const CARD_HEIGHT = 150;
const CARD_WIDTH = widthPerc(50);
const ICON_WIDTH = 40;

function ReportsPage({ navigation, customerDD, vehicleDD }) {
	const [selectedItems, setSelectedItems] = useState([]);
	const [vehicleSelectedItems, setvehicleSelectedItems] = useState([]);

	const customers = [
		// this is the parent or 'item'
		{
			name: 'Customers',
			id: 0,
			// these are the children or 'sub items'
			children: customerDD.map(({ label, value }) => {
				return {
					name: label,
					id: value,
				};
			}),
		},
	];

	const vehicles = [
		// this is the parent or 'item'
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

	const onSelectedItemsChange = (selectedItems) => {
		setSelectedItems(selectedItems);
	};

	const onVehicleSelectedItemsChange = (selectedItems) => {
		setvehicleSelectedItems(selectedItems);
	};

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header rightIcon={false} title="Reports" />
			<View style={{ flex: 1, padding: 10 }}>
				<SectionedMultiSelect
					items={customers}
					IconRenderer={Icon}
					uniqueKey="id"
					subKey="children"
					selectText="Select Customer"
					single
					showDropDowns={false}
					readOnlyHeadings={true}
					onSelectedItemsChange={onSelectedItemsChange}
					searchPlaceholderText="Search Customer"
					selectedItems={selectedItems}
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
					}}
					hideConfirm
				/>
				<SectionedMultiSelect
					items={vehicles}
					single
					IconRenderer={Icon}
					uniqueKey="id"
					subKey="children"
					selectText="Select Vehicle"
					showDropDowns={false}
					readOnlyHeadings={true}
					onSelectedItemsChange={onVehicleSelectedItemsChange}
					searchPlaceholderText="Search Vehicle"
					selectedItems={vehicleSelectedItems}
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
					}}
					hideConfirm
				/>
				<EtripDatePicker />
				<ButtonComponent>Show Report</ButtonComponent>
			</View>
		</View>
	);
}

const mapStateToProps = ({ user: { customerDD, vehicleDD } }) => {
	return { customerDD, vehicleDD };
};

export default connect(mapStateToProps, null)(ReportsPage);

const styles = StyleSheet.create({
	bottomArea: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: Colors.white,
		elevation: 5,
		borderRadius: 8,
		position: 'relative',
	},
	icon: {
		width: ICON_WIDTH,
		height: ICON_WIDTH,
		borderRadius: 8,
		backgroundColor: Colors.primaryThemeColor,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
		position: 'absolute',
		left: CARD_WIDTH / 2 - ICON_WIDTH / 2 - 5,
		zIndex: 100,
		top: -(CARD_WIDTH / 3 / 2 - ICON_WIDTH / 7),
	},
});
