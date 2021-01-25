import Axios from 'axios';
import { API_URL, DOMAIN_API_URL } from 'constants/api';
import { setCustomerDD } from '../actions';

export const getDrivesDD = (current_user) => {
	return (dispatch) => {
		Axios.get(DOMAIN_API_URL(API_URL.GET_CUSTOMER), {
			headers: {
				'x-access-token': current_user.jwt,
				'x-user-id': current_user.userId,
			},
		}).then((res) => {
			dispatch(
				setCustomerDD(
					res.data &&
						res.data.map((res) => {
							return {
								label: res.contactName1,
								value: res._id,
							};
						})
				)
			);
		});
	};
};
