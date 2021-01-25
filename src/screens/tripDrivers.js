import React, { Fragment } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TouchableRipple, Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from 'components/header';
import TextComponent from 'components/text';
import { makeCall } from 'components/phone-call';
import { Colors } from 'constants/ThemeConstants';
import { widthPerc } from 'helpers/styleHelper';
import { FontType, IconType } from 'constants/AppConstants';
import { Images } from 'assets/Icons';
import IconComponent from 'components/icon-component';

const TripDrivers = ({ params }) => (
	<View style={{ flex: 1, backgroundColor: Colors.white }}>
		<Header title="Drivers" />
		<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
			<View style={[styles.totalCard, { backgroundColor: Colors.green }]}>
				<TextComponent style={{ fontSize: 15, color: Colors.white }}>Total Balance</TextComponent>
				<TextComponent type={FontType.BOLD} style={{ color: Colors.white }}>
					$20,800
				</TextComponent>
			</View>
			<View style={[styles.totalCard, { backgroundColor: Colors.like }]}>
				<TextComponent style={{ fontSize: 15, color: Colors.white }}>Payment Due</TextComponent>
				<TextComponent type={FontType.BOLD} style={{ color: Colors.white }}>
					$20,800
				</TextComponent>
			</View>
			<View style={[styles.totalCard, { backgroundColor: Colors.yellow }]}>
				<TextComponent style={{ fontSize: 15, color: Colors.themeBlack }}>Active Tips</TextComponent>
				<TextComponent type={FontType.BOLD} style={{ color: Colors.themeBlack }}>
					8
				</TextComponent>
			</View>
		</View>
		<ScrollView>
			{Array(10)
				.fill('')
				.map((a, b) => (
					<Fragment key={b}>
						<TouchableRipple onPress={() => console.log('Pressed')} rippleColor={Colors.whiteGrey}>
							<View style={styles.rowStyle}>
								<View style={{ flex: 2, alignItems: 'center' }}>
									<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, padding: 5 }}>
										<Image source={Images.steeringWheel} style={{ width: 40, height: 40 }} />
									</View>
								</View>
								<View style={{ flex: 8, paddingLeft: 3 }}>
									<View style={{ flexDirection: 'column' }}>
										<TextComponent style={styles.title} type={FontType.LIGHT}>
											Driver Name Here
										</TextComponent>
										<TextComponent style={styles.subText}>
											<IconComponent type={IconType.FontAwesome} name="road" size={15} /> Active Trips 2
										</TextComponent>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<TextComponent style={styles.subTextFlex}>
											<IconComponent type={IconType.AntDesign} name="calendar" size={15} /> 4:08 PM
										</TextComponent>
										<TextComponent style={styles.subTextFlex} type={FontType.BOLD}>
											$ 12,000
										</TextComponent>
									</View>
								</View>
								<TouchableOpacity activeOpacity={0.9} style={{ flex: 1 }} onPress={() => makeCall()}>
									<Ionicons name="call" size={23} color={Colors.primaryThemeColor} />
								</TouchableOpacity>
							</View>
						</TouchableRipple>
						<Divider />
					</Fragment>
				))}
		</ScrollView>
	</View>
);

export default TripDrivers;
const styles = StyleSheet.create({
	totalCard: {
		width: widthPerc(30),
		backgroundColor: Colors.white,
		height: 60,
		borderWidth: 0.9,
		borderColor: Colors.accDividerColor,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
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
		fontSize: 16,
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
