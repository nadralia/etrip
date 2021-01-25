/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BookingContextProvider from 'contexts/BookingContext';
import VehicleContextProvider from 'contexts/VehicleContext';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Colors } from 'constants/ThemeConstants';
import { HomeStack, LoginStack } from 'src/navigations/stack';
import { APP_CONSTANT } from 'constants/AppConstants';
import { getLocalData } from 'helpers/localStorage';
import { removeUser, setCustomerDD, setUser, setVehicleDD, setVehicleDDByUserID } from 'src/store/actions';
import { connect } from 'react-redux';
import LottieAnimation from 'components/lottie-animation';
import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';

const App = ({ setUser, current_user, setCustomerDD, setVehicleDD, setVehicleDDByUserID, removeUser }) => {
	const [loading, setLoading] = useState(true);
	const theme = {
		...DefaultTheme,
		roundness: 2,
		colors: {
			...DefaultTheme.colors,
			primary: '#3498db',
			accent: '#f1c40f',
		},
	};

	const checkForUser = async () => {
		const user = await getLocalData(APP_CONSTANT.USER);
		if (user) {
			setUser(user);
		}
		setLoading(false);
	};

	useEffect(() => {
		setTimeout(() => {
			checkForUser();
		}, 2000);
	}, []);

	const getCustomers = () => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_CUSTOMER), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				setCustomerDD(
					res.data &&
						res.data.map((res) => {
							return {
								label: res.contactName1,
								value: res._id,
							};
						})
				);
			})
			.catch((err) => {
				removeUser();
			});
	};
	const getVehicles = () => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_VEHICLE_DD), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				setVehicleDD(
					res.data &&
						res.data.map((res) => {
							return {
								label: res._type,
								value: res._id,
							};
						})
				);

				setLoading(false);
			})
			.catch((err) => {
				removeUser();
			});
	};
	const getVehiclesByUserID = () => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_VEHICLES_BY_USER_ID), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		})
			.then((res) => {
				console.log('getVehiclesByUserID', res.data);
				setVehicleDDByUserID(
					res.data &&
						res.data.map((res) => {
							return {
								label: res.vehicleModal,
								value: res.vehicleNumber,
							};
						})
				);

				setLoading(false);
			})
			.catch((err) => {
				removeUser();
			});
	};

	useEffect(() => {
		if (current_user) {
			getCustomers();
			getVehicles();
			getVehiclesByUserID();
		}
	}, [current_user]);

	return (
		<Fragment>
			<StatusBar backgroundColor={Colors.primaryThemeColor} barStyle="light-content" />
			<BookingContextProvider>
				<VehicleContextProvider>
					<PaperProvider theme={theme}>
						{loading ? <LottieAnimation /> : <NavigationContainer>{!current_user ? <LoginStack /> : <HomeStack />}</NavigationContainer>}
					</PaperProvider>
				</VehicleContextProvider>
			</BookingContextProvider>
		</Fragment>
	);
};

const mapStateToProps = ({ user: { current_user } }) => {
	return {
		current_user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (value) => dispatch(setUser(value)),
		setCustomerDD: (value) => dispatch(setCustomerDD(value)),
		setVehicleDD: (value) => dispatch(setVehicleDD(value)),
		setVehicleDDByUserID: (value) => dispatch(setVehicleDDByUserID(value)),
		removeUser: () => dispatch(removeUser()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// tripapk
// Sathish
// SK
// SK
// Tirupur
// Tamilnadu
// IN
