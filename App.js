import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Home from './home';
import { Font } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      lobster: require("./assets/fonts/Lobster/Lobster-Regular.ttf"),
      aclonica: require("./assets/fonts/Aclonica/Aclonica-Regular.ttf"),
      tangerine: require("./assets/fonts/Tangerine/Tangerine-Regular.ttf")
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
              {key: 'Papa Kehtey Hain', value: 'Am D F G'},
              {key: 'Neele Neele Ambar', value: 'Bb Em F#'},
              {key: 'Paani Da Rang', value: 'E D A'},
              {key: 'Jo Bheji Thie Dua', value: 'Bsus7 D7 F# Cm'},
              {key: 'Pehli Najar ', value: 'Am D F G'},
              {key: 'Jadu Hai Nasha', value: 'Am D F G'},
              {key: 'Main Agar Kahoon', value: 'Am D F G'},
              {key: 'Dil Deewana', value: 'Am D F G'},
              {key: 'O Rey Piya', value: 'Am D F G'},
            ]}
            renderItem={({item}) =>
            <View style={styles.listItem}>
              <View style={styles.row_cell_chord_songTitle}>
                <View style={styles.row_only}>
                {item.value.split(" ").map(chord => <Text style={styles.row_chord}>{chord}</Text>)}
                </View>
                <View Style={styles.lineBreak} />
                <Text style={styles.row_song_title}>{item.key}</Text>
              </View>
            </View>}
            />
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedddd',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  listItem: {
    flex: 1,
    elevation: 1,
    borderRadius: 2,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6
  },
  row_cell_chord_songTitle: {
      flex: 1,
      flexDirection: 'column'
        },
  row_chord: {
    color: 'black',
    includeFontPadding: false,
    flex: 0,
    fontSize: 16,
    color: '#fff',
    paddingRight: 5,
    paddingLeft: 5,

    borderRadius: 7,
    borderWidth: 2,
    marginRight: 5,
    borderColor: '#226898',
    backgroundColor: '#3598dc',
    overflow: 'hidden'
  },
  row_song_title: {
    color: '#353535c7',
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 30,
    fontFamily:'lobster'
  },
  row_only:{
    flexDirection: 'row'
  },
  lineBreak:{
    marginTop: 10
  }
});
