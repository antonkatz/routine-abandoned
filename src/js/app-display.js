/**
 *
 * @flow
 * */

import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Schedule from "./schedule";
import {VIEW_SCHEDULE_PATH} from "./navigation/constants";
import {Link, Route, Router} from "./navigation/nav-import";
import {OpenRoutines} from "./routines/routines-controls";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import Routines from './routines/routines-bindings'
import Routines from './routines/routines-bindings'
import {VIEW_ROUTINES_PATH} from './navigation/constants'

function TopMenu() {
  return (
    <View style={styles.topMenu}>
      <OpenRoutines/>
    </View>
  )
}

function HomeScreen() {
  return (
    <View>
      <TopMenu/>
      <Schedule/>
    </View>
  )
}

export default function AppDisplay() {
  return (
    <MuiThemeProvider>
      <Router>
        <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
          <Route path={`${VIEW_ROUTINES_PATH}:id?`} exact={false} component={Routines}/>
          <Route path={VIEW_SCHEDULE_PATH} exact={true} component={HomeScreen}/>
        </ScrollView>
      </Router>
    </MuiThemeProvider>
  )
}

const styles = StyleSheet.create({
  topMenu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "center"
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'nowrap'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});