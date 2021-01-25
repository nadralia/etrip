import React, { Component } from 'react';
// import { Text, View, Button } from 'react-native';
import { Card, Avatar, IconButton, Button, Appbar, BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, Title, Paragraph } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MenuScreen } from './screens/menu';
import { TripsScreen } from './screens/trips';
import ProfileScreen from './screens/profile';
import { SettingsScreen } from './screens/settings';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'constants/ThemeConstants';
import TripsPage from './screens/trips/tripsPage';

const styles = StyleSheet.create({
	center: {
		alignSelf: 'center',
		color: '#fff',
	},
});

const fontFamily = Icon.getFontFamily();

const Tab = createMaterialBottomTabNavigator();

export function HomeScreen({ navigation }) {
	const _handleSearch = () => console.log('Searching');

	return (
		<>
			{/* <Appbar.Header >
        <Appbar.BackAction />
        <Appbar.Content title="Admin Panel" style={styles.center} />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
      </Appbar.Header>
      <Text>
        {fontFamily}
      </Text>
      <Text>
        <Icon name="rocket" size={30} color="#900" />;
      </Text>

      <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
          Login with Facebook
    </Text>
      </Icon.Button> */}

			<BottomTabs></BottomTabs>
		</>
	);
}

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate('Details')}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function Messages({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Messages Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate('Details')}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

export const BottomTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Menu"
			barStyle={{
				backgroundColor: Colors.white,
			}}
			activeColor={Colors.primaryThemeColor}
			inactiveColor={Colors.grey}
			shifting={false}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					let iconName;
					if (route.name === 'Settings') {
						iconName = focused ? 'settings' : 'settings-sharp';
					} else if (route.name === 'Menu') {
						iconName = focused ? 'grid' : 'grid-sharp';
					} else if (route.name === 'Trips') {
						iconName = focused ? 'car-sport' : 'car-sport-sharp';
					} else if (route.name === 'Profile') {
						iconName = focused ? 'person' : 'person-sharp';
					}
					// You can return any component that you like here!
					return <Ionicons name={iconName} size={23} color={color} />;
				},
			})}
			tabBarOptions={
				{
					// activeTintColor: 'tomato',
					// inactiveTintColor: 'gray',
				}
			}>
			{/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
			<Tab.Screen name="Menu" component={MenuScreen} />
			<Tab.Screen name="Trips" component={TripsPage} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};
