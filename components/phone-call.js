import call from 'react-native-phone-call';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const makeCall = (number = '8012941249', immediate = false) => {
	if (!immediate) {
		const args = {
			number, // String value with the number to call
			prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
		};
		call(args).catch(console.error);
	} else RNImmediatePhoneCall.immediatePhoneCall(number);
};

export { makeCall };
