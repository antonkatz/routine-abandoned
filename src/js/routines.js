/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {wrapWithLink, generateRoute} from './navigation/helpers'

const routines = [{id: 1, title: "routine test", parent: null, children: [2,3]},
  {id: 2, title: "rt ch 2", parent: 1, children: []},
  {id: 3, title: "rt ch 3", parent: 1, children: []}];

export default class Routines extends Component {
  getChildren(dirtyId) {
    const id = Number(dirtyId);
    if (!id) {
      return routines.filter((r) => {
        return !r.parent
      })
    }
    const routine = routines.find((r) => {return r.id === id} );
    const children = routine.children;
    return routines.filter((r) => {
      return children.includes(r.id)
    })
  }

  renderChildren(children) {
    return children.map((c) => {
      return (
        wrapWithLink(<Text>{c.title}</Text>, c.id, `/routine/${c.id}`)
      )
    })
  }

  renderView() {
    const children = this.getChildren(this.props.match.params.id);
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
        <Button title="add routine" onPress={() => {}}></Button>
        {
          this.renderChildren(children)
        }
      </ScrollView>
    )
  }

  render() {
    return (
        <View>
          {this.renderView()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    // backgroundColor: 'black'
    // alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})