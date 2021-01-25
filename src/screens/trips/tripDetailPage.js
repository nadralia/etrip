import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from 'components/header';
import IconComponent from 'components/icon-component';
import TextComponent from 'components/text';
import { FontType, IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import { Images } from 'assets/Icons';
import { heightPerc } from 'helpers/styleHelper';
import ETripDivider from 'components/divider';
import ImageComponent from 'components/image-component';
import { connect } from 'react-redux';
import { getValueFromArray } from 'helpers';

const ICON_HEIGHT = 60;

const TripDetailPage = ({ route, customerDD }) => {
	const paramss = route.params;

	console.log('paramss', paramss);
	const {
		params: {
			tripTitle,
			driverName,
			fareCalc: { totalDriverCost },
			boxCount,
			weight,
			pickupLocationList,
			dropLocationList,
			product,
			_id,
		},
	} = route;

	console.log('getValueFromArray...', customerDD);

	const customerData = [
		{
			label: 'CUSTOMER NAME',
			value: 'as',
		},
		{
			label: 'CUSTOMER TYPE',
			value: 'Type of the Cust.',
		},
		{
			label: 'CONTACT PERSON 1',
			value: 'Name(8012941249)',
		},
		{
			label: 'CONTACT PERSON 1',
			value: 'Name(8012941249)',
		},
		{
			label: 'TRIP TYPE',
			value: 'Type of trip',
		},
	];

	let productData = [
		{
			label: 'PRODUCT NAME',
			value: product,
		},
		{
			label: 'WEIGHT',
			value: weight,
		},
		// {
		// 	label: 'CONTAINER TYPE',
		// 	value: 'Type of the Container',
		// },
		{
			label: 'TOTAL KMS',
			value: 'Total KMs of the Trip',
		},
		{
			label: 'DRIVER NAME',
			value: driverName,
		},
		{
			label: 'DRIVER AMOUNT',
			value: totalDriverCost,
		},
		{
			label: 'NO. OF BOXES LOADING',
			value: boxCount,
		},
	];
	return (
		<View style={{ flex: 1, backgroundColor: Colors.primaryThemeColor }}>
			<Header title="Trip Details" />
			<ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }} rippleColor={Colors.whiteGrey}>
				<View style={styles.rowStyle}>
					<View style={{ paddingLeft: 3, justifyContent: 'space-around' }}>
						<View>
							<TextComponent style={styles.title} type={FontType.LIGHT}>
								{tripTitle}
							</TextComponent>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<IconComponent color={Colors.white} type={IconType.Ionicons} name="location-outline" size={15} />
							<TextComponent style={{ color: Colors.white, paddingLeft: 5 }}>Pickup Place - Drop Place</TextComponent>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<IconComponent color={Colors.white} type={IconType.Ionicons} name="calendar-outline" size={15} />
							<TextComponent style={{ color: Colors.white, paddingLeft: 5 }}>20.08.2020</TextComponent>
						</View>
					</View>
				</View>
				<View style={{ backgroundColor: Colors.white, flex: 1, borderRadius: 20, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
					<View
						style={{
							width: ICON_HEIGHT,
							height: ICON_HEIGHT,
							position: 'absolute',
							top: -ICON_HEIGHT / 2,
							zIndex: 100,
							right: 20,
							backgroundColor: Colors.white,
							borderRadius: ICON_HEIGHT / 2,
							borderWidth: 5,
							borderColor: Colors.primaryThemeColor,
						}}>
						<View style={{ padding: 10, flex: 1 }}>
							<ImageComponent source={Images.motarWay} style={{ flex: 1, width: undefined, height: undefined }} resizeMode="contain" />
						</View>
					</View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15 }}>
						{customerData.map((customer, i) => (
							<View key={i} style={{ width: '50%', padding: 10 }}>
								<TextComponent style={{ fontSize: 10 }}>{customer.label}</TextComponent>
								<TextComponent type={FontType.BOLD} style={{ color: Colors.primaryThemeColor }}>
									{customer.value}
								</TextComponent>
							</View>
						))}
					</View>
					<ETripDivider withOr text="X" />
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 0 }}>
						<View style={{ width: '50%' }}>
							{pickupLocationList.map((customer, i) => (
								<View key={i} style={{ padding: 10 }}>
									<TextComponent style={{ fontSize: 10 }}>{`Pickup Location ${i + 1}`}</TextComponent>
									<TextComponent type={FontType.BOLD} style={{ color: Colors.primaryThemeColor }}>
										{customer.address}
									</TextComponent>
									<TextComponent type={FontType.BOLD} style={{ color: Colors.green }}>
										{`(₹${customer.loading || ''} | ₹${customer.unloading || ''})`}
									</TextComponent>
								</View>
							))}
						</View>
						<View style={{ width: '50%' }}>
							{dropLocationList.map((customer, i) => (
								<View key={i} style={{ padding: 10 }}>
									<TextComponent style={{ fontSize: 10 }}>{`Drop Location ${i + 1}`}</TextComponent>
									<TextComponent type={FontType.BOLD} style={{ color: Colors.primaryThemeColor }}>
										{customer.address}
									</TextComponent>
									<TextComponent type={FontType.BOLD} style={{ color: Colors.green }}>
										{`(₹${customer.loading || ''} | ₹${customer.unloading || ''})`}
									</TextComponent>
								</View>
							))}
						</View>
					</View>
					<ETripDivider withOr text="X" />
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						{productData.map((customer, i) => (
							<View key={i} style={{ width: '50%', padding: 10 }}>
								<TextComponent style={{ fontSize: 10 }}>{customer.label}</TextComponent>
								<TextComponent type={FontType.BOLD} style={{ color: Colors.primaryThemeColor }}>
									{customer.value}
								</TextComponent>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = ({ user: { customerDD } }) => {
	return {
		customerDD,
	};
};

export default connect(mapStateToProps, null)(TripDetailPage);

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: Colors.primaryThemeColor,
		minHeight: heightPerc(18),
		paddingVertical: 10,
		// alignItems: 'center',
	},
	colStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: Colors.whiteGrey,
		// borderStyle: 'solid',
		borderWidth: 1,
		// elevation: 1,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 15,
		marginRight: 15,
		borderRadius: 5,
		backgroundColor: Colors.white,
	},
	viewItemsCenter: {
		alignItems: 'center',
	},
	title: {
		fontSize: 30,
		color: Colors.white,
	},
});
