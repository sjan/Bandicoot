import React from 'react';
import { FlatList, StyleSheet, Text, View, Slider, Image } from 'react-native';
import HumanImageView from './HumanView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chest: chest.default,
      waist: waist.default,
      hip: hip.default,
      height: height.default
    };
  }

  slidingChest(itemSelected) {
    this.setState({chest: itemSelected})
  }

  slidingWaist(itemSelected) {
    this.setState({waist: itemSelected})
  }

  slidingHip(itemSelected) {
    this.setState({hip: itemSelected})
  }

  slidingHeight(itemSelected) {
    this.setState({height: itemSelected})
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <HumanImageView style={{flex: 7, backgroundColor: 'skyblue'}} />
      <View style={styles.slider_controller_container} >
      <Image
      source={require('./my-icon.png')}
      style={styles.slider_controller_icon} />
      <View style={styles.slider_controller_sub_container}>
      <Text>Chest: {this.state.chest}cm</Text>
      <Slider
      maximumValue = {chest.max}
      minimumValue = {chest.min}
      step = {chest.step}
      value = {chest.default}
      onValueChange = {(val) => {this.slidingChest(val)}}/>
      </View>
      </View>
      <View style={styles.slider_controller_container} >
      <Image
      source={require('./my-icon.png')}
      style={styles.slider_controller_icon} />
      <View style={styles.slider_controller_sub_container}>
      <Text>Waist: {this.state.waist}cm</Text>
      <Slider
      maximumValue = {waist.max}
      minimumValue = {waist.min}
      value = {waist.default}
      step = {waist.step}
      onValueChange = {(val) => {this.slidingWaist(val)}}/>
      </View>
      </View>
      <View style={styles.slider_controller_container} >
      <Image
      source={require('./my-icon.png')}
      style={styles.slider_controller_icon} />
      <View style={styles.slider_controller_sub_container}>
      <Text>Hip: {this.state.hip}cm</Text>
      <Slider
      maximumValue = {hip.max}
      minimumValue = {hip.min}
      value = {hip.default}
      step = {hip.step}
      onValueChange = {(val) => {this.slidingHip(val)}}/>
      </View>
      </View>
      <View style={styles.slider_controller_container} >
      <Image
      source={require('./my-icon.png')}
      style={styles.slider_controller_icon} />
      <View style={styles.slider_controller_sub_container}>
      <Text>Height: {this.state.height}cm</Text>
      <Slider
      maximumValue = {height.max}
      minimumValue = {height.min}
      value = {height.default}
      step = {height.step}
      onValueChange = {(val) => {this.slidingHeight(val)}}/>
      </View>
      </View>
      </View>
    );
  }
}

const chest = {
  min: 60,
  max: 120,
  step: 1,
  default: 100
}

const hip = {
  min: 70,
  max: 130,
  step: 1,
  default: 90
}

const height = {
  min: 120,
  max: 200,
  step: 1,
  default: 180
}

const waist = {
  min: 50,
  max: 110,
  step: 1,
  default: 80
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  slider_controller_container: {
    flex: 1,
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    alignItems:'center'
  },
  slider_controller_sub_container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  slider_controller_icon: {
    width: 40,
    height: 40,
    marginLeft: 5
  }
});
