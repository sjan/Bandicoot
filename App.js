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

let MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const outputRange = [.1, 1, 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
      opacity
    };
};


let TransitionConfiguration = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps;
            const {index} = scene;
            return MyTransition(index, position);
        }
    }
};

const FencingFitApp  = StackNavigator(
  {
    FindSizeView: {
      screen: FindSizeView
    },
    ExploreSizeView: {
      screen: ExploreSizeView
    }
  },
  {
      transitionConfig: TransitionConfiguration
  });

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
