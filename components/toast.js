import { RNToasty } from 'react-native-toasty';
import { TOAST_VARIABLES } from 'constants/AppConstants';

export const showToast = (type = TOAST_VARIABLES.Show, title = 'Toast message') => {
	RNToasty[type]({ title, position: 'top' });
};
