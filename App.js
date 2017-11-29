import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  Easing,
  View,
  Slider,
  Animated,
  Image
} from 'react-native';

import HumanImageView from './HumanView';

const CHEST_PARAMETERS = {
  min: 62,
  max: 125,
  step: 1,
  default: 96
}

const WAIST_PARAMETERS = {
  min: 55,
  max: 110,
  step: 1,
  default: 88
}

const HIP_PARAMETERS = {
  min: 65,
  max: 127,
  step: 1,
  default: 104
}

const HEIGHT_PARAMETERS = {
  min: 120,
  max: 200,
  step: 1,
  default: 176
}

const styles = StyleSheet.create({
  slider_controller_container: {
    flex: 1,
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    alignItems: 'center'
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
  label_container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'lightyellow'
  },
  size_label_text: {
    height: 30
  },
  controller_container: {
    flexDirection: 'column',
    flex: 4,
  }
});

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chest:  CHEST_PARAMETERS.default,
      waist:  WAIST_PARAMETERS.default,
      hip:    HIP_PARAMETERS.default,
      height: HEIGHT_PARAMETERS.default,

      //TODO: initial state should carry over from previous sessions
      bestFitBrand: 'ALLSTAR',
      bestFitSize: '50',
      bestFit: ['ALLSTAR', 0, 0],

      labelPosition: new Animated.Value(0),
      labelElevation: new Animated.Value(0),
      labelHeight: new Animated.Value(60),
      flexMain: 6,
      flexInfo: new Animated.Value(1),
      labelOpacity: 1,
      flexSlider: 2
    };
  }

  searching() {
    this.state.bestFitSize = '';
    this.state.bestFitDelta = '';
    this.state.bestFitBrand = 'Searching...';

    Animated.spring(
      this.state.labelHeight,
      {
        toValue: 0,
        speed: 2,
      }
    ).start();
  }

  findSize() {
    var pbtMensSizeArray     = sizeData['PBT'].MEN.sizes;
    var allstarMensSizeArray = sizeData['ALLSTAR'].MEN.sizes;
    var uhlmannMensSizeArray = sizeData['UHLMANN'].MEN.sizes;
    var negriniMensSizeArray = sizeData['NEGRINI'].MEN.sizes;

    var fitResultArray = [];
    var perfectFitResultArray = [];

    for (var brand in sizeData) {
      if (sizeData.hasOwnProperty(brand)) {
        var array = sizeData[brand].MEN.sizes
        for (var i in array) {
          var sizeObject = array[i];

          chestRange = sizeObject.chest;
          heightRange = sizeObject.height;
          waistRange = sizeObject.waist;
          hipRange = sizeObject.hip;

          chestFit = this.fit(chestRange, this.state.chest);
          heightFit = this.fit(heightRange, this.state.height);
          waistFit = this.fit(waistRange, this.state.waist);
          hipFit = this.fit(hipRange, this.state.hip);

          fitDelta = chestFit + heightFit + waistFit + hipFit;

          if (chestFit == 0 &&
            heightFit == 0 &&
            waistFit == 0 &&
            hipFit == 0) {
            perfectFitResultArray.push([
              brand, allstarMensSizeArray[i].size
            ]);
          } else if (chestFit >= 0 &&
            heightFit >= 0 &&
            waistFit >= 0 &&
            hipFit >= 0) {
            fitResultArray.push([
              fitDelta, brand, allstarMensSizeArray[i].size
            ]);
          }
        }
      }
    }

    fitResultArray.sort(function(a, b) {
      return a[0] - b[0];
    });

    if (perfectFitResultArray.length > 0) {
      this.state.bestFit = [
        perfectFitResultArray[0][0],
        perfectFitResultArray[0][1]
      ];
    } else if (fitResultArray.length > 0) {
      this.state.bestFit = [
        fitResultArray[0][1],
        fitResultArray[0][2],
        fitResultArray[0][0]
      ];
    } else {
      this.state.bestFit = ['No Match', '', ''];
    }

    this.state.bestFitBrand = this.state.bestFit[0];
    this.state.bestFitSize = this.state.bestFit[1];
    this.state.bestFitDelta = this.state.bestFit[2];

    Animated.spring(
      this.state.labelHeight,
      {
        toValue: 60,
        tension: 50,
      }
    ).start();
  }

  inRange(range, size) {
    if (size >= range.lower && size <= range.upper) {
      return true;
    } else {
      return false;
    }
  }

  fit(range, size) {
    if (size >= range.lower && size <= range.upper) {
      return 0;
    } else if (size < range.lower) {
      return (range.lower - size);
    } else if (size > range.upper) {
      return (range.upper - size);
    }
  }

  slidingChest(itemSelected) {
    this.setState({chest: itemSelected});
    this.searching();
  }

  slidingChestComplete(itemSelected) {
    this.setState({chest: itemSelected});
    this.findSize();
  }

  slidingWaist(itemSelected) {
    this.setState({waist: itemSelected})
    this.searching();
  }

  slidingWaistComplete(itemSelected) {
    this.setState({waist: itemSelected})
    this.findSize();
  }

  slidingHip(itemSelected) {
    this.setState({hip: itemSelected})
    this.searching();
  }

  slidingHipComplete(itemSelected) {
    this.setState({hip: itemSelected})
    this.findSize();
  }

  slidingHeight(itemSelected) {
    this.setState({height: itemSelected})
    this.searching();
  }

  slidingHeightComplete(itemSelected) {
    this.setState({height: itemSelected})
    this.findSize();
  }

  render() {
    let { labelPosition } = this.state;
    let { labelElevation } = this.state;
    let { labelHeight } = this.state;
    let { flexInfo } = this.state;
    let { labelOpacity } = this.state;

    return (
      <View
        nativeID={"root-container"}
        style={{
          flex: 1,
          flexDirection: 'column'
        }}>
        <View
          nativeID={"display-container"}
          style={{
          flex: 6
        }}>
          <HumanImageView
            chestSize={this.state.chest}
            waistSize={this.state.waist}
            hipSize={this.state.hip}
            fullHeight={this.state.height}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'skyblue',
            }}
          />
          <Animated.View
            style={[
              {
                elevation: this.state.labelElevation,
                height: this.state.labelHeight
              },
              styles.label_container
            ]}>
            <Text
              style={[
                {
                  position: 'absolute',
                  left: 10,
                  top: 10,
                  textAlign:'center'
                },
                styles.size_label_text
              ]}>
              {this.state.bestFitBrand} {this.state.bestFitSize}
            </Text>
            <View
              nativeID={"button-container"}
              style={[
                {
                  position: 'absolute',
                  width: 100,
                  right: 10,
                  top: 10
                }
              ]}>
            <Button
              onPress={(val) =>
                {
                  console.log("click");
                  Animated.timing(
                    this.state.labelElevation,
                    {
                      toValue: 8,
                      duration: 1000,
                    }
                  ).start();
                }
                }
              title="More"
              color='blue'
            />
            </View>
          </Animated.View>
      </View>
        <View style={styles.controller_container}>
          <View style={styles.slider_controller_container}>
            <Image style={styles.slider_controller_icon}
              source={require('./my-icon.png')} />
            <View style=
              {
                styles.slider_controller_sub_container
              }>
              <Text>Chest: {this.state.chest}cm</Text>
              <Slider
                maximumValue={CHEST_PARAMETERS.max}
                minimumValue={CHEST_PARAMETERS.min}
                step={CHEST_PARAMETERS.step}
                value={CHEST_PARAMETERS.default}
                onSlidingComplete = {(val) => {this.slidingChestComplete(val)}}
                onValueChange = {(val) => {this.slidingChest(val)}} />
            </View>
          </View>
          <View style={styles.slider_controller_container}>
            <Image style={styles.slider_controller_icon}
              source={require('./my-icon.png')} />
            <View style={styles.slider_controller_sub_container}>
              <Text>Waist: {this.state.waist}cm</Text>
              <Slider maximumValue={WAIST_PARAMETERS.max}
                minimumValue={WAIST_PARAMETERS.min}
                value={WAIST_PARAMETERS.default}
                step={WAIST_PARAMETERS.step}
                onSlidingComplete = {(val) => {this.slidingWaistComplete(val)}}
                onValueChange = {(val) => {this.slidingWaist(val)}}/>
            </View>
          </View>
          <View style={styles.slider_controller_container}>
            <Image source={require('./my-icon.png')} style={styles.slider_controller_icon}/>
            <View style={styles.slider_controller_sub_container}>
              <Text>Hip: {this.state.hip}cm</Text>
              <Slider
                maximumValue={HIP_PARAMETERS.max}
                minimumValue={HIP_PARAMETERS.min}
                value={HIP_PARAMETERS.default}
                step={HIP_PARAMETERS.step}
                onSlidingComplete = {(val) => {this.slidingHipComplete(val)}}
                onValueChange = {(val) => {this.slidingHip(val)}}/>
            </View>
          </View>
          <View style={styles.slider_controller_container}>
            <Image source={require('./my-icon.png')} style={styles.slider_controller_icon}/>
            <View style={styles.slider_controller_sub_container}>
              <Text>Height: {this.state.height}cm</Text>
              <Slider maximumValue={HEIGHT_PARAMETERS.max}
                minimumValue={HEIGHT_PARAMETERS.min}
                value={HEIGHT_PARAMETERS.default}
                step={HEIGHT_PARAMETERS.step}
                onSlidingComplete = {(val) => {this.slidingHeightComplete(val)}}
                onValueChange = {(val) => {this.slidingHeight(val)}}/>
            </View>
        </View>
      </View>
    </View>
    );
  }
}
