import React, { Component } from 'react';
import { Button, Text, DefaultTheme, TouchableRipple } from 'react-native-paper';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'constants/ThemeConstants';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import Header from 'components/header';

const styles = StyleSheet.create({
	rowStyle: {
		flex: 2,
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
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
});

function MenuScreen({ navigation }) {
	return (
		<>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<Header title="Admin Panel" leftIcon={false} />
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.rowStyle}>
						<TouchableRipple
							style={styles.colStyle}
							onPress={() => navigation.navigate('DashboardScreen')}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/001-blackboard.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Dashboard
								</TextComponent>
							</View>
						</TouchableRipple>
						<TouchableRipple
							style={styles.colStyle}
							onPress={() => navigation.navigate('ReportsPage', { name: 'Jane' })}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/008-diagram.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Reports
								</TextComponent>
							</View>
						</TouchableRipple>
					</View>

					<View style={styles.rowStyle}>
						<TouchableRipple
							style={styles.colStyle}
							onPress={() => navigation.navigate('CustomerList', { name: 'Jane' })}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/002-man.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Customers
								</TextComponent>
							</View>
						</TouchableRipple>
						<TouchableRipple
							style={styles.colStyle}
							onPress={() => navigation.navigate('VehicleList', { name: 'Jane' })}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/004-delivery-truck.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Vehicles
								</TextComponent>
							</View>
						</TouchableRipple>
					</View>

					<View style={styles.rowStyle}>
						<TouchableRipple
							style={styles.colStyle}
							onPress={() => navigation.navigate('UserList', { name: 'Jane' })}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/002-man.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Users
								</TextComponent>
							</View>
						</TouchableRipple>
						<TouchableRipple style={styles.colStyle} onPress={() => navigation.navigate('BookingMain')} rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/005-booking.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Bookings
								</TextComponent>
							</View>
						</TouchableRipple>
					</View>

					<View style={styles.rowStyle}>
						<TouchableRipple
							style={styles.colStyle}
							// onPress={() => navigation.navigate('Bookings')}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/006-policy.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Quotes
								</TextComponent>
							</View>
						</TouchableRipple>
						<TouchableRipple
							style={styles.colStyle}
							// onPress={() => navigation.navigate('VehicleList', { name: 'Jane' })}
							rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/004-delivery-truck.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Coming soon...
								</TextComponent>
							</View>
						</TouchableRipple>
					</View>

					<View style={styles.rowStyle}>
						<TouchableRipple disabled style={[styles.colStyle, { backgroundColor: Colors.whiteGrey }]} rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/007-wallet.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Expenses
								</TextComponent>
							</View>
						</TouchableRipple>
						<TouchableRipple style={[styles.colStyle, { backgroundColor: Colors.whiteGrey }]} rippleColor={Colors.whiteGrey}>
							<View style={styles.viewItemsCenter}>
								<Image source={require('./../../assets/Icons/003-steering-wheel.png')} style={{ width: 40, height: 40 }} />
								<TextComponent style={{ fontSize: 14, color: Colors.primaryThemeColor, paddingTop: 10 }} type={FontType.BOLD}>
									Drivers
								</TextComponent>
							</View>
						</TouchableRipple>
					</View>
				</ScrollView>
			</View>
		</>
	);
}

export { MenuScreen };
