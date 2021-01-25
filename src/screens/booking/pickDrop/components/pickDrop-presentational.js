import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import TextComponent from 'components/text';
import { FontType, IconType } from 'constants/AppConstants';
import { Colors } from 'constants/ThemeConstants';
import ButtonComponent from 'components/button-component';
import { heightPerc } from 'helpers/styleHelper';
import EtripTextInput from 'components/input';
import PickDropCard from './pickDropCard';

const PickDropPresentational = ({
	onChange,
	onModalChange,
	state,
	modalState: { pickUpModalVisible, dropUpModalVisible },
	addPickupLocation,
	addDropLocation,
	pickupLocations,
	dropLocations = [],
	updatellocationData,
}) => {
	const { claimable, momulClaimable, loadingCharges, unLoadingCharges, momul, addressName } = state;
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white, paddingHorizontal: 15 }}>
			<Modal isVisible={pickUpModalVisible} backdropTransitionOutTiming={0} animationIn="fadeIn" animationOut="fadeOut">
				<View style={{ backgroundColor: Colors.transparent, borderRadius: 8, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
					<View style={{ backgroundColor: Colors.white }}>
						<View style={{ minHeight: 60, backgroundColor: Colors.primaryThemeColor, alignItems: 'center', justifyContent: 'center' }}>
							<TextComponent style={{ fontSize: 18, color: Colors.white }} type={FontType.BOLD}>
								Pickup Location
							</TextComponent>
						</View>
						<View style={{}}>
							<EtripTextInput placeholder="Address" multiline onChange={onChange} name="addressName" />
							<EtripTextInput placeholder="Loading Charges" keyboardType="phone-pad" onChange={onChange} name="loadingCharges" />
							<EtripTextInput placeholder="Momul" keyboardType="phone-pad" onChange={onChange} name="momul" />
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
								<ButtonComponent style={{ width: '50%', borderRadius: 0 }} onPress={() => addPickupLocation(state)}>
									Save
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
							<EtripTextInput placeholder="Address" multiline onChange={onChange} name="addressName" />
							<EtripTextInput placeholder="Unloading Charges" keyboardType="phone-pad" onChange={onChange} name="unLoadingCharges" />
							<EtripTextInput placeholder="Momul" keyboardType="phone-pad" onChange={onChange} name="momul" />
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
								onPress={() => addDropLocation(state)}>
								Save
							</ButtonComponent>
						</View>
					</View>
				</View>
			</Modal>
			{pickupLocations.length !== 0 ? (
				pickupLocations.map((pickupLocation, i) => (
					<PickDropCard index={i} updatellocationData={updatellocationData} key={i} location={pickupLocation} />
				))
			) : (
				<ButtonComponent IconType={IconType.AntDesign} IconName={'plus'} onPress={() => onModalChange('pickUpModalVisible', true)}>
					Add Pickup Location
				</ButtonComponent>
			)}
			{dropLocations.map((dropLocation, i) => (
				<PickDropCard index={i} updatellocationData={updatellocationData} key={i} location={dropLocation} isDrop />
			))}
			<ButtonComponent
				IconType={IconType.AntDesign}
				IconName={'plus'}
				style={{ backgroundColor: Colors.green, marginTop: 10 }}
				onPress={() => onModalChange('dropUpModalVisible', !dropUpModalVisible)}>
				Add Drop Location
			</ButtonComponent>
		</ScrollView>
	);
};

export default PickDropPresentational;

const styles = StyleSheet.create({
	addButton: {
		height: 50,
		backgroundColor: Colors.primaryThemeColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		flexDirection: 'row',
	},
});
