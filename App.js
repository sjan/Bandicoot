import React from 'react';
import { FlatList, StyleSheet, Text, View, Slider, Image } from 'react-native';
import HumanImageView from './HumanView';

let allstarSizeData = require('./allstar_2017.json');

export default class App extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
      chest: chest.default,
      waist: waist.default,
      hip: hip.default,
      height: height.default,
    };
  }

  findSize() {
    var mensSizeArray = allstarSizeData.MEN.sizes;
    for(var i in mensSizeArray) {

       var sizeObject = mensSizeArray[i];
       chestRange = sizeObject.chest;
       heightRange = sizeObject.height;
       waistRange = sizeObject.waist;
       hipRange = sizeObject.hip;

      if(this.inRange(chestRange, this.state.chest) &&
          this.inRange(heightRange, this.state.height) &&
          this.inRange(waistRange, this.state.waist) &&
          this.inRange(hipRange, this.state.hip)) {
        console.log("measurement " +
        this.state.chest + " " +
        this.state.height + " " +
        this.state.waist + " " +
        this.state.hip);
        console.log("matching size " + mensSizeArray[i].size);
      }
    }
  }

  inRange(range, size) {
      if(size >= range.lower && size <= range.upper) {
        return true;
      } else {
        return false;
      }
  }

  slidingChest(itemSelected) {
    this.setState({chest: itemSelected});
    this.findSize();
  }

  slidingWaist(itemSelected) {
    this.setState({waist: itemSelected})
    this.findSize();
  }

  slidingHip(itemSelected) {
    this.setState({hip: itemSelected})
    this.findSize();
  }

  slidingHeight(itemSelected) {
    this.setState({height: itemSelected})
    this.findSize();
  }

  render() {


    return (
      <View style= {{flex: 1, flexDirection: 'column'}}>
        <HumanImageView
          chestSize= {this.state.chest}
          waistSize= {this.state.waist}
          hipSize= {this.state.hip}
          fullHeight= {this.state.height}
          style= {{flex: 6, backgroundColor: 'skyblue'}} />
        <View style = {styles.size_label_container} >
            <Text style = {styles.size_label_text} >
              Brand and Size
            </Text>
        </View>
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
              onSlidingComplete = {(val) => {console.log("chest slide completed")}}
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
  default: 96
}

const waist = {
  min: 55,
  max: 120,
  step: 1,
  default: 88
}

const hip = {
  min: 60,
  max: 130,
  step: 1,
  default: 104
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
  },
  size_label_container: {
    height: 80,
    backgroundColor: 'lightyellow',
    alignItems:'center',
    justifyContent: 'center'
  },
  size_label_text: {
    height: 30,
    alignItems:'center',
    justifyContent: 'center'
  }
});
