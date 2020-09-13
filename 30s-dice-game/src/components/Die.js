import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';

const getRandomValue = () => {
	return Math.floor(Math.random() * 6) + 1;
}

 const Die = ({value, callback, disabled}) => {
		return (
			<TouchableOpacity
				disabled={disabled}
				onPress={callback}
			  style={[styles.container, disabled ? styles.disabled : styles.enabled] }
			>
				<Text>{value}</Text>
			</TouchableOpacity>
		)
	};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		borderRadius: 10,
		backgroundColor: 'gray',
	},
	enabled: {
		opacity: 1
	},
	disabled: {
		opacity: 0.3
	}

});

export default Die;
