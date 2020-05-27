import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from "./src/screens/StartScreen";
import HowToPlayScreen from "./src/screens/HowToPlayScreen";
import GameScreen from "./src/screens/GameScreen";

const navigator = createStackNavigator({
  Start: StartScreen,
  HowToPlay: HowToPlayScreen,
  Game: GameScreen,
}, {
  initialRouteName: 'Start',
  defaultNavigationOptions: {
    title: '30 Game of Dice'
  }
});

const App = createAppContainer(navigator);

export default () => {
  return <App/>
}
