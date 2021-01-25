import React, { Component } from 'react';
import { Button, Text, Divider, TouchableRipple } from 'react-native-paper';
import { View, Image, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
	},
	subText: {
		color: '#777777',
	},
	subTextFlex: {
		color: '#777777',
		flex: 1,
	},
});

export function ListVehiclesScreen({ navigation }) {
	return (
		<>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<TouchableRipple onPress={() => console.log('Pressed')} rippleColor="rgba(0, 0, 0, .32)">
					<View style={styles.rowStyle}>
						<View style={{ flex: 2 }}>
							<Image source={require('./../../../assets/Icons/003-taxi-driver.png')} style={{ width: 40, height: 40 }} />
						</View>
						<View style={{ flex: 8 }}>
							<View style={{ flexDirection: 'column' }}>
								<Text style={styles.title}>Kaja Bhai</Text>
								<Text style={styles.subText}>
									<Ionicons name="location-outline" size={15} /> +91 9787476778
								</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<Text style={styles.subTextFlex}>
									<Ionicons name="calendar-outline" size={15} /> TN 56 J 7647
								</Text>
								<Text style={styles.subTextFlex}>
									<Ionicons name="car-sport-outline" size={15} /> Tata Ace
								</Text>
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<Ionicons name="chevron-forward-outline" size={23} />
						</View>
					</View>
				</TouchableRipple>
				<Divider />
				<View style={styles.rowStyle}>
					<View style={{ flex: 2 }}>
						<Image source={require('./../../../assets/Icons/003-taxi-driver.png')} style={{ width: 40, height: 40 }} />
					</View>
					<View style={{ flex: 8 }}>
						<View style={{ flexDirection: 'column' }}>
							<Text style={styles.title}>Raja</Text>
							<Text style={styles.subText}>
								<Ionicons name="location-outline" size={15} /> +91 9787476778
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.subTextFlex}>
								<Ionicons name="calendar-outline" size={15} /> TN 45 J 4532
							</Text>
							<Text style={styles.subTextFlex}>
								<Ionicons name="car-sport-outline" size={15} /> 19ft
							</Text>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<Ionicons name="chevron-forward-outline" size={23} />
					</View>
				</View>
				<Divider />
			</View>
		</>
	);
}
