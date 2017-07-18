import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button, Platform} from "react-native";
import {MemoryRouter, Route, Link } from 'react-router-dom'
import Routines from '../routines/routines.js'

const RoutineNav = () => (
  <MemoryRouter>
    <Route path="/routine/:id" children={ ({match}) =>
      (
      <Routines match={match ? match : {params: {id: null}} }/>
      )
    }/>
  </MemoryRouter>
);

export default RoutineNav