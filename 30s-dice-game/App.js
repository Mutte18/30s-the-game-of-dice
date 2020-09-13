import React from 'react';
import {createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import StartScreen from "./src/screens/StartScreen";
import HowToPlayScreen from "./src/screens/HowToPlayScreen";
import GameScreen from "./src/screens/GameScreen";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';



const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 2}}>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const switchNavigator = createSwitchNavigator({
  howToPlayFlow: createStackNavigator({
    Start: StartScreen,
    HowToPlay: HowToPlayScreen,
  }),
  Game: GameScreen
  /*gameFlow: createDrawerNavigator({
      Game: GameScreen,
      Start: StartScreen
  },
    { contentComponent: CustomDrawerComponent }
  )*/
});

const App = createAppContainer(switchNavigator);

export default () => {
  return <App/>
}
