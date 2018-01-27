import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.topBar}>
        <Image
          style={{ width: 60, height: 60 }}
          source={require("./images/monkey.png")}
        />
        <View style={styles.spacer} />
        <Text style={styles.titleText}>Chord Monkey</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#063955",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    height: 75
  },
  spacer: {
    marginRight: 10
  },
  titleText: {
    marginTop: 5,
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sofia"
  }
});
