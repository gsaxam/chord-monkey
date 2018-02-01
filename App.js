import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Font } from "expo";
import { StackNavigator } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Image
            style={{ width: 60, height: 60 }}
            source={require("./images/monkey.png")}
          />
          <View style={styles.spacer} />
          <Text style={styles.titleText}>Chord Monkey</Text>
        </View>
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
                  {item.value.split(" ").map((chord, i) => (
                    <Text style={styles.row_chord} key={i}>
                      {chord}
                    </Text>
                  ))}
                </View>
                <View Style={styles.lineBreak} />
                <Text style={styles.row_song_title}>{item.key}</Text>
              </View>
              <View style={styles.row_only_bottom}>
                {item.strum.split("").map((strum, i) => (
                  <Text style={styles.row_strum} key={i}>
                    {strum == "U" ? (
                      <FontAwesome>{Icons.arrowUp}</FontAwesome>
                    ) : null}
                    {strum == "D" ? (
                      <FontAwesome>{Icons.arrowDown}</FontAwesome>
                    ) : null}
                    {strum == " " ? " " : null}
                  </Text>
                ))}
              </View>
            </View>
          )}
        />
        <TouchableHighlight
          style={styles.addNewButton}
          onPress={() => navigate("New")}
        >
          <Text style={styles.addNewButtonLabel}> + </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class NewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { songTitle: null, chord: null, strumPattern: null };

    AsyncStorage.getItem("lessons", res => {
      this.setState({
        lessons: res
      });
      console.log(res)
    });
  }

  saveFormData = () => {
    console.log(this.state);
    // Get the data
    let songTitle = this.state.songTitle;
    let chord = this.state.chord;
    let strumPattern = this.state.strumPattern;

    // Retrieve the existing messages
    AsyncStorage.getItem("lessons", res => {
      var lessons;
      // If this is the first time, set up a new array
      if (res === null) {
        lessons = [];
      } else {
        lessons = JSON.parse(res);
      }
      // Add the new message
      lessons.push({
        songTitle: songTitle,
        chord: chord,
        strumPattern: strumPattern
      });

      // Save the messages
      AsyncStorage.setItem("lessons", JSON.stringify(lessons), res => {
        this.navigate("Home");
      });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Image
            style={{ width: 60, height: 60 }}
            source={require("./images/monkey.png")}
          />
          <View style={styles.spacer} />
          <Text style={styles.titleText}>Chord Monkey</Text>
        </View>
        <KeyboardAwareScrollView>
          <View style={{ padding: 20, flex: 1 }}>
            <View style={styles.row_cell_chord_songTitle}>
              <Text style={styles.new_input_label}> Song Title </Text>
              <TextInput
                style={styles.new_input_field}
                onChangeText={text => this.setState({ songTitle: text })}
                value={this.state.songTitle}
              />
              <Text style={styles.new_input_label}> Chords </Text>
              <TextInput
                style={styles.new_input_field}
                onChangeText={text => this.setState({ chord: text })}
                value={this.state.chord}
              />

              <Text style={styles.new_input_label}> Strumming Pattern </Text>
              <TextInput
                style={styles.new_input_field}
                onChangeText={text => this.setState({ strumPattern: text })}
                value={this.state.strumPattern}
              />
            </View>

            <View style={styles.row_only}>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => navigate("Home")}
              >
                <Text style={styles.buttonText}>
                  <FontAwesome>{Icons.timesCircle}</FontAwesome> Cancel
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.saveButton}
                onPress={this.saveFormData}
              >
                <Text style={styles.buttonText}>
                  <FontAwesome>{Icons.heart}</FontAwesome> Save
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    New: { screen: NewScreen }
  },
  {
    headerMode: "none"
  }
);

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
    return <AppNavigator />;
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
    color: "#22982e",
    padding: 1,
    fontSize: 12
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
    flexDirection: "row"
  },
  new_input_field: {
    height: 80,
    borderColor: "#ff8702",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 30,
    color: "#ee3450",
    backgroundColor: "#0e2739",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "sofia"
  },
  new_input_label: {
    color: "#029ecf",
    fontSize: 30,
    fontFamily: "lobster",
    paddingBottom: 20,
    paddingTop: 30
  },
  lineBreak: {
    marginTop: 10
  },
  saveButton: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#01d1b2",
    marginTop: 30,
    alignItems: "center",
    marginRight: 20
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fa6854",
    marginTop: 30,
    alignItems: "center",
    marginRight: 20
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "lobster",
    paddingLeft: 10,
    color: "#fff"
  },
  addNewButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#07132f",
    backgroundColor: "#ee3450",
    position: "absolute",
    bottom: 10,
    right: 10,
    overflow: "hidden"
  },
  addNewButtonLabel: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 5
  }
});
