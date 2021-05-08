import React, {useReducer, useEffect} from 'react';
import {Button, FlatList, StyleSheet, TouchableOpacity, View, Text} from 'react-native';


import Die from "../components/Die";
import ScoreBoard from "../components/ScoreBoard";
import Spacer from "../components/Spacer";

const reducer = (state, action) => {
	switch (action.type) {
		case 'store_rolled_die':
			return {...state,
				storedDice: [...state.storedDice, action.payload],
				remainingDice: state.remainingDice.filter((die) => die !== action.payload)
			};
		case 'revert_stored_die':
			return {
				...state,
				remainingDice: [...state.remainingDice, action.payload],
				storedDice: state.storedDice.filter((die) => die !== action.payload)
			};
		case 'toggle_stored_dice':
			return {...state,
				storedDice: state.storedDice.map((item) => {
				return {
					...item,
					disabled: true,
				};
			})
			};
		case 'roll_remaining_dice':
			return {...state,
				remainingDice: state.remainingDice.map((item) => {
					return {
						...item,
						value: Math.floor(Math.random() * 6) + 1,
					};
				}),
				hasRolled: state.hasRolled = false
			};
		case 'enable_roll_for_damage_mode':
			return {...state,
				rollForDamageMode: state.rollForDamageMode = true,
				desiredDieNumber: state.desiredDieNumber = action.payload
			};

		case 'clear_rolled_and_remaining_dice':
			return {...state,
				remainingDice: [],
				storedDice: []
			};

		case 'inflict_damage':
			return {...state,
				players: state.players.map((player) => {
					return player.id === action.payload.player.id ? {
						...player,
						healthPoints: player.healthPoints -= action.payload.damageToInflict <= 0
							? player.healthPoints -= action.payload.damageToInflict : 0,
						isAlive: player.healthPoints > 0
					} : player
				})
			};

		case 'set_active_player':
			return {
				...state,
				activePlayer: action.payload
			};

		case 'set_turn_over':
			return {
				...state,
				remainingDice: initializeDice(6),
				storedDice: [],
				rollForDamageMode: false,
				activePlayer: action.payload.activePlayer
			};

		case 'reset_game':
			return {
				...state,
				players: initializePlayers(3),
				remainingDice: initializeDice(6),
				storedDice: [],
				rollForDamageMode: false,
			};

		case 'log_state':
			console.log(state);
			return state;
		default:
			return state;
	}
};

const sumDiceValues = (state) => {
	const storedDiceAmount = state.storedDice.reduce((totalAmount, item) => totalAmount + item.value, 0);
	return state.remainingDice.reduce((totalAmount, item) => totalAmount + item.value, storedDiceAmount);
};

const okToReroll = (state) => {
	return state.storedDice.filter(die => !die.disabled).length > 0 || state.storedDice.length === 6;
};

const rollDice = (dispatch, state) => {
	dispatch({ type: 'roll_remaining_dice'});
	dispatch({ type: 'toggle_stored_dice'});
	checkIfLastDieRolled(dispatch, state);
};

const inflictSelfDamage = (dispatch, state, diceSumValue, player) => {
	const damageToInflict = 30 - diceSumValue;
	dispatch({ type: 'inflict_damage', payload: {damageToInflict, player}});
};

const checkIfLastDieRolled = (dispatch, state) => {
	if ((state.storedDice.filter(die => !die.disabled).length > 0) && (state.storedDice.length === 6)) {

		const diceSumValue = sumDiceValues(state);
		if (diceSumValue < 30) {
			// inflictSelfDamage(dispatch, state, diceSumValue, getActivePlayer(state));
			inflictSelfDamage(dispatch, state, diceSumValue, state.activePlayer);
			dispatch({type: 'set_turn_over', payload: {
				activePlayer: getNextAlivePlayer(state.player, state.activePlayer.id),
				}})
		}
		else if (diceSumValue > 30) {

		}
	}
};

const resetGame = (dispatch, state) => {

	dispatch({ type: 'reset_game'});
};

const initializeDice = (diceCount) => {
	const remainingDice = [];
	for (let i = 0; i < diceCount; i++) {
		remainingDice.push({
			id: i,
			value: Math.floor(Math.random() * 6) + 1,
			disabled: false
		})
	}
	return remainingDice;
};

const initializePlayers = (playerCount) => {
	const players = [];
	for (let i = 0; i < playerCount; i++) {
		players.push({
			id: i,
			healthPoints: 10 + i,
			isAlive: true
		})
	}
	return players;
};

const getNextAlivePlayer = (players, nextIdToCheck) => {
	const alivePlayer = players.find(player => player.id === nextIdToCheck && player.isAlive);
	if (alivePlayer) {
		return alivePlayer;
	}

	let nextPlayerId = players[nextIdToCheck + 1].id;
	if (nextPlayerId === players.length -1) {
		nextPlayerId = players[0].id;
	}
	return getNextAlivePlayer(players, nextPlayerId);
};

const GameScreen = ({ navigation }) => {
	const initialPlayers = initializePlayers(3);
	const [state, dispatch] = useReducer(reducer, {
		players: initialPlayers,
		remainingDice: initializeDice(6),
		storedDice: [],
		rollForDamageMode: false,
		firstRoundOver: false,
		desiredDieNumber: 0,
		activePlayer: initialPlayers[0]
	});

	const { storedDice, remainingDice } = state;
	const errorMessage = "Save atleast one Die before you can roll again!";

	return (
		<View style={styles.gameBoard}>
			<View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
				<ScoreBoard players={state.players} />
			</View>
			<View style={{flex: 1}}>
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
			/>
			</View>

			{okToReroll(state) ? null : <Text style={styles.errorMessage}>{errorMessage}</Text> }

			<Text>{sumDiceValues(state)} </Text>
			<View style={{flex: 1}}>
				<FlatList
					keyExtractor={item => item.id.toString()}
					horizontal={true}
					data={remainingDice}
					renderItem={({item}) => {
						return <View>
							<Die
								value={item.value}
								callback={() => { if (!item.disabled) {
									dispatch({type: 'store_rolled_die', payload: item});
								}}}
								disabled={item.disabled}
							/>
						</View>
					}
				}
				/>
			</View>

			<Button title={"Log state"} onPress={() => dispatch({ type: 'log_state'})}/>
			<Spacer />
			<Button title={"Roll dice"} disabled={!okToReroll(state)} onPress={
				() => rollDice(dispatch, state)}/>
			<Spacer />

			<Text>ActivePlayer: {JSON.stringify(state.activePlayer)}</Text>

			<Button title={"Reset"}  onPress={
				() => resetGame(dispatch, state)}/>



		</View>
	)
};

/*
<Button
					title={"End Game"}
					onPress={() => navigation.navigate("Start")}>
				</Button>
 */

const styles = StyleSheet.create({
	gameBoard: {
		justifyContent: 'center',
		width: 414,
		height: 600,
		backgroundColor: 'lightblue',
		padding: 20
	},
	errorMessage: {
		color: 'red'
	}
});

export default GameScreen;
