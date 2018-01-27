import React from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';


export default class Home extends React.Component {
  render(){
    return(
        <View style={styles.topBar}>
          <Image style={{width: 60, height: 60}} source={require('./images/monkey.png')} />
          <View style={styles.spacer} />
          <Text style={styles.titleText}>Chord Monkey</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar:{
    marginTop: 20,
    backgroundColor: '#424242',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    height: 75
  },
  spacer: {
    marginRight: 10
  },
  titleText:{
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#35d381',
    fontFamily: 'aclonica'
  }
});
