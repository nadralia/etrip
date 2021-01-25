import ButtonComponent from 'components/button-component';
import EtripDatePicker from 'components/datepicker';
import Header from 'components/header';
import EtripTextInput from 'components/input';
import EtripMultiSelectDD from 'components/multi-select';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

const QuickBooking = ({ vehicleDDByUserID, navigation }) => {
	const [state, setstate] = useState({
		vehicleModal: '',
		vehicleNumber: '',
	});

	const handleChange = ({ name, value }) => {
		const vehicleModal = Object.assign({}, ...vehicleDDByUserID.filter((vehicle) => vehicle.value === value)).label;
		console.log(vehicleDDByUserID, vehicleModal);
		setstate({
			...state,
			vehicleModal,
			[name]: value,
		});
	};

	const { vehicleNumber, vehicleModal } = state;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.white,
			}}>
			<Header title="Quick-Booking" />
			<ScrollView>
				<EtripDatePicker placeholder="Date" />
				<EtripDatePicker placeholder="Time" mode="time" />
				<EtripTextInput placeholder="Transporter or Transport Agency" />
				<View style={{ padding: 10, paddingTop: 5, paddingBottom: 0, backgroundColor: Colors.whiteGrey }}>
					<TextComponent type={FontType.BOLD} style={{ paddingVertical: 8 }}>
						Contact Person 1
					</TextComponent>
					<EtripTextInput placeholder="Name" />
					<EtripTextInput placeholder="Mobile Number 1" />
					<EtripTextInput placeholder="Mobile Number 2" />
					<EtripTextInput placeholder="Land Line Number" />
				</View>
				<View style={{ padding: 10, paddingTop: 5, backgroundColor: Colors.whiteGrey }}>
					<TextComponent type={FontType.BOLD} style={{ paddingVertical: 8, paddingTop: 0 }}>
						Contact Person 2
					</TextComponent>
					<EtripTextInput placeholder="Name" />
					<EtripTextInput placeholder="Mobile Number 1" />
					<EtripTextInput placeholder="Mobile Number 2" />
					<EtripTextInput placeholder="Land Line Number" />
				</View>
				<EtripTextInput placeholder="Pickup Place" />
				<EtripTextInput placeholder="Drop Place" />
				<View style={{ padding: 10, paddingTop: 10, backgroundColor: Colors.whiteGrey }}>
					<TextComponent type={FontType.BOLD} style={{ paddingVertical: 8, paddingTop: 0 }}>
						Fright
					</TextComponent>
					<EtripTextInput placeholder="Name" />
					<EtripMultiSelectDD placeholder="Vehicle Number" name={'vehicleNumber'} onChange={handleChange} />
					<EtripTextInput placeholder="Vehicle Model" disabled value={vehicleModal} />
					<EtripTextInput placeholder="Driver Name" />
					<EtripTextInput placeholder="Mobile Number" />
				</View>
			</ScrollView>
			<View style={{ padding: 5, backgroundColor: Colors.white }}>
				<ButtonComponent loading={false} onPress={() => navigation.navigate('Home')}>
					Create
				</ButtonComponent>
			</View>
		</View>
	);
};

const mapStateToProps = ({ user: { vehicleDDByUserID } }) => {
	return { vehicleDDByUserID };
};

export default connect(mapStateToProps, null)(QuickBooking);
