import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './timer'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>POMODORO</Text>
      <Timer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
  text:{
    paddingBottom:10,
    fontSize:35,
    color:'darkred'
  }
 
});
