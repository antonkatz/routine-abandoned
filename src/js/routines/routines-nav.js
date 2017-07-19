import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button, Platform} from "react-native";
import {Router, Route, Link } from '../navigation/nav-import'
import Routines from './routines-display.js'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'

const RoutineNav = () => {
  return (
    <View>
    <Route path={`${VIEW_ROUTINES_PATH}:id`} exact={false} component={Routines}/>
    <Route path="/" exact={false} component={Routines}/>
    </View>
  )
}
export default RoutineNav