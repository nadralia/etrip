import React, { Fragment, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import EtripSelect from 'components/select';
import { CheckBox, colors } from 'react-native-elements';
import { Colors } from 'constants/ThemeConstants';
import ETripDivider from 'components/divider';
import TextComponent from 'components/text';
import { FontType } from 'constants/AppConstants';
import { editBookingDetails, removeUser } from 'src/store/actions';
import { removeEmptySpace } from 'helpers';
import EtripDatePicker from 'components/datepicker';
import ButtonComponent from 'components/button-component';

const Expenses = ({ label, value, valueStyle = {}, profit = false }) => (
	<View style={[{ padding: 10, flexDirection: 'row' }, profit && { backgroundColor: Colors.red }]}>
		<View style={{ flex: 2 }}>
			<TextComponent style={[{ fontSize: 16 }, profit && { color: Colors.white }]} type={FontType.BOLD}>
				{label}
			</TextComponent>
		</View>
		<View style={{ flex: 1, alignItems: 'flex-end' }}>
			<TextComponent
				style={[{ fontSize: 18, color: Colors.primaryThemeColor }, valueStyle, profit && { color: Colors.white }]}
				type={FontType.BOLD}>
				{value}
			</TextComponent>
		</View>
	</View>
);

const data = [
	{
		label: 'Fixed',
		value: 'Fixed',
	},
	{
		label: 'KMs',
		value: 'KMs',
	},
];
const customerAdvanceTo = [
	{
		label: 'Driver',
		value: 'Driver',
	},
	{
		label: 'Transporter',
		value: 'Transporter',
	},
];

const TripFares = ({
	totalTripCost,
	customerAdvance,
	transportedAdvance,
	totalDriverCost,
	current_user,
	editBookingDetails,
	remove,
	parking,
	containerWages,
	toll,
	halt,
	rto,
	agentCommission,
	extraDelivery,
	dropLocations,
	pickupLocation,
	startKm,
	endKm,
	driverType,
	customerType,
	podRequired,
	podSubmitted,
	podSubmittedOn,
	fullPaymentPaidOn,
	tollClaimable,
	haltClaimable,
	extraDeliveryClaimable,
	parkingClaimable,
	containerWagesClaimable,
	rtoClaimable,
	agentCommissionClaimable,
	advanceTo,
}) => {
	const onChange = ({ name, value }) => {
		console.log(name, value);
		editBookingDetails('tripFares', name, value);
	};

	let totalFrieghtOtherExpense = 0;
	if (tollClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(toll);
	}
	if (haltClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(halt);
	}
	if (parkingClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(parking);
	}
	if (extraDeliveryClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(extraDelivery);
	}
	if (containerWagesClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(containerWages);
	}
	if (rtoClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(rto);
	}
	if (agentCommissionClaimable) {
		totalFrieghtOtherExpense += removeEmptySpace(agentCommission);
	}

	const otherExpense =
		removeEmptySpace(containerWages) +
		removeEmptySpace(parking) +
		removeEmptySpace(toll) +
		removeEmptySpace(halt) +
		removeEmptySpace(extraDelivery) +
		removeEmptySpace(rto) +
		removeEmptySpace(agentCommission);
	const [driverCostPerKMs, setdriverCostPerKMs] = useState(0);
	const [customerCostPerKMs, setcustomerCostPerKMs] = useState(0);
	const [frieghtAmountText, setfrieghtAmountText] = useState(0);
	const [driverAmountText, setdriverAmountText] = useState(0);
	const [driverKMSCost, setdriverKMSCost] = useState(1);
	const [customerKMSCost, setcustomerKMSCost] = useState(1);
	let pickupSum = 0;
	const loadingNonClaimable = !pickupLocation.claimable ? pickupLocation.loadingCharges : 0;
	const momulPickupNonClaimable = !pickupLocation.momulClaimable ? pickupLocation.momul : 0;
	const totalKMs = removeEmptySpace(endKm) ? removeEmptySpace(endKm) - removeEmptySpace(startKm) : 0;

	pickupSum = pickupLocation.reduce(
		(accumulator, currentValue) => accumulator + removeEmptySpace(currentValue.loadingCharges) + removeEmptySpace(currentValue.momul),
		0
	);

	const dropLocationSum = dropLocations.reduce(
		(accumulator, currentValue) => accumulator + removeEmptySpace(currentValue.unLoadingCharges) + removeEmptySpace(currentValue.momul),
		0
	);

	const unLoadingNonClaimable = dropLocations
		.filter((drop) => !drop.claimable)
		.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.unLoadingCharges), 0);
	const momulDropNonClaimable = dropLocations
		.filter((drop) => !drop.momulClaimable)
		.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.momul), 0);

	// const pickupNonClaimableTotal = parseInt(loadingNonClaimable) + parseInt(momulPickupNonClaimable);
	// const dropNonClaimableTotal = parseInt(unLoadingNonClaimable) + parseInt(momulDropNonClaimable);

	let drivCost = driverType === 'KMs' ? parseInt(totalKMs) * parseInt(driverCostPerKMs || 0) : driverAmountText;
	let custCost = customerType === 'KMs' ? parseInt(totalKMs) * parseInt(customerCostPerKMs || 0) : frieghtAmountText;

	const totalExpense = parseInt(pickupSum) + parseInt(dropLocationSum) + parseInt(otherExpense);
	console.log('loadingCharges', pickupSum, totalExpense);
	const totalFrieghtAmount = parseInt(custCost || 0) + totalFrieghtOtherExpense;
	const totalDriverAmount = parseInt(drivCost || 0) + totalExpense;
	const totalCustomerBalanceAmount = parseInt(totalFrieghtAmount) - parseInt(customerAdvance || 0);
	const totalTransporterBalanceAmount = parseInt(totalDriverAmount) - parseInt(transportedAdvance || 0);

	// console.log('otherExpense = parseInt(containerWages) + parseInt(parking);', parseInt(containerWages) + parseInt(parking), parseInt(otherExpense));
	// console.log('totalKMs', totalKMs);
	// console.log('pickupSum total', pickupSum);
	// console.log('dropLocationSum total', dropLocationSum);
	// console.log('loadingNonClaimable total', loadingNonClaimable);
	// console.log('momulPickupNonClaimable total', momulPickupNonClaimable);
	// console.log('total pickup non claimable', pickupNonClaimableTotal);
	// console.log('unLoadingNonClaimable total', unLoadingNonClaimable);
	// console.log('momulDropNonClaimable total', momulDropNonClaimable);
	// console.log('total drop non claimable', dropNonClaimableTotal);

	console.log('drivCost', drivCost, driverType, (parseInt(totalKMs) * parseInt(driverCostPerKMs || 0), driverCostPerKMs));
	console.log('custCost', custCost, customerType);
	console.log('totalFrieghtAmount', totalFrieghtAmount);
	console.log('totalDriverAmount', totalDriverAmount);
	console.log('pickupSum, dropLocationSum, otherExpense', pickupSum, dropLocationSum, otherExpense, advanceTo);

	const totalSum = pickupSum + dropLocationSum + otherExpense;

	const profitAmount =
		totalFrieghtAmount - parseInt(totalDriverAmount || 0) - (removeEmptySpace(customerAdvance) + removeEmptySpace(transportedAdvance));
	const profitPercent = profitAmount > 0 ? ((totalFrieghtAmount - totalDriverAmount) * 100) / totalFrieghtAmount : 0;
	const driverAmountView =
		advanceTo === 'Driver'
			? parseInt(totalDriverAmount || 0) - (removeEmptySpace(customerAdvance) + removeEmptySpace(transportedAdvance))
			: parseInt(totalDriverAmount || 0) - removeEmptySpace(transportedAdvance);
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white, paddingHorizontal: 10, paddingBottom: 10 }}>
			<EtripSelect data={data} placeholder="Customer Type" defaultValue={customerType} name={'customerType'} onChange={onChange} />
			<EtripSelect data={data} placeholder="Driver Type" defaultValue={customerType} name={'driverType'} onChange={onChange} />
			<View style={{ marginVertical: 5, backgroundColor: Colors.white, elevation: 5, paddingVertical: 10 }}>
				<Expenses
					label="Total KMs"
					valueStyle={{
						color: Colors.green,
					}}
					value={`${totalKMs}`}
				/>
				{customerType === 'KMs' && (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: 10,
							paddingBottom: 5,
						}}>
						<TextComponent type={FontType.BOLD}>Customer Cost</TextComponent>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5 }}
								onChangeText={(value) => setcustomerCostPerKMs(value)}
							/>
							<TextComponent style={{ paddingLeft: 5 }} type={FontType.BOLD}>
								/ KMs
							</TextComponent>
						</View>
					</View>
				)}
				{driverType === 'KMs' && (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: 10,
						}}>
						<TextComponent type={FontType.BOLD}>Driver Cost</TextComponent>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5 }}
								onChangeText={(value) => setdriverCostPerKMs(value)}
							/>
							<TextComponent style={{ paddingLeft: 5 }} type={FontType.BOLD}>
								/ KMs
							</TextComponent>
						</View>
					</View>
				)}
			</View>
			<View style={{ marginVertical: 5, backgroundColor: Colors.white, elevation: 5, padding: 10 }}>
				<TextComponent style={{ fontSize: 16 }} type={FontType.BOLD}>
					Total Freights
				</TextComponent>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
					<View style={{ flex: 1, alignItems: 'flex-start' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Freight
						</TextComponent>
						{customerType === 'KMs' ? (
							<TextComponent>{`${totalKMs} ${customerCostPerKMs ? `* ${customerCostPerKMs}(per kms)` : ''}`}</TextComponent>
						) : (
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5, width: '80%' }}
								onChangeText={(value) => setfrieghtAmountText(value)}
							/>
						)}
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Expenses
						</TextComponent>
						<TextComponent style={{ color: Colors.red }}>(+){totalFrieghtOtherExpense}</TextComponent>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Total
						</TextComponent>
						<TextComponent>{totalFrieghtAmount}</TextComponent>
					</View>
				</View>
			</View>
			<View style={{ marginVertical: 5, backgroundColor: Colors.white, elevation: 5, padding: 10 }}>
				<TextComponent style={{ fontSize: 16 }} type={FontType.BOLD}>
					Total Drivers
				</TextComponent>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
					<View style={{ flex: 1, alignItems: 'flex-start' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Freight
						</TextComponent>
						{driverType === 'KMs' ? (
							<TextComponent>{`${totalKMs} ${customerCostPerKMs ? `* ${driverCostPerKMs}(per kms)` : ''}`}</TextComponent>
						) : (
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5, width: '80%' }}
								onChangeText={(value) => setdriverAmountText(value)}
							/>
						)}
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Expenses
						</TextComponent>
						<TextComponent style={{ color: Colors.red }}>(+){totalExpense}</TextComponent>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end' }}>
						<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
							Total
						</TextComponent>
						<TextComponent>{totalDriverAmount}</TextComponent>
					</View>
				</View>
			</View>
			<ETripDivider withOr text="X" />
			<View style={{ marginVertical: 5, backgroundColor: Colors.white, elevation: 5, padding: 0 }}>
				<TextComponent style={{ fontSize: 16, alignSelf: 'center' }} type={FontType.BOLD}>
					Advance Amounts
				</TextComponent>

				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
						<View style={{ flex: 1, alignItems: 'flex-start' }}>
							<TextComponent></TextComponent>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								Customer
							</TextComponent>
						</View>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								Advance
							</TextComponent>
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5, width: '70%' }}
								onChangeText={(value) => onChange({ name: 'customerAdvance', value })}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								Balance
							</TextComponent>
							<TextComponent>{totalCustomerBalanceAmount}</TextComponent>
						</View>
					</View>
					<View style={{ paddingVertical: 10 }}>
						<EtripSelect
							data={customerAdvanceTo}
							placeholder="Customer advance to"
							defaultValue={advanceTo}
							name={'advanceTo'}
							onChange={onChange}
						/>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
						<View style={{ flex: 1, alignItems: 'flex-start' }}>
							<TextComponent></TextComponent>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								Transporter
							</TextComponent>
						</View>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								Advance
							</TextComponent>
							<TextInput
								keyboardType="number-pad"
								style={{ borderWidth: 1, padding: 0, paddingHorizontal: 5, width: '70%' }}
								onChangeText={(value) => onChange({ name: 'transportedAdvance', value })}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<TextComponent style={{ fontSize: 13 }} type={FontType.BOLD}>
								{''}
							</TextComponent>
							<TextComponent>{''}</TextComponent>
						</View>
					</View>
				</View>
			</View>
			<Expenses label="Driver" value={driverAmountView} />
			<ETripDivider withOr text="X" />
			{podRequired === 'yes' ? (
				<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, backgroundColor: Colors.whiteGrey, marginTop: 10 }}>
					<CheckBox checked={podSubmitted} onPress={() => onChange({ name: 'podSubmitted', value: !podSubmitted })} />
					<TextComponent style={{ fontSize: 15 }} type={podSubmitted ? FontType.BOLD : FontType.REGULAR}>
						Pod Submitted
					</TextComponent>
				</View>
			) : null}
			{podSubmitted && podRequired === 'yes' ? (
				<Fragment>
					<View style={{ flexDirection: 'column', paddingVertical: 5, backgroundColor: Colors.whiteGrey, marginTop: 10 }}>
						<View style={{ padding: 10, paddingBottom: 0 }}>
							<TextComponent type={FontType.BOLD}>Payment Submitted On</TextComponent>
						</View>
						<EtripDatePicker name="podSubmittedOn" defaultValue={podSubmittedOn} onChange={onChange} format="YYYY-MM-DD" />
					</View>
					<View style={{ flexDirection: 'column', paddingVertical: 5, backgroundColor: Colors.whiteGrey, marginTop: 10 }}>
						<View style={{ padding: 10, paddingBottom: 0 }}>
							<TextComponent type={FontType.BOLD}>Full Payment Paid On</TextComponent>
						</View>
						<EtripDatePicker name="fullPaymentPaidOn" defaultValue={fullPaymentPaidOn} onChange={onChange} format="YYYY-MM-DD" />
					</View>
					<View style={{ paddingTop: 10 }}>
						<ButtonComponent>
							<TextComponent>Paid</TextComponent>
						</ButtonComponent>
					</View>
				</Fragment>
			) : null}

			<View style={{ marginVertical: 5, backgroundColor: Colors.white, elevation: 5, borderRadius: 10, overflow: 'hidden' }}>
				<Expenses
					label="Profit"
					valueStyle={{
						color: Colors.green,
					}}
					profit
					value={`Rs.${profitAmount}`}
				/>
				{profitAmount > 0 ? (
					<Expenses
						label="Profit (%)"
						valueStyle={{
							color: Colors.green,
						}}
						value={`${profitPercent}%`}
					/>
				) : null}
			</View>

			{/* <EtripTextInput placeholder={'Total Freight Cost'} name="totalTripCost" defaultValue={totalTripCost} onChange={onChange} />
			<EtripTextInput placeholder={'Total Driver Cost'} name="totalDriverCost" defaultValue={totalDriverCost} onChange={onChange} />
			<EtripTextInput placeholder={'Advance from Customer'} name="customerAdvance" defaultValue={customerAdvance} onChange={onChange} />
			<EtripTextInput
				placeholder={'Advance from Transporter'}
				name="transportedAdvance"
				defaultValue={transportedAdvance}
				onChange={onChange}
			/>
			<Expenses label="Balance Driver amount" value={parseInt(transportedAdvance) + parseInt(customerAdvance) - parseInt(totalDriverCost)} />
			<Expenses label="Balance Customer amount" value={parseInt(customerAdvance) + parseInt(totalTripCost)} />
			<ETripDivider withOr text="X" />
			<TextComponent
				style={{ alignSelf: 'center', fontSize: 18, textDecorationLine: 'underline', color: Colors.primaryThemeColor }}
				type={FontType.BOLD}>
				Expenses
			</TextComponent>
			<View style={{ borderWidth: 1.5, borderColor: Colors.accDividerColor, marginTop: 10, backgroundColor: Colors.white }}>
				<Expenses label="Total Trip Cost" value={totalTripCost} />
				<Expenses label="Total Expense" value={pickupSum + dropLocationSum} />
				<Expenses
					label="Non Claim. Expense"
					valueStyle={{
						color: Colors.like,
					}}
					value={`(-)${totalSum}`}
				/>
				<Expenses label="Total BIll" value={totalSum} />
			</View>
			<View style={{ borderWidth: 1.5, borderColor: Colors.accDividerColor, marginTop: 10, backgroundColor: Colors.white }}>
				<Expenses label="Total Driver Cost" value={otherExpense} />
				<Expenses label="Expense" value={pickupSum + dropLocationSum} />
				<Expenses
					label="Profit"
					valueStyle={{
						color: Colors.green,
					}}
					value={`${totalSum}`}
				/>
				<Expenses
					label="Profit %"
					valueStyle={{
						color: Colors.green,
					}}
					value={totalSum}
				/>
			</View> */}
		</ScrollView>
	);
};

