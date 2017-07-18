import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button, Platform} from "react-native";
import {MemoryRouter, Route, Link } from 'react-router-dom'
import Routines from '../routines.js'
// import {wrapWithLink, generateRoute} from './helpers'

const RoutineNav = () => (
  <MemoryRouter>
    {/*{generateRoute(`${this.match.url}/:id`, Routines)}*/}
    <Route path="/routine/:id" children={ ({match}) =>
      (
      <Routines match={match ? match : {params: {id: null}, url: ''} }/>
      )
    }/>
  </MemoryRouter>
);

export default RoutineNav