import React from 'react';
import { View } from 'react-native';
import { Colors } from 'constants/ThemeConstants';
import { widthPerc } from 'helpers/styleHelper';
import TextComponent from './text';

const ETripDivider = ({ withOr = false, text = 'Or' }) => (
	<View style={{ marginVertical: 20, alignSelf: 'center', width: '100%' }}>
		{withOr ? (
			<>
				<View
					style={{
						height: 1,
						width: '100%',
						backgroundColor: Colors.accDividerColor,
					}}
				/>
				<View
					style={{
						// padding: 10,
						position: 'absolute',
						left: '46%',
						width: 20,
						height: 20,
						bottom: -9,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.primaryThemeColor,
						borderRadius: 15,
					}}>
					<TextComponent style={{ fontSize: 12, color: Colors.white }}>{text}</TextComponent>
				</View>
			</>
		) : (
			<View
				style={{
					height: 1,
					width: widthPerc(90),
					backgroundColor: Colors.accDividerColor,
				}}
			/>
		)}
	</View>
);

export default ETripDivider;
