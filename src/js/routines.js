/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */


import React, {Component, PureComponent} from "react";
import {ScrollView, StyleSheet, Text, Button} from "react-native";
import {MemoryRouter, Route, Link } from 'react-router-native'

const routines = [{id: 1, title: "routine test", parent: null, children: [2,3]},
  {id: 2, title: "rt ch 2", parent: 1, children: []},
  {id: 3, title: "rt ch 3", parent: 1, children: []}];

const RoutineNav = () => (
   <MemoryRouter>
     <Routines match={{params: {id: null}, url: ''}}/>
   </MemoryRouter>
   )

class Routines extends Component {

  getChildren(id) {
    if (!id) {
      return routines.filter((r) => {
        return !r.parent
      })
    }
    const children = routines.find(id).children;
    return routines.filter((r) => {
      return children.includes(r.id)
    })
  }

  renderChildren(children) {
    return children.map((c) => {
      return (
      <Link key={c.id} to={`${this.props.match.url}/${c.id}`}>
        <Text>{c.title}</Text>
      </Link>
      )
    })
  }

  render() {
    const children = this.getChildren(this.props.match.params.id);
    return (
       <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
         <Button title="add routine" onPress={() => {}}></Button>
         {this.renderChildren(children)}
         <Route path={`${match.url}/:id`} component={Routines}/>
       </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    backgroundColor: 'black'
    // alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})

export default RoutineNav