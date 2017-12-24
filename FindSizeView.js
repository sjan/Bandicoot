import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Slider,
  Image,
  Picker,
  Text
} from 'react-native';
import Animation from 'lottie-react-native';
import TopResultView from './TopResultView';
import Util from './Util';

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};

const PARAMETERS = {
  LABEL_HEIGHT: 125,
  LABEL_HEIGHT_HIDE: 20,
  LABEL_HEIGHT_EXPANDED: 400,
  LABEL_ELEVATION: 5,
  LABEL_ANIMATION_TENSION: 20,
  LABEL_ANIMATION_FRICTION: 5,
  LABEL_DISPLACEMENT: -115,
  ANCHOR_PONT: 255,

  TEST_ANIMATION_TENSION: 1,

  INITIAL_SELECTION_BRAND: 'ALL',
  INITIAL_SELECTION_TYPE: 'MEN',
  INITIAL_SELECTION_MEASUREMENT: 'METRIC'
}

const CHEST_PARAMETERS = {
  min: {
    cmValue: 62,
    inValue: Util.convertToInches(62)
  },
  max: {
    cmValue: 125,
    inValue: Util.convertToInches(125)
  },
  default: {
    cmValue: 96,
    inValue: Util.convertToInches(96)
  }
}

const WAIST_PARAMETERS = {
  min: {
    cmValue: 55,
    inValue: Util.convertToInches(55)
  },
  max: {
    cmValue: 110,
    inValue: Util.convertToInches(110)
  },
  default: {
    cmValue: 88,
    inValue: Util.convertToInches(88)
  }
}

const HIP_PARAMETERS = {
  min: {
    cmValue: 65,
    inValue: Util.convertToInches(65)
  },
  max: {
    cmValue: 127,
    inValue: Util.convertToInches(127)
  },
  default: {
    cmValue: 104,
    inValue: Util.convertToInches(104)
  }
}

const HEIGHT_PARAMETERS = {
  min: {
    cmValue: 120,
    inValue: Util.convertToInches(120)
  },
  max: {
    cmValue: 200,
    inValue: Util.convertToInches(200)
  },
  default: {
    cmValue: 176,
    inValue: Util.convertToInches(176)
  }
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
  },
  slider_container: {
    height: 30,
    flex: 5
  },
  track: {
    height: 2,
    backgroundColor: '#303030'
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 1
  }
});

export default class FindSizeView extends React.Component {
  static navigationOptions = {
    title: 'Find Size Search'
  };

  constructor(props) {
    super(props);

    var sizeResult = Util.computeSize(PARAMETERS.INITIAL_SELECTION_BRAND, PARAMETERS.INITIAL_SELECTION_TYPE, this.props.screenProps.sizeData, CHEST_PARAMETERS.default, HEIGHT_PARAMETERS.default, WAIST_PARAMETERS.default, HIP_PARAMETERS.default);

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

      topResults: sizeResult.topResults,
      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta,
      selectionBrand: PARAMETERS.INITIAL_SELECTION_BRAND,
      selectionUnit: PARAMETERS.INITIAL_SELECTION_MEASUREMENT,
      expanded: false,
      animationProgress: new Animated.Value(0)
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragRelease = this.handleDragRelease.bind(this);
  }

  updateChest(chestSize) {
    var sizeResult = Util.computeSize(this.state.selectionBrand, this.state.type, this.state.sizeData, chestSize, this.state.height, this.state.waist, this.state.hip);

    this.setState({
      chest: chestSize,
      topResults: sizeResult.topResults,
      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta
    });
  }

  updateWaist(waistSize) {
    var sizeResult = Util.computeSize(this.state.selectionBrand, this.state.type, this.state.sizeData, this.state.chest, this.state.height, waistSize, this.state.hip);

    this.setState({
      waist: waistSize,
      topResults: sizeResult.topResults,
      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta
    });
  }

  updateHeight(heightSize) {
    var sizeResult = Util.computeSize(this.state.selectionBrand, this.state.type, this.state.sizeData, this.state.chest, heightSize, this.state.waist, this.state.hip);

    this.setState({
      height: heightSize,
      topResults: sizeResult.topResults,
      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta
    });
  }

