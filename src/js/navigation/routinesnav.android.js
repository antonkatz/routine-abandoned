import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button, Platform} from "react-native";
import {MemoryRouter, Route, Link } from 'react-router-native'
import Routines from '../routines.js'

const RoutineNav = () => (
  <MemoryRouter>
    <Routines match={{params: {id: null}, url: ''}}/>
  </MemoryRouter>
)

export default RoutineNav