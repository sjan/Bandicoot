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
    this.setState({chest: itemSelected});
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
      <View style= {{flex: 1, flexDirection: 'column'}}>
        <HumanImageView
          chestWidth= {this.state.chest}
          waistWidth= {this.state.waist}
          hipWidth= {this.state.hip}
          fullHeight= {this.state.height}
          style= {{flex: 6, backgroundColor: 'skyblue'}} />
        <Text style= {{flex: 1, backgroundColor: 'red'}}>
          Best Fit
        </Text>
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
  min: 30,
  max: 60,
  step: 1,
  default: 48
}

const waist = {
  min: 30,
  max: 60,
  step: 1,
  default: 44
}

const hip = {
  min: 30,
  max: 64,
  step: 1,
  default: 52
}

const height = {
  min: 120, //4 feet
  max: 200, //11 ft
  step: 1,
  default: 176 //9feet
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
