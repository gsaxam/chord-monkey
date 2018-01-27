import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Home from "./home";
import { Font } from "expo";
import FontAwesome, { Icons } from "react-native-fontawesome";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      lobster: require("./assets/fonts/Lobster/Lobster-Regular.ttf"),
      aclonica: require("./assets/fonts/Aclonica/Aclonica-Regular.ttf"),
      tangerine: require("./assets/fonts/Tangerine/Tangerine-Regular.ttf"),
      sofia: require("./assets/fonts/Sofia/Sofia-Regular.ttf"),
      FontAwesome: require("./assets/fonts/fontawesome-webfont.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={styles.container}>
        {/** <SvgUri width="200" height="200" source={require('./homer-simpson.svg')} /> */}
        <Home />
        <View style={styles.lineBreak} />
        <FlatList
          data={[
            { key: "Papa Kehtey Hain", value: "Am D F G", strum: "DDU UDU" },
            { key: "Neele Neele Ambar", value: "Bb Em F#", strum: "DDU UDU" },
            { key: "Paani Da Rang Dekhe Ke", value: "E D A", strum: "DDU UDU" },
            {
              key: "Jo Bheji Thie Dua",
              value: "Bsus7 D7 F# Cm",
              strum: "DDU UDU"
            },
            { key: "Pehli Najar ", value: "Am D F G", strum: "DDU UDU" },
            { key: "Jadu Hai Nasha", value: "Am D F G", strum: "DDU UDU" },
            { key: "Main Agar Kahoon", value: "Am D F G", strum: "DDU UDU" },
            { key: "Dil Deewana", value: "Am D F G", strum: "DDU UDU" },
            { key: "O Rey Piya", value: "Am D F G", strum: "DDU UDU" }
          ]}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.row_cell_chord_songTitle}>
                <View style={styles.row_only}>
                  {item.value.split(" ").map(chord => (
                    <Text style={styles.row_chord}>
                      {chord}
                    </Text>
                  ))}
                </View>
                <View Style={styles.lineBreak} />
                <Text style={styles.row_song_title}>{item.key}</Text>
              </View>
              <View style={styles.row_only_bottom}>
                {item.strum.split('').map(strum => (
                  <Text style={styles.row_strum}>

                  {strum == 'U' ? <FontAwesome>{Icons.arrowUp}</FontAwesome> : null }
                  {strum == 'D' ? <FontAwesome>{Icons.arrowDown}</FontAwesome> : null }
                  {strum == ' ' ? " " : null }

                  </Text>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#001a2d",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column"
  },
  listItem: {
    flex: 1,
    elevation: 1,
    borderRadius: 2,
    backgroundColor: "#0e2739",
    flexDirection: "row", // main axis
    justifyContent: "flex-start", // main axis
    alignItems: "center", // cross axis
    paddingTop: 10,
    // paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6
  },
  row_cell_chord_songTitle: {
    flex: 1,
    flexDirection: "column"
  },
  row_chord: {
    includeFontPadding: false,
    flex: 0,
    fontSize: 14,
    color: "#fff",
    paddingTop: 2,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 3,
    marginRight: 5,
    borderColor: "#226898",
    backgroundColor: "#ee3450",
    overflow: "hidden",
    fontFamily: "aclonica"
  },
  row_strum: {
    color: '#22982e',
    padding: 1,
    fontSize: 12,
    },
  row_song_title: {
    color: "#029ecf",
    textAlignVertical: "top",
    includeFontPadding: false,
    flex: 0,
    fontSize: 30,
    fontFamily: "lobster",
    marginTop: 5
  },
  row_only: {
    flexDirection: "row"
  },
  row_only_bottom: {
    marginTop: 70,
    paddingBottom: 10,
    flexDirection: "row",
    textAlign: "right"
  },
  lineBreak: {
    marginTop: 10
  }
});
