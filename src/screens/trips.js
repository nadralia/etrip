import React, { Fragment } from 'react';
import { Divider, TouchableRipple } from 'react-native-paper';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from 'components/header';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { Images } from 'assets/Icons';

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

export function TripsScreen({ navigation }) {
	return (
		<>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<Header title="Trips" />
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					{Array(10)
						.fill('')
						.map((a, b) => (
							<Fragment key={b}>
								<TouchableRipple onPress={() => console.log('Pressed')} rippleColor="rgba(0, 0, 0, .32)">
									<View style={styles.rowStyle}>
										<View style={{ flex: 2, alignItems: 'center' }}>
											<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, padding: 5 }}>
												<Image source={Images.motarWay} style={{ width: 40, height: 40 }} />
											</View>
										</View>
										<View style={{ flex: 8, paddingLeft: 3 }}>
											<View style={{ flexDirection: 'column' }}>
												<TextComponent style={styles.title} type={FontType.LIGHT}>
													Trip Name Here
												</TextComponent>
												<TextComponent style={styles.subText}>
													<Ionicons name="location-outline" size={15} /> Pickup Place - Drop Place
												</TextComponent>
											</View>
											<View style={{ flexDirection: 'row' }}>
												<TextComponent style={styles.subTextFlex}>
													<Ionicons name="calendar-outline" size={15} /> 20.08.2020
												</TextComponent>
												<TextComponent style={styles.subTextFlex}>
													<Ionicons name="car-sport-outline" size={15} /> Kiruba
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
						))}
				</ScrollView>
			</View>
		</>
	);
}
