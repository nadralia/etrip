import { Dimensions } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const buttonHeight = viewportHeight * 0.08;
// const buttonWidth = wp(90);
// const itemHorizontalMargin = wp(1);

export const heightPerc = (percentage) => viewportHeight * (percentage / 100);

// export const StatusBarHeight = getStatusBarHeight();

export const widthPerc = (percentage) => {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
};
