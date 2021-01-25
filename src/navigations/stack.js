import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from 'src/home';
import { SplashScreen } from 'src/screens/splash';
import LoginScreen from 'src/screens/login';
import { RegisterScreen } from 'src/screens/register';
import { OTPScreen } from 'src/screens/otppage';
import CustomerCreateScreen from 'src/screens/customerModule/create';
import { ViewUserScreen } from 'src/screens/customerModule/view';
import VehicleCreateScreen from 'src/screens/vehicleModule/create';
import { ViewVehicleScreen } from 'src/screens/vehicleModule/view';
import { ListVehiclesScreen } from 'src/screens/vehicleModule/list';
import TripDrivers from 'src/screens/tripDrivers';
import Booking from 'src/screens/booking';
import TripDetailPage from 'src/screens/trips/tripDetailPage';
import TripsPage from 'src/screens/trips/tripsPage';
import CustomerList from 'src/screens/customerModule/customerList';
import EditCustomer from 'src/screens/customerModule/editCustomer';
import VehicleList from 'src/screens/vehicleModule/vehicleList';
import EditVehicle from 'src/screens/vehicleModule/editVehicle';
import { DashboardScreen } from 'src/screens/dashboard';
import UserList from 'src/screens/users/userList';
import UserCreateScreen from 'src/screens/users/create';
import EditUser from 'src/screens/users/editUser';
import ReportsPage from 'src/screens/reports/reportsPage';
import ChooseVehicle from 'src/screens/vehicleModule/chooseVehicle';
import PreBooking from 'src/screens/booking/pre-booking';
import BookingMain from 'src/screens/booking/booking-main';
import QuickBooking from 'src/screens/booking/quick-booking';

const Stack = createStackNavigator();

function LoginStack() {
	return (
		<Stack.Navigator
			headerMode="none"
			screenOptions={{
				cardStyle: { backgroundColor: 'transparent' },
				cardOverlayEnabled: true,
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						opacity: progress.interpolate({
							inputRange: [0, 0.5, 0.9, 1],
							outputRange: [0, 0.25, 0.7, 1],
						}),
					},
				}),
			}}
			initialRouteName="Login">
			<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
			<Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

function HomeStack() {
	return (
		<Stack.Navigator
			headerMode="none"
			screenOptions={{
				cardStyle: { backgroundColor: 'transparent' },
				cardOverlayEnabled: true,
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						opacity: progress.interpolate({
							inputRange: [0, 0.5, 0.9, 1],
							outputRange: [0, 0.25, 0.7, 1],
						}),
					},
				}),
			}}
			initialRouteName="Splash">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="CustomerList" component={CustomerList} />
			<Stack.Screen
				name="CustomerCreateScreen"
				component={CustomerCreateScreen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="EditCustomer"
				component={EditCustomer}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen name="UserList" component={UserList} />
			<Stack.Screen
				name="UserCreateScreen"
				component={UserCreateScreen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="EditUser"
				component={EditUser}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen name="CustomerViewScreen" component={ViewUserScreen} />
			<Stack.Screen name="VehicleList" component={VehicleList} />
			<Stack.Screen
				name="EditVehicle"
				component={EditVehicle}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="VehicleCreateScreen"
				component={VehicleCreateScreen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="ChooseVehicle"
				component={ChooseVehicle}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen name="VehicleViewScreen" component={ViewVehicleScreen} />
			<Stack.Screen name="ListVehiclesScreen" component={ListVehiclesScreen} />
			<Stack.Screen name="TripDrivers" component={TripDrivers} />
			<Stack.Screen name="Bookings" component={TripsPage} />
			<Stack.Screen name="TripDetailPage" component={TripDetailPage} />
			<Stack.Screen
				name="Booking"
				component={Booking}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="PreBooking"
				component={PreBooking}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="QuickBooking"
				component={QuickBooking}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="BookingMain"
				component={BookingMain}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="DashboardScreen"
				component={DashboardScreen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
			<Stack.Screen
				name="ReportsPage"
				component={ReportsPage}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
		</Stack.Navigator>
	);
}

export { LoginStack, HomeStack };
