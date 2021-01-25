import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import TextComponent from 'components/text';
import { Colors } from 'constants/ThemeConstants';
import IconComponent from './icon-component';
import { IconType } from 'constants/AppConstants';
import { heightPerc } from 'helpers/styleHelper';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, leftIcon = true, rightIcon = false }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.headerContainer}>
			{leftIcon && (
				<View style={styles.leftIconContainer}>
					<IconButton icon={'keyboard-backspace'} color={Colors.white} size={25} onPress={() => navigation.goBack()} />
				</View>
			)}
			<TextComponent style={{ paddingVertical: 10, fontSize: 20, color: Colors.white }}>{title}</TextComponent>
			{rightIcon && (
				<View style={styles.rightIconContainer}>
					<IconComponent type={IconType.AntDesign} name="search1" color={Colors.white} size={20} />
				</View>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	headerContainer: {
		minHeight: heightPerc(8),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.primaryThemeColor,
	},
	leftIconContainer: { height: '100%', width: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 10 },
	rightIconContainer: { height: '100%', width: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, right: 10 },
});
