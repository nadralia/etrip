import React, { Component, useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import { View, StyleSheet, Picker, ImageBackground, Image, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

export function ViewVehicleScreen({ navigation }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.sectionStyle}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1, fontSize: 14 , fontWeight : 'bold'}}>Vehicle Number</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>TN 67 AJ 4534</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Vehicle Modal</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>19ft</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Owner Name</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>Kirubaharan B</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Mobile 1</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>+91 9787476778</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Mobile 2</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>+91 9787476778</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Address</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>Anna Nagar, Madurai</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>PAN</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>XXXXXXXXXX</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Bank Name</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>ICICI Bank</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Account Number</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>43536567345</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>IFSC Code</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>ICICI0000453</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        textAlign: 'center',
        color: "#2196f3",
        fontSize: 24,
        fontWeight: '600',
        padding: 10
    },
    sectionStyle: {
        flex: 1, flexDirection: "column", padding: 20,
    },
    inputStyle: {
        paddingLeft: 10,
        letterSpacing: 1.2,
        height: 20
    }
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});