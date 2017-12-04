import React from 'react';
import FindSizeView from './FindSizeView';
import ExploreSizeView from './ExploreSizeView';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};

const FencingFitApp  = StackNavigator({
  FindSizeView: {
    screen: FindSizeView
  },
  ExploreSizeView: {
    screen: ExploreSizeView
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
        }}>
        <FencingFitApp
          style={{ width: Dimensions.get("window").width }}
          screenProps={{ sizeData: sizeData }}/>
      </View>
    );
  }
}
