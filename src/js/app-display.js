/**
 *
 * @flow
 * */

import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Schedule from "./schedule";
import RoutineNav from "./routines/routines-nav";
import {VIEW_SCHEDULE_PATH} from "./navigation/constants";
import {Link, Route, Router} from "./navigation/nav-import";
import {OpenRoutines} from "./routines/routines-control";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function TopMenu() {
  return (
    <View style={styles.topMenu}>
      <OpenRoutines/>
    </View>
  )
}

export default function AppDisplay() {
  return (
    <MuiThemeProvider>
      <Router>
        <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
          <TopMenu/>
          <RoutineNav/>
          <Route path={VIEW_SCHEDULE_PATH} exact={true} component={Schedule}/>
        </ScrollView>
      </Router>
    </MuiThemeProvider>
  )

  // return (<Text>other test</Text>)
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