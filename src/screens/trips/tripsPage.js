import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TextComponent from 'components/text';
import TripLists from './tripList';
import { TripListsDraft } from './tripListDraft';
import { Colors } from 'constants/ThemeConstants';
import Header from 'components/header';

const initialLayout = { width: Dimensions.get('window').width };

const TripsPage = ({ navigation }) => {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'bookings', title: 'Bookings' },
		{ key: 'drafts', title: 'Drafts' },
	]);

	const renderScene = SceneMap({
		bookings: () => <TripLists navigation={navigation} />,
		drafts: () => <TripListsDraft navigation={navigation} />,
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
			<Header title="Trips" />
			<TabView
				renderTabBar={renderHeader}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
			/>
		</View>
	);
};

export default TripsPage;
