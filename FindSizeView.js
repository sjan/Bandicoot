import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Animated,
  Slider,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32
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
    flex: 4
  }
});

var sliderStyles = StyleSheet.create({
  container: {
    height: 30,
    flex: 5
  },
  track: {
    height: 2,
    backgroundColor: '#303030',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

export default class FindSizeView extends React.Component {
  static navigationOptions = {
    title: 'Find Size Search',
  };

  constructor(props) {
    super(props);
    this.state = {
      chest: CHEST_PARAMETERS.default,
      waist: WAIST_PARAMETERS.default,
      hip: HIP_PARAMETERS.default,
      height: HEIGHT_PARAMETERS.default,

      //TODO: initial state should carry over from previous sessions
      bestFitBrand: '',
      bestFitSize: '',
      bestFit: [],

      sizeData: this.props.screenProps.sizeData,
      labelPosition: new Animated.Value(0),
      labelElevation: new Animated.Value(0),
      labelHeight: new Animated.Value(60),
      flexMain: 6,
      flexInfo: new Animated.Value(1),
      labelOpacity: new Animated.Value(1),
      flexSlider: 2,
      fitResultArray: []
    };
    this.findSize();
  }

  searching() {
    console.log("searching");
    this.state.bestFitSize = '';
    this.state.bestFitDelta = '';
    this.state.bestFitBrand = 'Searching...';
  }

  findSize() {
    console.log("findSize");
    var pbtMensSizeArray = this.state.sizeData['PBT'].MEN.sizes;
    var allstarMensSizeArray = this.state.sizeData['ALLSTAR'].MEN.sizes;
    var uhlmannMensSizeArray = this.state.sizeData['UHLMANN'].MEN.sizes;
    var negriniMensSizeArray = this.state.sizeData['NEGRINI'].MEN.sizes;

    var fitArray = [];
    var bestFitSize =   {
        brand: "None found",
        size: "",
        fitDelta: 100
      };

    for (var brand in this.state.sizeData) {
      var brandArray = [];
      if (this.state.sizeData.hasOwnProperty(brand)) {
        var array = this.state.sizeData[brand].MEN.sizes
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

          if (Math.min(chestFit, waistFit, hipFit, heightFit) >= 0 &&
          Math.max(chestFit, waistFit, hipFit, heightFit) <= 15 &&
              fitDelta <= bestFitSize.fitDelta) {
              bestFitSize.fitDelta = fitDelta;
              bestFitSize.size = sizeObject.size
              bestFitSize.brand = brand;
          }

          if (Math.min(chestFit, waistFit, hipFit, heightFit) >= 0 &&
              Math.max(chestFit, waistFit, hipFit, heightFit) <= 15
          ) {
            brandArray.push(
              {
                delta: fitDelta,
                brand: brand,
                size: sizeObject.size,
                chest: {
                  fit: chestFit,
                  range: chestRange
                },
                waist: {
                  fit: waistFit,
                  range: waistRange
                },
                hip: {
                  fit: hipFit,
                  range: hipRange
                },
                height: {
                  fit: heightFit,
                  range: heightRange
                }
              }
            );
          }
        }
      }

      brandArray.sort(function(a, b) {
        return Math.max(a.chest.fit, a.waist.fit, a.hip.fit, a.height.fit) -
              Math.max(b.chest.fit, b.waist.fit, b.hip.fit, b.height.fit);
      });

      fitArray.push({
        brand: brand,
        fit: brandArray
      });
    }

    this.state.fitResultArray = fitArray;

    this.state.bestFitSize = bestFitSize.size;
    this.state.bestFitDelta = bestFitSize.fitDelta;
    this.state.bestFitBrand = "Best fit: " + bestFitSize.brand;

    Animated.spring(this.state.labelOpacity, {
      toValue: 1,
      tension: 20
    }).start();
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

  slidingChestComplete(itemSelected) {
    this.setState({chest: itemSelected});
    this.findSize();
  }

  slidingWaistComplete(itemSelected) {
    this.setState({waist: itemSelected})
    this.findSize();
  }

  slidingHipComplete(itemSelected) {
    this.setState({hip: itemSelected})
    this.findSize();
  }

  slidingHeightComplete(itemSelected) {
    this.setState({height: itemSelected})
    this.findSize();
  }

  slidingStart() {
    Animated.spring(this.state.labelOpacity, {
      toValue: 0,
      tension: 20
    }).start();
  }

  render() {
    let {
      labelPosition,
      labelElevation,
      labelHeight,
      flexInfo,
      labelOpacity
    } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View
        nativeID={"root-container"}
        style={{
          flex: 1,
          flexDirection: 'column'
        }}>
      <View
        nativeID={"display-container"}
        style={{flex: 6}}>
        <HumanImageView
          nativeID={"human-view"}
          chestSize={this.state.chest}
          waistSize={this.state.waist}
          hipSize={this.state.hip}
          fullHeight={this.state.height}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'skyblue'
          }}/>
        <Animated.View
          style={[
            {
              elevation: this.state.labelElevation,
              height: this.state.labelHeight,
              opacity: this.state.labelOpacity,
              justifyContent: 'center',
              alignItems: 'center'
            },
            styles.label_container
          ]}>
          <Text style={[
              styles.size_label_text
            ]}>
            {this.state.bestFitBrand} {this.state.bestFitSize}
          </Text>
          <View
            nativeID={"button-container"}
            style={[{
                position: 'absolute',
                width: 100,
                right: 10,
                top: 10
              }
            ]}>
            <Button onPress={(val) => {
                navigate(
                  'ExploreSizeView',
                   {
                     size: {
                       chest: this.state.chest,
                       waist: this.state.waist,
                       hip: this.state.hip,
                       height: this.state.height
                     },
                     fitResultArray: this.state.fitResultArray,
                   }
                );
              }
            }
            title="More"
            color='blue'/>
          </View>
        </Animated.View>
      </View>

      <View style={styles.controller_container}>
        <View style={styles.slider_controller_container}>
          <Text
            style={{flex: 1}}>Chest </Text>
        <Slider
          value={CHEST_PARAMETERS.default}
          step={CHEST_PARAMETERS.step}
          maximumValue={CHEST_PARAMETERS.max}
          minimumValue={CHEST_PARAMETERS.min}
          style={sliderStyles.container}
          trackStyle={sliderStyles.track}
          thumbStyle={sliderStyles.thumb}
          onSlidingComplete = {(val) => {this.slidingChestComplete(val)}}
          onSlidingStart = {(val) => {this.slidingStart()} }
          onValueChange = {(val) => {
            this.slidingStart();
            this.setState({chest: val});
            this.searching();
          }}/>
          <Text
            style={{flex: 1}}>{this.state.chest} cm</Text>
        </View>

        <View style={styles.slider_controller_container}>
          <Text
            style={{flex: 1}}>Waist </Text>
          <Slider
            value={WAIST_PARAMETERS.default}
            maximumValue={WAIST_PARAMETERS.max}
            minimumValue={WAIST_PARAMETERS.min}
            step={WAIST_PARAMETERS.step}
            style={sliderStyles.container}
            trackStyle={sliderStyles.track}
            thumbStyle={sliderStyles.thumb}
            onSlidingComplete = {(val) => {this.slidingWaistComplete(val)}}
            onSlidingStart = {(val) => {this.slidingStart()} }
            onValueChange = {(val) => {
              this.slidingStart();
              this.setState({waist: val});
              this.searching();
            }}/>
            <Text
              style={{flex: 1}}>{this.state.waist} cm</Text>
        </View>

        <View style={styles.slider_controller_container}>
          <Text
            style={{flex: 1}}>Hip </Text>
          <Slider
            value={HIP_PARAMETERS.default}
            maximumValue={HIP_PARAMETERS.max}
            minimumValue={HIP_PARAMETERS.min}
            step={HIP_PARAMETERS.step}
            style={sliderStyles.container}
            trackStyle={sliderStyles.track}
            thumbStyle={sliderStyles.thumb}
            onSlidingComplete = {(val) => {this.slidingHipComplete(val)}}
            onSlidingStart = {(val) => {this.slidingStart()} }
            onValueChange = {(val) => {
              this.slidingStart();
              this.setState({hip: val});
              this.searching();
            }}/>
            <Text
              style={{flex: 1}}>{this.state.hip} cm</Text>
        </View>

        <View style={styles.slider_controller_container}>
          <Text
            style={{flex: 1}}>Height </Text>
          <Slider
            value={HEIGHT_PARAMETERS.default}
            maximumValue={HEIGHT_PARAMETERS.max}
            minimumValue={HEIGHT_PARAMETERS.min}
            step={HEIGHT_PARAMETERS.step}
            style={sliderStyles.container}
            trackStyle={sliderStyles.track}
            thumbStyle={sliderStyles.thumb}
            onSlidingComplete = {(val) => {this.slidingHeightComplete(val)}}
            onSlidingStart = {(val) => {this.slidingStart()} }
            onValueChange = {(val) => {
              this.slidingStart();
              this.setState({height: val});
              this.searching();
            }}/>
            <Text
              style={{flex: 1}}>{this.state.height} cm</Text>
        </View>      
      </View>
    </View>);
  }
}
