import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { LottieFile } from 'assets/lottie';

export default function LottieAnimation({ file = LottieFile.MovingVehicle }) {
	return (
		<View style={{ flex: 1 }}>
			<LottieView source={file} autoPlay loop />
		</View>
	);
}
