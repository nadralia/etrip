import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';

import { Colors } from 'constants/ThemeConstants';
import TextComponent from './text';
import IconComponent from './icon-component';
import { FontType } from 'constants/AppConstants';

const ButtonComponent = (props) => {
	const {
		children,
		style,
		loading,
		onPress,
		icon,
		round,
		borderRadius = 5,
		fontColor = Colors.white,
		disabled = false,
		IconType,
		IconName,
	} = props;
	return (
		<Ripple
			disabled={disabled || loading}
			rippleContainerBorderRadius={borderRadius}
			rippleColor={loading ? Colors.transparent : Colors.white}
			rippleSize={180}
			onPress={onPress}
			style={[
				{
					backgroundColor: (style && style.backgroundColor) || Colors.primaryThemeColor,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: borderRadius,
					elevation: (style && style.elevation) || 0,
					height: (style && style.height) || 46,
				},
				{ ...style },
			]}>
			<View
				style={[
					{
						backgroundColor: Colors.transparent,
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						paddingVertical: 15,
						// paddingHorizontal: 20,
						backgroundColor: `${loading ? Colors.transparent : Colors.transparent}`,
						borderRadius: round ? 20 : 0,
					},
					// style,
				]}>
				{loading && <ActivityIndicator style={{ paddingRight: 10 }} color={Colors.white} size="small"></ActivityIndicator>}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					{IconName && <IconComponent type={IconType} name={IconName} color={Colors.white} size={20} style={{ paddingRight: 10 }} />}
					<TextComponent
						style={{
							fontSize: (style && style.fontSize) || 16,
							color: (style && style.color) || Colors.white,
							fontFamily: (style && style.fontFamily) || 'ProximaNova-Bold',
						}}>
						{children}
					</TextComponent>
					{/* {!loading && icon && <Feather style={{ fontSize: 25 }} name="arrow-right" />} */}
				</View>
			</View>
		</Ripple>
	);
};

export default ButtonComponent;
