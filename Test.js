import React from 'react';
import {View,  Text} from 'react-native';

export default class Test extends React.Component {
  static navigationOptions = {
    title: 'Test'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>TEST VIEW</Text>
      </View>
    );
  }
}
