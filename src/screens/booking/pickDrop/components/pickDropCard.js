import React, { Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import ButtonComponent from 'components/button-component';
import { heightPerc } from 'helpers/styleHelper';
import EtripTextInput from 'components/input';

const PickDropCard = ({ location, isDrop = false, updatellocationData, index }) => {
	const [modalState, setModalState] = useState({
		dropUpModalVisible: false,
		pickUpModalVisible: false,
	});

	const [state, setstate] = useState({
		...location,
	});

	const onModalChange = (name, value) => {
		setModalState({
			...modalState,
			[name]: value,
		});
	};

	const onChange = ({ name, value }) => {
		console.log(name, value);
		setstate({
			...state,
			[name]: value,
		});
	};

	const { addressName, address, loadingCharges, momul, claimable, unLoadingCharges, momulClaimable } = state;

	const { pickUpModalVisible, dropUpModalVisible } = modalState;

	return (
		<Fragment>
			<Modal isVisible={pickUpModalVisible} backdropTransitionOutTiming={0} animationIn="fadeIn" animationOut="fadeOut">
				<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
					<View style={{ backgroundColor: Colors.white }}>
						<View style={{ minHeight: 60, backgroundColor: Colors.primaryThemeColor, alignItems: 'center', justifyContent: 'center' }}>
							<TextComponent style={{ fontSize: 18, color: Colors.white }} type={FontType.BOLD}>
								Pickup Location
							</TextComponent>
						</View>
						<View style={{}}>
							<EtripTextInput placeholder="Address" defaultValue={addressName} multiline onChange={onChange} name="addressName" />
							<EtripTextInput
								placeholder="Loading Charges"
								defaultValue={loadingCharges}
								keyboardType="phone-pad"
								onChange={onChange}
								name="loadingCharges"
							/>
							<EtripTextInput placeholder="Momul" defaultValue={momul} keyboardType="phone-pad" onChange={onChange} name="momul" />
							{loadingCharges ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
									<CheckBox checked={claimable} onPress={() => onChange({ name: 'claimable', value: !claimable })} />
									<TextComponent style={{ fontSize: 15 }} type={claimable ? FontType.BOLD : FontType.REGULAR}>
										Loading Charges Claimable
									</TextComponent>
								</View>
							) : null}
							{momul ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
									<CheckBox checked={momulClaimable} onPress={() => onChange({ name: 'momulClaimable', value: !momulClaimable })} />
									<TextComponent style={{ fontSize: 15 }} type={momulClaimable ? FontType.BOLD : FontType.REGULAR}>
										Momul Claimable
									</TextComponent>
								</View>
							) : null}
						</View>
						<View style={{ flexDirection: 'row' }}>
							<ButtonComponent
								style={{ backgroundColor: Colors.danger, width: addressName && loadingCharges ? '50%' : '100%', borderRadius: 0 }}
								onPress={() => onModalChange('pickUpModalVisible', false)}>
								Cancel
							</ButtonComponent>
							{addressName ? (
								<ButtonComponent
									style={{ width: '50%', borderRadius: 0 }}
									onPress={() => {
										updatellocationData(state, index, isDrop);
										onModalChange('pickUpModalVisible', false);
									}}>
									Update
								</ButtonComponent>
							) : null}
						</View>
					</View>
				</View>
			</Modal>
			<Modal isVisible={dropUpModalVisible} backdropTransitionOutTiming={0} animationIn="fadeIn" animationOut="fadeOut">
				<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
					<View style={{ backgroundColor: Colors.white }}>
						<View style={{ minHeight: 60, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' }}>
							<TextComponent style={{ fontSize: 18, color: Colors.white }} type={FontType.BOLD}>
								Drop Location
							</TextComponent>
						</View>
						<View style={{}}>
							<EtripTextInput placeholder="Address" defaultValue={address} multiline onChange={onChange} name="addressName" />
							<EtripTextInput
								placeholder="Unloading Charges"
								defaultValue={unLoadingCharges}
								keyboardType="phone-pad"
								onChange={onChange}
								name="unLoadingCharges"
							/>
							<EtripTextInput placeholder="Momul" defaultValue={momul} keyboardType="phone-pad" onChange={onChange} name="momul" />
							{unLoadingCharges ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
									<CheckBox checked={claimable} onPress={() => onChange({ name: 'claimable', value: !claimable })} />
									<TextComponent style={{ fontSize: 15 }} type={claimable ? FontType.BOLD : FontType.REGULAR}>
										Unloading Charges Claimable
									</TextComponent>
								</View>
							) : null}
							{momul ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
									<CheckBox checked={momulClaimable} onPress={() => onChange({ name: 'momulClaimable', value: !momulClaimable })} />
									<TextComponent style={{ fontSize: 15 }} type={momulClaimable ? FontType.BOLD : FontType.REGULAR}>
										Momul Claimable
									</TextComponent>
								</View>
							) : null}
						</View>
						<View style={{ flexDirection: 'row' }}>
							<ButtonComponent
								style={{ backgroundColor: Colors.danger, width: addressName && unLoadingCharges ? '50%' : '100%', borderRadius: 0 }}
								onPress={() => onModalChange('dropUpModalVisible', !dropUpModalVisible)}>
								Cancel
							</ButtonComponent>
							<ButtonComponent
								style={{ width: '50%', borderRadius: 0, backgroundColor: Colors.green }}
								onPress={() => {
									updatellocationData(state, index, isDrop);
									onModalChange('dropUpModalVisible', false);
								}}>
								Update
							</ButtonComponent>
						</View>
					</View>
				</View>
			</Modal>
			<TouchableOpacity
				onPress={() => {
					isDrop ? onModalChange('dropUpModalVisible', true) : onModalChange('pickUpModalVisible', true);
				}}
				style={{
					elevation: 3,
					marginVertical: 10,
					backgroundColor: Colors.white,
					borderRadius: 5,
					paddingVertical: 10,
					borderLeftWidth: 5,
					borderColor: !isDrop ? Colors.primaryThemeColor : Colors.green,
				}}>
				<View
					style={{
						paddingHorizontal: 10,
					}}>
					<TextComponent type={FontType.BOLD} style={{ fontSize: 18 }}>
						{addressName}
					</TextComponent>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingVertical: 10,
							}}>
							<TextComponent>{isDrop ? 'Unloading' : 'Loading'} Charges:</TextComponent>
							<TextComponent style={{ paddingLeft: 5 }} type={FontType.BOLD}>
								₹{isDrop ? unLoadingCharges : loadingCharges}
							</TextComponent>
						</View>
						{momul ? (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingVertical: 5,
								}}>
								<TextComponent>Momul:</TextComponent>
								<TextComponent style={{ paddingLeft: 5 }} type={FontType.BOLD}>
									₹{momul}
								</TextComponent>
							</View>
						) : null}
					</View>
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingRight: 5 }}>
					{claimable ? (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<CheckBox
								containerStyle={{
									margin: 0,
									padding: 0,
								}}
								checked={claimable}
							/>
							<TextComponent
								style={{ fontSize: 15, color: claimable ? Colors.primaryThemeColor : Colors.themeBlack }}
								type={claimable ? FontType.BOLD : FontType.REGULAR}>
								{isDrop ? 'Unloading Charges' : 'Loading Charges'} Claimable
							</TextComponent>
						</View>
					) : null}
					{momulClaimable ? (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<CheckBox
								containerStyle={{
									margin: 0,
									padding: 0,
								}}
								checked={momulClaimable}
							/>
							<TextComponent
								style={{ fontSize: 15, color: momulClaimable ? Colors.primaryThemeColor : Colors.themeBlack }}
								type={momulClaimable ? FontType.BOLD : FontType.REGULAR}>
								Momul Claimable
							</TextComponent>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		</Fragment>
	);
};

export default PickDropCard;
