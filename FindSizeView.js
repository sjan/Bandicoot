import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Slider,
  Image,
  Picker,
  Text
} from 'react-native';

import Animation from 'lottie-react-native';
import { Button } from 'react-native-elements';

import HumanImageView from './HumanView';
import SizeListItem from './SizeListItem';
import Util from './Util';

const PARAMETERS = {
  LABEL_HEIGHT: 120,
  LABEL_HEIGHT_HIDE: 20,
  LABEL_ELEVATION: 5,
  LABEL_ANIMATION_TENSION: 20,

  TEST_ANIMATION_TENSION: 1,

  INITIAL_SELECTION_BRAND: 'ALL',
  INITIAL_SELECTION_TYPE: 'MEN',
  INITIAL_SELECTION_MEASUREMENT: 'METRIC',
}

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
    position: 'absolute',
    top: -20,
    left: '0%',
    right: '0%',
    width: '100%',
    backgroundColor: 'white'
  },
  size_label_text: {
    height: 30
  },
  controller_container: {
    flexDirection: 'column',
    flex: 6
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

    var sizeResult = Util.computeSize(
      PARAMETERS.INITIAL_SELECTION_BRAND,
      PARAMETERS.INITIAL_SELECTION_TYPE,
      this.props.screenProps.sizeData,
      CHEST_PARAMETERS.default,
      HEIGHT_PARAMETERS.default,
      WAIST_PARAMETERS.default,
      HIP_PARAMETERS.default
    );

    this.state = {
      sizeData: this.props.screenProps.sizeData,
      type: PARAMETERS.INITIAL_SELECTION_TYPE,
      chest: CHEST_PARAMETERS.default,
      waist: WAIST_PARAMETERS.default,
      hip: HIP_PARAMETERS.default,
      height: HEIGHT_PARAMETERS.default,

      labelElevation: new Animated.Value(PARAMETERS.LABEL_ELEVATION),
      labelHeight: new Animated.Value(PARAMETERS.LABEL_HEIGHT),
      labelTransformation: new Animated.Value(0),
      labelOpacity: new Animated.Value(1),

      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      selectionBrand: PARAMETERS.INITIAL_SELECTION_BRAND,

      animationProgress: new Animated.Value(0),
    };
  }

  slidingChestComplete(itemSelected) {
    var sizeResult = Util.computeSize(
      this.state.selectionBrand,
      this.state.type,
      this.state.sizeData,
      itemSelected,
      this.state.height,
      this.state.waist,
      this.state.hip
    );

    this.setState(
      {
        chest: itemSelected,
        fitResultArray: sizeResult.fitArray,
        bestFitBrand: sizeResult.bestFitBrand,
        bestFitSize: sizeResult.bestFitSize,
        bestFitChestDelta: sizeResult.bestFitChestDelta,
        bestFitWaistDelta: sizeResult.bestFitWaistDelta,
        bestFitHipDelta: sizeResult.bestFitHipDelta,
        bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      }
    );
  }

  slidingWaistComplete(itemSelected) {
    var sizeResult = Util.computeSize(
      this.state.selectionBrand,
      this.state.type,
      this.state.sizeData,
      this.state.chest,
      this.state.height,
      itemSelected,
      this.state.hip
    );

    this.setState(
      {
        waist: itemSelected,
        fitResultArray: sizeResult.fitArray,
        bestFitBrand: sizeResult.bestFitBrand,
        bestFitSize: sizeResult.bestFitSize,
        bestFitChestDelta: sizeResult.bestFitChestDelta,
        bestFitWaistDelta: sizeResult.bestFitWaistDelta,
        bestFitHipDelta: sizeResult.bestFitHipDelta,
        bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      }
    );
  }

  slidingHipComplete(itemSelected) {
    var sizeResult = Util.computeSize(
      this.state.selectionBrand,
      this.state.type,
      this.state.sizeData,
      this.state.chest,
      this.state.height,
      this.state.waist,
      itemSelected
    );

    this.setState(
      {
        hip: itemSelected,
        fitResultArray: sizeResult.fitArray,
        bestFitBrand: sizeResult.bestFitBrand,
        bestFitSize: sizeResult.bestFitSize,
        bestFitChestDelta: sizeResult.bestFitChestDelta,
        bestFitWaistDelta: sizeResult.bestFitWaistDelta,
        bestFitHipDelta: sizeResult.bestFitHipDelta,
        bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      }
    );
  }

  showBest() {
    Animated.spring(
      this.state.labelTransformation, {
      toValue: 0,
      tension: PARAMETERS.LABEL_ANIMATION_TENSION
    }).start();

    Animated.spring(
      this.state.animationProgress,
    {
      toValue: 0,
      tension: PARAMETERS.TEST_ANIMATION_TENSION
    }).start();
  }

  hideBest() {
    Animated.spring(
      this.state.labelTransformation,
      {
        toValue: 1,
        tension: PARAMETERS.LABEL_ANIMATION_TENSION
      }).start();

    Animated.spring(
      this.state.animationProgress,
      {
        toValue: 1,
        tension: PARAMETERS.TEST_ANIMATION_TENSION
      }).start();
  }

  updateSelectionBrand(selectionBrand) {
    var sizeResult = Util.computeSize(
      selectionBrand,
      this.state.type,
      this.state.sizeData,
      this.state.chest,
      this.state.height,
      this.state.waist,
      this.state.hip
    );

    this.setState(
      {
        selectionBrand: selectionBrand,
        fitResultArray: sizeResult.fitArray,
        bestFitBrand: sizeResult.bestFitBrand,
        bestFitSize: sizeResult.bestFitSize,
        bestFitChestDelta: sizeResult.bestFitChestDelta,
        bestFitWaistDelta: sizeResult.bestFitWaistDelta,
        bestFitHipDelta: sizeResult.bestFitHipDelta,
        bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      }
    );
  }

  slidingHeightComplete(height) {
    var sizeResult = Util.computeSize(
      this.state.selectionBrand,
      this.state.type,
      this.state.sizeData,
      this.state.chest,
      height,
      this.state.waist,
      this.state.hip
    );

    this.setState(
      {
        height: height,
        fitResultArray: sizeResult.fitArray,
        bestFitBrand: sizeResult.bestFitBrand,
        bestFitSize: sizeResult.bestFitSize,
        bestFitChestDelta: sizeResult.bestFitChestDelta,
        bestFitWaistDelta: sizeResult.bestFitWaistDelta,
        bestFitHipDelta: sizeResult.bestFitHipDelta,
        bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      }
    );
  }

  render() {
    let {
      labelElevation,
      labelHeight,
      labelOpacity,
      chest,
      waist,
      hip,
      height
    } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View
        nativeID={"root-container"}
        style={{
          flex: 1,
          flexDirection: 'column',
          marginBottom: 24
        }}>
      <View
        nativeID={"display-container"}
        style={{flex: 6,alignItems: 'center',}}>
        <Animation
         style={{
           position: 'absolute',
           backgroundColor: 'blue',
           top: 100,
           width: 200,
           height: 200,
         }}
       source={require('./resources/animation.json')}
       progress={this.state.animationProgress}
      />
      </View>
        <Animated.View
          style={[
            {
              elevation: labelElevation,
              height: labelHeight,
              opacity: labelOpacity,
              flexDirection: 'column',
              transform: [{
                 translateY: this.state.labelTransformation.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0, -100]
                 }),
               }],
            },
            styles.label_container
          ]}>

          <SizeListItem header = 'true'/>
          <SizeListItem
            chestFit = {this.state.bestFitChestDelta}
            waistFit = {this.state.bestFitWaistDelta}
            hipFit = {this.state.bestFitHipDelta}
            heightFit = {this.state.bestFitHeightDelta}
            label = {this.state.bestFitBrand + " " + this.state.bestFitSize}>
          </SizeListItem>
        </Animated.View>
      <View style={styles.controller_container}>
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 24,
            marginLeft: 32,
            marginRight: 32
          }}>
          <Text
              style={{fontSize: 20}}
              > Set Your Dimensions </Text>
        </View>
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
          onSlidingComplete = {(val) =>
            {
              this.slidingChestComplete(val);
              this.showBest();
            }
          }
          onValueChange = {(val) => {
            this.setState({chest: val});

            this.hideBest();
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
            onSlidingComplete = {(val) =>
              {
                this.slidingWaistComplete(val);
                this.showBest();
              }
            }
            onValueChange = {(val) => {
              this.setState({waist: val});
              this.hideBest();
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
            onSlidingComplete = {(val) =>
              {
                this.slidingHipComplete(val);
                this.showBest();
              }
            }
            onValueChange = {(val) => {
              this.setState({hip: val});
              this.hideBest();
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
            onSlidingComplete = {(val) =>
              {
                this.slidingHeightComplete(val);
                this.showBest();
              }
            }
            onValueChange = {(val) => {
              this.setState({height: val});
              this.hideBest();
            }}/>
            <Text
              style={{flex: 1}}>{this.state.height} cm</Text>
        </View>
        <View style={{
            flex: 1,
            margin: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Picker
            selectedValue={this.state.selectionBrand}
            onValueChange={(itemValue, itemIndex) => {
                this.updateSelectionBrand(itemValue);
              }
            }
            style={{width: "50%"}}>
            <Picker.Item label="All Sizes" value="ALL" />
            <Picker.Item label="Uhlmann" value="UHLMANN" />
            <Picker.Item label="Allstar" value="ALLSTAR" />
            <Picker.Item label="Negrini" value="NEGRINI" />
            <Picker.Item label="Pbt" value="PBT" />
          </Picker>
        </View>

        <View style={{
              flex: 1,
              alignItems: 'center',
              margin: 12,
              justifyContent: 'center'
            }}>
            <Button
              small
              raised
              borderRadius = {3}
              title='More Sizes'
              onPress={(val) => {
                navigate(
                  'ExploreSizeView',
                   {
                     size: {
                       chest: chest,
                       waist: waist,
                       hip: hip,
                       height: height
                     },
                     fitResultArray: this.state.fitResultArray,
                   }
                );
              }
            }/>
        </View>
      </View>
    </View>);
  }
}
