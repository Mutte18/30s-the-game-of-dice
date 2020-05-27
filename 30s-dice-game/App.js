import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from "./src/screens/StartScreen";
import HowToPlayScreen from "./src/screens/HowToPlayScreen";
import GameScreen from "./src/screens/GameScreen";


const switchNavigator = createSwitchNavigator({
  howToPlayFlow: createStackNavigator({
    Start: StartScreen,
    HowToPlay: HowToPlayScreen,
  }),
  Game: GameScreen,
});

const App = createAppContainer(switchNavigator);

export default () => {
  return <App/>
}
