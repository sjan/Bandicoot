import React from 'react';
import { Text, List, ListItem } from 'react-native-elements';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};

export default class FindSizeView extends React.Component {
  static navigationOptions = {
    title: 'Brand and Size',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  lookupSize(brand, type, size) {
    var sizes = sizeData[brand].MEN.sizes;
    for(i=0;i<sizes.length;i++) {
       if(sizes[i]["size"] == size) {
         return sizes[i];
       }
    }
    return "";
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <ScrollView>

        <Text h3>{state.params.fitResultArray[0].brand}</Text>

        <List containerStyle={{marginBottom: 20}}>
          {
            state.params.fitResultArray[0]['fit'].map((item, i) => (
              <ListItem
                key={i}
                title={state.params.fitResultArray[0]['brand']+ " " + item[2]}
                subtitle={"Chest: " + item[3] + " Height: " + item[4] + " Waist: " +item[5] + " Hip: " + item[6]}
              />
            ))
          }
      </List>

      <Text h3>{state.params.fitResultArray[1].brand}</Text>

      <List containerStyle={{marginBottom: 20}}>
        {
          state.params.fitResultArray[1]['fit'].map((item, i) => (
            <ListItem
              key={i}
              title={state.params.fitResultArray[1]['brand']+ " " + item[2]}
              subtitle={"Chest: " + item[3] + " Height: " + item[4] + " Waist: " +item[5] + " Hip: " + item[6]}
            />
          ))
        }
    </List>

<Text h3>{state.params.fitResultArray[2].brand}</Text>

    <List containerStyle={{marginBottom: 20}}>
      {
        state.params.fitResultArray[2]['fit'].map((item, i) => (
          <ListItem
            key={i}
            title={state.params.fitResultArray[2]['brand']+ " " + item[2]}
            subtitle={"Chest: " + item[3] + " Height: " + item[4] + " Waist: " +item[5] + " Hip: " + item[6]}
          />
        ))
      }
  </List>

  <Text h3>{state.params.fitResultArray[3].brand}</Text>

  <List containerStyle={{marginBottom: 20}}>
    {
      state.params.fitResultArray[3]['fit'].map((item, i) => (
        <ListItem
          key={i}
          title={state.params.fitResultArray[3]['brand']+ " " + item[2]}
          subtitle={"Chest: " + item[3] + " Height: " + item[4] + " Waist: " +item[5] + " Hip: " + item[6]}
        />
      ))
    }
</List>
      </ScrollView>
    );
  }
}