const mapStateToProps = ({
	user: { current_user },
	bookingDetails: {
		tripFares: {
			totalTripCost,
			customerAdvance,
			transportedAdvance,
			totalDriverCost,
			driverType,
			customerType,
			podSubmitted,
			podSubmittedOn,
			fullPaymentPaidOn,
			advanceTo,
		},
		pickupDrop: { pickupLocation, dropLocations },
		otherInfo: {
			product,
			weight,
			startKm,
			endKm,
			vehicle,
			driverName,
			contactNumber,
			boxCount,
			parking,
			containerWages,
			punture,
			podRequired,
			toll,
			halt,
			rto,
			agentCommission,
			extraDelivery,
			tollClaimable,
			haltClaimable,
			extraDeliveryClaimable,
			parkingClaimable,
			containerWagesClaimable,
			rtoClaimable,
			agentCommissionClaimable,
		},
	},
}) => {
	return {
		totalTripCost,
		customerAdvance,
		transportedAdvance,
		totalDriverCost,
		current_user,
		parking,
		containerWages,
		dropLocations,
		pickupLocation,
		startKm,
		endKm,
		driverType,
		customerType,
		podRequired,
		podSubmitted,
		podSubmittedOn,
		fullPaymentPaidOn,
		toll,
		halt,
		rto,
		agentCommission,
		extraDelivery,
		tollClaimable,
		haltClaimable,
		extraDeliveryClaimable,
		parkingClaimable,
		containerWagesClaimable,
		rtoClaimable,
		agentCommissionClaimable,
		advanceTo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editBookingDetails: (field, label, value) => dispatch(editBookingDetails(field, label, value)),
		removeUser: () => dispatch(removeUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TripFares);
