import React from 'react';
import FindSizeView from './FindSizeView';
import Test from './Test';
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

const FencingFitApp  = StackNavigator(
  {
    FindSizeView: {
      screen: FindSizeView,
      navigationOptions: {
          header: null
      }
    },
    ExploreSizeView: {
      screen: ExploreSizeView,
      navigationOptions: {
          header: null
      }
    },
    Test: {
      screen: Test,
      navigationOptions: {
          header: null
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FencingFitApp
          style={{ width: Dimensions.get("window").width }}
          screenProps={{ sizeData: sizeData }}/>
      </View>
    );
  }
}
