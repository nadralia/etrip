import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Divider, TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import { FontType, IconType } from 'constants/AppConstants';
import ButtonComponent from 'components/button-component';
import IconComponent from 'components/icon-component';
import Header from 'components/header';
import { makeCall } from 'components/phone-call';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { removeUser } from 'src/store/actions';
import Loader from 'components/loader';
import { useFocusEffect } from '@react-navigation/native';
import { VehicleContext } from 'contexts/VehicleContext';

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.primaryThemeColor,
	},
	subText: {
		color: '#777777',
		paddingVertical: 3,
	},
	subTextFlex: {
		color: '#777777',
		flex: 1,
		fontSize: 12,
		paddingVertical: 3,
	},
});

const ListCard = ({ navigation, list }) => {
	const { clearVehicleList } = useContext(VehicleContext);
	return (
		<Fragment>
			<TouchableRipple
				onPress={() => {
					navigation.navigate('EditVehicle', {
						...list,
					});
					clearVehicleList();
				}}
				rippleColor={Colors.whiteGrey}>
				<View style={styles.rowStyle}>
					<View style={{ flex: 2, alignItems: 'center' }}>
						<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, padding: 5 }}>
							<Ionicons name="person-outline" size={30} />
						</View>
					</View>
					<View style={{ flex: 8, paddingLeft: 3 }}>
						<View style={{ flexDirection: 'column' }}>
							<TextComponent style={styles.title} type={FontType.LIGHT}>
								{list.ownerName}
							</TextComponent>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<TextComponent style={styles.subTextFlex}>
								<IconComponent type={IconType.MaterialCommunityIcons} name="cellphone-android" size={15} />
								{list.contactMobile1}
							</TextComponent>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<TextComponent style={styles.subTextFlex}>
								<IconComponent type={IconType.FontAwesome5} name="shuttle-van" size={15} /> {list.vehicleNumber}
							</TextComponent>
							<TextComponent style={styles.subTextFlex}>
								<IconComponent type={IconType.FontAwesome5} name="shuttle-van" size={15} /> {list.vehicleModal}
							</TextComponent>
						</View>
					</View>
					<TouchableOpacity activeOpacity={0.9} style={{ flex: 1 }} onPress={() => makeCall(list.contactMobile1)}>
						<Ionicons name="call" size={23} color={Colors.primaryThemeColor} />
					</TouchableOpacity>
				</View>
			</TouchableRipple>
			<Divider />
		</Fragment>
	);
};

const VehicleList = ({ navigation, current_user, removeUser }) => {
	const [loading, setLoading] = useState(true);
	const [lists, setlists] = useState([]);

	const getListData = () => {
		Axios.get(`${DOMAIN_API_URL(API_URL.GET_VEHICLE)}`, {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				console.log(res);
				setlists(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				removeUser();
			});
	};

	useFocusEffect(
		React.useCallback(() => {
			getListData();
		}, [])
	);

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Header title="Vehicles" />
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						{lists.map((list, b) => (
							<ListCard list={list} key={b} navigation={navigation} />
						))}
					</ScrollView>
					<View style={{ padding: 5, backgroundColor: Colors.white, justifyContent: 'center' }}>
						<ButtonComponent onPress={() => navigation.navigate('VehicleCreateScreen')}>Create Vehicle</ButtonComponent>
					</View>
				</Fragment>
			)}
		</View>
	);
};

const mapStateToProps = ({ user: { current_user } }) => {
	return {
		current_user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: () => dispatch(removeUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
