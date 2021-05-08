import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import {FlatList} from "react-native-web";

const getRandomValue = () => {
	return Math.floor(Math.random() * 6) + 1;
}

const Player = ({player}) => {
	return (
		<View>
			<Text>Player {player.id + 1}: {player.healthPoints}</Text>
		</View>
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

export default Player;


/*
<FlatList
				keyExtractor={item => item.id.toString()}
				horizontal={true}
				data={storedDice}
				renderItem={({item}) => {
					return <View>
						<Die
							value={item.value}
							callback={() => { if (!item.disabled) {
							dispatch({type: 'revert_stored_die', payload: item});
							}}}
							disabled={item.disabled}
						/>
					</View>

				}
				}
 */
