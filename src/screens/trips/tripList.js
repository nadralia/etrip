import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import React, { Fragment, useState } from 'react';
import { Divider, TouchableRipple } from 'react-native-paper';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import { FontType, IconType } from 'constants/AppConstants';
import { Images } from 'assets/Icons';
import ButtonComponent from 'components/button-component';
import IconComponent from 'components/icon-component';
import { connect } from 'react-redux';
import { removeUser } from 'src/store/actions';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from 'components/loader';

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
	},
});

const ListCard = ({ navigation, list }) => (
	<Fragment>
		<TouchableRipple onPress={() => navigation.navigate('TripDetailPage', list)} rippleColor={Colors.whiteGrey}>
			<View style={styles.rowStyle}>
				<View style={{ flex: 2, alignItems: 'center' }}>
					<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, padding: 5 }}>
						<Image source={Images.motarWay} style={{ width: 40, height: 40 }} />
					</View>
				</View>
				<View style={{ flex: 8, paddingLeft: 3 }}>
					<View style={{ flexDirection: 'column' }}>
						<TextComponent style={styles.title} type={FontType.LIGHT}>
							{list.tripTitle}
						</TextComponent>
						<TextComponent style={styles.subText}>
							<Ionicons name="person-outline" size={15} /> Customer Name
						</TextComponent>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<TextComponent style={styles.subTextFlex}>
							<Ionicons name="calendar-outline" size={15} /> {moment(list.date).format('DD-MM-YYYY')}
						</TextComponent>
						<TextComponent style={styles.subTextFlex}>
							<Ionicons name="car-sport-outline" size={15} /> {list.driverName}
						</TextComponent>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<Ionicons name="chevron-forward-outline" size={23} color={Colors.primaryThemeColor} />
				</View>
			</View>
		</TouchableRipple>
		<Divider />
	</Fragment>
);

function TripLists({ navigation, current_user, removeUser }) {
	const [filter, setFilter] = useState({ startDate: null, endDate: null, displayedDate: moment() });
	const setDates = (dates) => {
		setFilter({
			...filter,
			...dates,
		});
	};

	const [loading, setLoading] = useState(true);
	const [lists, setlists] = useState([]);

	const getListData = () => {
		Axios.get(`${DOMAIN_API_URL(API_URL.GET_TRIPS)}`, {
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

	const { startDate, endDate, displayedDate } = filter;
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<DateRangePicker
				backdropStyle={{ marginTop: -100 }}
				onChange={setDates}
				presetButtons
				endDate={endDate}
				startDate={startDate}
				displayedDate={displayedDate}
				range>
				<View
					style={{
						height: 40,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.green,
					}}>
					<TextComponent style={{ color: Colors.white }} type={FontType.BOLD}>
						Pick Your Date
					</TextComponent>
				</View>
			</DateRangePicker>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: Colors.primaryThemeColor }}>
				<View style={{ flex: 1 }}>
					<TextComponent style={{ color: Colors.white }} type={FontType.BOLD}>
						Start Date:
					</TextComponent>
					{startDate && <TextComponent style={{ color: Colors.white }}>{moment(startDate).format('MMMM Do YYYY')}</TextComponent>}
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end' }}>
					<TextComponent style={{ color: Colors.white }} type={FontType.BOLD}>
						End Date:
					</TextComponent>
					{endDate && <TextComponent style={{ color: Colors.white }}>{moment(endDate).format('MMMM Do YYYY')}</TextComponent>}
				</View>
			</View>
			{loading ? (
				<Loader />
			) : (
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					{lists.map((list, b) => (
						<ListCard list={list} key={b} navigation={navigation} />
					))}
				</ScrollView>
			)}
		</View>
	);
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TripLists);
