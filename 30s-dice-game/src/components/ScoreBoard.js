import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import Player from "./Player";

const getRandomValue = () => {
	return Math.floor(Math.random() * 6) + 1;
}

const ScoreBoard = ({players}) => {
	return (
		<View>
			<Text>
			Current HealthPoints:
			</Text>
			<FlatList
				keyExtractor={item => item.id.toString()}
				data={players}
				renderItem={({item}) => {
					return <View>
						<Player player={item} />
					</View>
				}}

			/>
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

export default ScoreBoard;


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
