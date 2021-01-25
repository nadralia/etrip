import React from 'react';
import { LottieFile } from 'assets/lottie';
import { View } from 'react-native';
import LottieAnimation from './lottie-animation';

const Loader = ({ width = '25%', height = '25%' }) => (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<View style={{ width, height }}>
			<LottieAnimation file={LottieFile.LoadingAnimation} />
		</View>
	</View>
);

export default Loader;
