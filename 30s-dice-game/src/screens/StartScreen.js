import React from 'react';
import { View, Text, Button } from 'react-native';

const StartScreen = ({navigation}) => {
	return (
		<View>
			<Button
				title={"Start Game"}
				onPress={() => navigation.navigate("Game")}>
			</Button>
			<Button
				title={"How To Play"}
				onPress={() => navigation.navigate("HowToPlay")}>
			</Button>
		</View>
	)
};

export default StartScreen;
