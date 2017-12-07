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

  fitTitleText(input) {
    if(input.delta == 0) {
      return "perfect fit!"
    } else {
      var string = "";
      if(input.chest.fit > 0) {
        string = string + " Chest: +" + input.chest.fit;
      }

      if(input.waist.fit > 0) {
        string = string + " Waist: +" + input.waist.fit;
      }

      if(input.hip.fit > 0) {
        string = string + " Hip: +" + input.hip.fit;
      }

      if(input.height.fit > 0) {
        string = string + " Height: +" + input.height.fit;
      }
      return string;
  }
}

  render() {
    const {state} = this.props.navigation;

    return (
      <ScrollView>
        {
          state.params.fitResultArray.map(
            (brandItem, i) => (
              <View
                key={i}>
                <Text
                  style={{ marginLeft: 24 }}
                      h3>{brandItem.brand}
                </Text>
                <List containerStyle={{marginBottom: 20}}>
                  {
                    brandItem.fit.map(
                      (size, j) => (
                      <ListItem
                        key={j}
                        hideChevron={true}
                        title={"Size " + size['size'] + " " + this.fitTitleText(size) }
                        subtitle={" Chest: " + size.chest.range.upper + " - " + size['chest']['range']['lower'] +
                                " Waist: " + size.waist.range.upper + " - " + size['waist']['range']['lower'] +
                                " Hip: " + size.hip.range.upper + " - " + size['hip']['range']['lower'] +
                                " Height: " + size.height.range.upper + " - " + size['height']['range']['lower'] + " cm"}/>
                    ))
                  }
                </List>
              </View>
            )
          )
        }
      </ScrollView>
    );
  }
}