  updateHip(hipSize) {
    var sizeResult = Util.computeSize(this.state.selectionBrand, this.state.type, this.state.sizeData, this.state.chest, this.state.height, this.state.waist, hipSize);

    this.setState({
      hip: hipSize,
      topResults: sizeResult.topResults,
      fitResultArray: sizeResult.fitArray,
      bestFitBrand: sizeResult.bestFitBrand,
      bestFitSize: sizeResult.bestFitSize,
      bestFitChestDelta: sizeResult.bestFitChestDelta,
      bestFitWaistDelta: sizeResult.bestFitWaistDelta,
      bestFitHipDelta: sizeResult.bestFitHipDelta,
      bestFitHeightDelta: sizeResult.bestFitHeightDelta
    });
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
       topResults: sizeResult.topResults,
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

 updateSelectionUnit(unit) {
     this.setState(
       {
         selectionUnit: unit,
       }
     );
   }

  unitDisplay(value) {
    if (this.state.selectionUnit == 'METRIC') {
      return value.cmValue + ' cm'
    } else {
      return value.inValue + ' in'
    }
  }

  unitStep() {
    if (this.state.selectionUnit == 'METRIC') {
      return 1
    } else {
      return .25
    }
  }

  showBest() {
    this.setState({expanded: false});
    Animated.spring(this.state.labelTransformation, {
      toValue: 0,
      tension: PARAMETERS.LABEL_ANIMATION_TENSION
    }).start();

    Animated.spring(this.state.animationProgress, {
      toValue: 0,
      tension: PARAMETERS.TEST_ANIMATION_TENSION
    }).start();
  }

  hideBest() {
    Animated.spring(this.state.labelHeight, {
      toValue: PARAMETERS.LABEL_HEIGHT,
      tension: PARAMETERS.LABEL_ANIMATION_TENSION
    }).start();

    Animated.spring(this.state.labelTransformation, {
      toValue: 1,
      tension: PARAMETERS.LABEL_ANIMATION_TENSION
    }).start();

    Animated.spring(this.state.animationProgress, {
      toValue: 1,
      tension: PARAMETERS.TEST_ANIMATION_TENSION
    }).start();
  }


  handleDrag(e, gestureState) {
    console.log("delta y" + gestureState.dy + " new height: " + Util.sum(PARAMETERS.LABEL_HEIGHT, gestureState.dy));
    var baselineHeight;
    if(this.state.expanded) {
      baselineHeight = PARAMETERS.LABEL_HEIGHT_EXPANDED;
    } else {
      baselineHeight = PARAMETERS.LABEL_HEIGHT;
    }

    newBaseline = Util.sum(baselineHeight, gestureState.dy);
    newBaseline = Math.max(newBaseline , PARAMETERS.LABEL_HEIGHT - 30);
    newBaseline = Math.min(newBaseline , PARAMETERS.LABEL_HEIGHT_EXPANDED + 50);

    this.setState({
      labelHeight: new Animated.Value(newBaseline)
    })
  }

  handleDragRelease(e, gestureState) {
    var newHeight;
    var moreResult;
    if (this.state.labelHeight._value > PARAMETERS.ANCHOR_PONT) {
      newHeight = PARAMETERS.LABEL_HEIGHT_EXPANDED;
      moreResult = true;
    } else {
      newHeight = PARAMETERS.LABEL_HEIGHT;
      moreResult = false;
    }

    this.setState({expanded: moreResult});

    Animated.spring(this.state.labelHeight, {
      toValue: newHeight,
      tension: PARAMETERS.LABEL_ANIMATION_TENSION,
      friction: PARAMETERS.LABEL_ANIMATION_FRICTION
    }).start();
  }

  displayValue(value) {
    if (this.state.selectionUnit == 'METRIC') {
      return value.cmValue;
    } else {
      return value.inValue;
    }
  }

  getArrowIcon() {
    if (this.state.moreResults) {
      return 'arrow-up'
    } else {
      return 'arrow-down'
    }
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

    const {navigate} = this.props.navigation;

    //console.log(JSON.stringify(this.state.topResults));

    return (<View nativeID={"root-container"} style={{
        flex: 1,
        flexDirection: 'column',
        marginBottom: 24
      }}>
      <View nativeID={"display-container"} style={{
          flex: 6,
          alignItems: 'center'
        }}>
        <Animation style={{
            position: 'absolute',
            backgroundColor: 'blue',
            top: 100,
            width: 200,
            height: 200
          }} source={require('./resources/animation.json')} progress={this.state.animationProgress}/>
      </View>
      <Animated.View style={[
          {
            elevation: labelElevation,
            height: labelHeight,
            opacity: labelOpacity,
            transform: [
              {
                translateY: this.state.labelTransformation
                .interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [0, PARAMETERS.LABEL_DISPLACEMENT]
                })
              }
            ]
          },
          styles.label_container
        ]}>
        <View
          nativeID={"top-result-spacer"}
          style={{height: 20}}/>
        <TopResultView
          bestFitChestDelta={this.state.bestFitChestDelta}
          bestFitWaistDelta={this.state.bestFitWaistDelta}
          bestFitHipDelta={this.state.bestFitHipDelta}
          bestFitHeightDelta={this.state.bestFitHeightDelta}
          bestFitBrand={this.state.bestFitBrand}
          bestFitSize={this.state.bestFitSize}
          brandSelection={this.state.selectionBrand}
          handleDrag={this.handleDrag}
          handleDragRelease={this.handleDragRelease}
          labelHeightProgress={this.state.labelHeight}
          topResults={this.state.topResults}
        />
      </Animated.View>
      <View style={styles.controller_container}>
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 24,
            marginLeft: 32,
            marginRight: 32
          }}>
          <Text style={{
              fontSize: 20
            }}>
            Set Your Dimensions
          </Text>
        </View>
        <View style={{
            flex: 1,
            margin: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
          <Picker
            selectedValue={this.state.selectionBrand}
            onValueChange={(itemValue, itemIndex) => {
              this.updateSelectionBrand(itemValue);
            }
          } style={{
              width: "50%"
            }}>
            <Picker.Item label="All Brands" value="ALL"/>
            <Picker.Item label="Uhlmann" value="UHLMANN"/>
            <Picker.Item label="Allstar" value="ALLSTAR"/>
            <Picker.Item label="Negrini" value="NEGRINI"/>
            <Picker.Item label="Pbt" value="PBT"/>
          </Picker>
          <Picker selectedValue={this.state.selectionUnit} onValueChange={(itemValue, itemIndex) => {
              this.updateSelectionUnit(itemValue);
            }
            } style={{
              width: "40%"
            }}>
            <Picker.Item label="Centimeter" value="METRIC"/>
            <Picker.Item label="Inch" value="STANDARD"/>
          </Picker>
        </View>
        <View style={styles.slider_controller_container}>
          <Text style={{
              flex: 1
            }}>Chest
          </Text>
          <Slider value = {
              this.displayValue(CHEST_PARAMETERS.default)
            }
            step = {this.unitStep()}
            maximumValue = {this.displayValue(CHEST_PARAMETERS.max)}
            minimumValue = {this.displayValue(CHEST_PARAMETERS.min)}
            style = {styles.slider_container}
            trackStyle = {styles.track}
            thumbStyle = {styles.thumb}
            onSlidingComplete = {(val) => {
              this.updateChest(Util.measurment(val, this.state.selectionUnit));
              this.showBest();

              }
            }
            onValueChange = {(val) => {
              this.setState({chest:
                Util.measurment(val, this.state.selectionUnit)
              });
              this.hideBest();}
            }/>
          <Text style={{
              flex: 2
            }}>{this.unitDisplay(this.state.chest)}</Text>
        </View>

        <View style={styles.slider_controller_container}>
          <Text style={{
              flex: 1
            }}>Waist
          </Text>
          <Slider value={this.displayValue(WAIST_PARAMETERS.default)} maximumValue={this.displayValue(WAIST_PARAMETERS.max)} minimumValue={this.displayValue(WAIST_PARAMETERS.min)} step={this.unitStep()} style={styles.slider_container} trackStyle={styles.track} thumbStyle={styles.thumb} onSlidingComplete = {(val) =>
              {
                this.updateWaist(Util.measurment(val, this.state.selectionUnit));
                this.showBest();
              }
            } onValueChange = {(val) => {
              this.setState({waist:
                Util.measurment(val, this.state.selectionUnit)
              });
              this.hideBest();
            }}/>
          <Text style={{
              flex: 2
            }}>{this.unitDisplay(this.state.waist)}</Text>
        </View>

        <View style={styles.slider_controller_container}>
          <Text style={{
              flex: 1
            }}>Hip
          </Text>
          <Slider value={this.displayValue(HIP_PARAMETERS.default)} maximumValue={this.displayValue(HIP_PARAMETERS.max)} minimumValue={this.displayValue(HIP_PARAMETERS.min)} step={this.unitStep()} style={styles.slider_container} trackStyle={styles.track} thumbStyle={styles.thumb} onSlidingComplete = {(val) =>
              {
                this.updateHip(Util.measurment(val, this.state.selectionUnit));
                this.showBest();
              }
            } onValueChange = {(val) => {
              this.setState({hip:
                Util.measurment(val, this.state.selectionUnit)
              });
              this.hideBest();
            }}/>
          <Text style={{
              flex: 2
            }}>{this.unitDisplay(this.state.hip)}</Text>
        </View>

        <View style={[
            {
              marginBottom: 20
            },
            styles.slider_controller_container
          ]}>
          <Text style={{
              flex: 1
            }}>Height
          </Text>
          <Slider value={this.displayValue(HEIGHT_PARAMETERS.default)} maximumValue={this.displayValue(HEIGHT_PARAMETERS.max)} minimumValue={this.displayValue(HEIGHT_PARAMETERS.min)} step={this.unitStep()} style={styles.slider_container} trackStyle={styles.track} thumbStyle={styles.thumb} onSlidingComplete = {(val) =>
              {
                this.updateHeight(Util.measurment(val, this.state.selectionUnit));
                this.showBest();
              }
            } onValueChange = {(val) => {
              this.setState({height:
                Util.measurment(val, this.state.selectionUnit)
              });
              this.hideBest();
            }}/>
          <Text style={{
              flex: 2
            }}>{this.unitDisplay(this.state.height)}</Text>
        </View>
      </View>
    </View>);
  }
}
