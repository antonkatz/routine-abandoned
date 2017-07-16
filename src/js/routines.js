/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */


import React, {PureComponent} from "react";
import {ScrollView, StyleSheet, Text, Button} from "react-native";
import { StackNavigator } from 'react-navigation';


// const RoutineNavigator = StackNavigator({
//   Routines: {
//     screen: Routines
//   },
// });

export default class Routines extends PureComponent {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
       <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>

        <Button title="add routine" onPress={() => {}}></Button>
       </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    // backgroundColor: 'whitesmoke',
    alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})