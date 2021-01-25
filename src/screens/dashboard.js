import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from 'constants/ThemeConstants';
import Header from 'components/header';
import IconComponent from 'components/icon-component';
import { FontType, IconType } from 'constants/AppConstants';
import { widthPerc } from 'helpers/styleHelper';
import TextComponent from 'components/text';

const CARD_HEIGHT = 150;
const CARD_WIDTH = widthPerc(50);
const ICON_WIDTH = 40;

const initialLayout = { width: Dimensions.get('window').width };
export function DashboardScreen({ navigation }) {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'bookings', title: 'Today/Month' },
		{ key: 'drafts', title: 'Pick by Date' },
	]);

	const renderScene = SceneMap({
		bookings: () => <View />,
		drafts: () => <View />,
	});

	const renderLabel = ({ route }) => (
		<TextComponent
			style={{
				fontFamily: 'ProximaNova-Bold',
				fontSize: 15,
				color: Colors.tabText,
				paddingVertical: 10,
			}}>
			{route.title}
		</TextComponent>
	);

	const renderHeader = (props) => (
		<TabBar
			indicatorStyle={{ backgroundColor: Colors.primaryThemeColor, height: 1.3 }}
			style={{ backgroundColor: Colors.white, elevation: 0, borderBottomWidth: 0, borderColor: Colors.accordionBorderColor }}
			renderLabel={renderLabel}
			{...props}
		/>
	);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<Header rightIcon={false} title="Dashboard" />
			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				<View style={{ width: CARD_WIDTH, padding: 5 }}>
					<View style={{ backgroundColor: Colors.transparent, height: CARD_HEIGHT, borderRadius: 8 }}>
						<View style={{ height: CARD_HEIGHT / 3 }}></View>
						<View style={styles.bottomArea}>
							<View style={styles.icon}>
								<IconComponent type={IconType.MaterialCommunityIcons} name="account" color={Colors.white} size={20} />
							</View>
							<View style={{ alignItems: 'center', paddingTop: 10 }}>
								<TextComponent style={{ fontSize: 14, color: Colors.green }} type={FontType.BOLD}>
									Customer Count
								</TextComponent>
								<TextComponent style={{ fontSize: 20 }}>23</TextComponent>
							</View>
						</View>
					</View>
				</View>
				<View style={{ width: CARD_WIDTH, padding: 5 }}>
					<View style={{ backgroundColor: Colors.transparent, height: CARD_HEIGHT, borderRadius: 8 }}>
						<View style={{ height: CARD_HEIGHT / 3 }}></View>
						<View style={styles.bottomArea}>
							<View style={styles.icon}>
								<IconComponent type={IconType.MaterialCommunityIcons} name="car-back" color={Colors.white} size={20} />
							</View>
							<View style={{ alignItems: 'center', paddingTop: 10 }}>
								<TextComponent style={{ fontSize: 14, color: Colors.like }} type={FontType.BOLD}>
									Vehicle Count
								</TextComponent>
								<TextComponent style={{ fontSize: 20 }}>10</TextComponent>
							</View>
						</View>
					</View>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<TabView
					renderTabBar={renderHeader}
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={initialLayout}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomArea: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: Colors.white,
		elevation: 5,
		borderRadius: 8,
		position: 'relative',
	},
	icon: {
		width: ICON_WIDTH,
		height: ICON_WIDTH,
		borderRadius: 8,
		backgroundColor: Colors.primaryThemeColor,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
		position: 'absolute',
		left: CARD_WIDTH / 2 - ICON_WIDTH / 2 - 5,
		zIndex: 100,
		top: -(CARD_WIDTH / 3 / 2 - ICON_WIDTH / 7),
	},
});
