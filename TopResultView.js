import React from 'react';
import {StyleSheet, View, Text, PanResponder, Animated, TouchableHighlight } from 'react-native';

import {Button, ListItem, Icon, List} from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';
import MoreResultView from './MoreResultView';

const PARAMETERS = {
  LABEL_HEIGHT: 64,
  LABEL_HEIGHT_EXPANDED: 88,
  LABEL_ANIMATION_TENSION: 20,
  LIST_ITEM_HEIGHT: 70,
  TOP_LABEL_FONT_SIZE: 12,
  TOP_LABEL_EXPANDED_FONT_SIZE: 18,
  TOP_LABEL_HEIGHT: 64,
  TOP_LABEL_HEIGHT_EXPANDED: 88,
  MARGIN: 16
}

const styles = StyleSheet.create({
  subtitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32
  },
  subtitle_container: {
    height: '100%',
    marginTop: PARAMETERS.MARGIN,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});

export default class TopResultView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bestFitChestDelta: props.bestFitChestDelta,
      bestFitWaistDelta: props.bestFitWaistDelta,
      bestFitHipDelta: props.bestFitHipDelta,
      bestFitHeightDelta: props.bestFitHeightDelta,
      bestFitBrand: props.bestFitBrand,
      bestFitSize: props.bestFitSize,
      brandSelection: props.brandSelection,
      labelHeightProgress: props.labelHeightProgress,
      handleDrag: props.handleDrag,
      handleTap: props.handleTap,
      count: 4,
      labelIconRotation: props.labelIconRotation,
      testFontSize: new Animated.Value(0),
      bestFitViewHeight: new Animated.Value(0),
      labelTransformationMap: {
        0: new Animated.Value(0),
        1: new Animated.Value(0),
        2: new Animated.Value(0),
        3: new Animated.Value(0),
        4: new Animated.Value(0),
        5: new Animated.Value(0),
        6: new Animated.Value(0),
      },

      labelOpacityMap: {
        0: new Animated.Value(0),
        1: new Animated.Value(0),
        2: new Animated.Value(0),
        3: new Animated.Value(0),
        4: new Animated.Value(0),
        5: new Animated.Value(0),
        6: new Animated.Value(0),
      }
    };

    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
  }

  componentWillMount() {
    console.log("componentWillMount");
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this.props.handleDragRelease,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
  }

  _handlePanResponderMove(e : Object, gestureState : Object): boolean {
    console.log("_handlePanResponderMove " +  this.state.bestFitSize);
    this.state.handleDrag(e, gestureState);
    return true;
  }

  _handleStartShouldSetPanResponder(e : Object, gestureState : Object): boolean {
    console.log("_handleStartShouldSetPanResponder");
    return true;
  }

  _handleMoveShouldSetPanResponder(e : Object, gestureState : Object): boolean {
    console.log("_handleMoveShouldSetPanResponder");
    return true;
  }

  _handlePanResponderGrant(e : Object, gestureState : Object) {
    console.log("_handlePanResponderGrant");
  }

  _handlePanResponderEnd(e : Object, gestureState : Object) {
    console.log("_handlePanResponderEnd");
  }

  render() {
    return (
      <TouchableHighlight>
        <View
            nativeID={"top-result-root"}
            onLayout={(event) => this.measureView(event)}
            style={[
            {
              height: '100%',
              justifyContent: 'flex-start'
            }
          ]}
          {...this._panResponder.panHandlers}
          >
          <Animated.View
            nativeID={"top-result-best-fit-label-conatiner"}
            style={[
              {
                height: this.state.bestFitViewHeight.interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [PARAMETERS.TOP_LABEL_HEIGHT, PARAMETERS.TOP_LABEL_HEIGHT_EXPANDED]
                }),
                flexDirection: 'column'
              }
            ]}>
          <View
              nativeID={"top-result-best-fit-label-data"}
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: PARAMETERS.MARGIN
            }}>
            <View
              nativeID={"top-result-size-brand"}
              style={[{
                flex: 2,
                marginLeft: PARAMETERS.MARGIN,
              },
              styles.subtitle_container]}>
              <Animated.Text style={{
                fontSize: this.state.testFontSize
                .interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [PARAMETERS.TOP_LABEL_FONT_SIZE, PARAMETERS.TOP_LABEL_EXPANDED_FONT_SIZE]
                })

              }}>{Util.formatString(this.props.bestFitBrand) + " " + this.props.bestFitSize}
              </Animated.Text>
              <Text style={{
                fontSize: PARAMETERS.TOP_LABEL_FONT_SIZE
              }}>Best Fit</Text>
            </View>
            <View
              nativeID={"top-result-chest"}
              style={[{flex: 1},styles.subtitle_container]}>
              {Util.fitIcon(this.props.bestFitChestDelta, false)}
              <Text style={{
                fontSize: 12
              }}>Chest</Text>
            </View>
            <View
              nativeID={"top-result-waist"}
              style={[{flex: 1},styles.subtitle_container]}>
              {Util.fitIcon(this.props.bestFitWaistDelta, false)}
              <Text style={{
                fontSize: 12
              }}>Waist</Text>
            </View>
            <View
              nativeID={"top-result-hip"}
               style={[{flex: 1},styles.subtitle_container]}>
              {Util.fitIcon(this.props.bestFitHipDelta, false)}
              <Text style={{
                fontSize: 12
              }}>Hip</Text>
            </View>
            <View
              nativeID={"top-result-height"}
              style={[{flex: 1},styles.subtitle_container]}>
              {Util.fitIcon(this.props.bestFitHeightDelta, false)}
              <Text style={{
                fontSize: 12
              }}>Height</Text>
            </View>
            <Animated.View style={[
                {
                  transform: [
                    {
                      rotate : this.props.labelIconRotation
                      .interpolate({
                        inputRange: [ 0, 1 ],
                        outputRange: ['0deg', '180deg']
                      })
                    }
                  ]
                }
              ]}>
              <Icon
                onPress = {() => {
                  console.log("tapped icon");
                    this.state.handleTap();
                }}
                type='font-awesome'
                name='caret-down'/>
            </Animated.View>
            </View>
          </Animated.View>

          <List>
            {
              this.props.topResults.slice(0, this.state.count).
              map((sizeItem, j) => (
                <Animated.View
                  key={j}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: PARAMETERS.LIST_ITEM_HEIGHT,
                      marginRight: 40,
                      opacity: this.state.labelOpacityMap[j],
                      transform: [
                        {
                          translateY: this.state.labelTransformationMap[j]
                          .interpolate({
                            inputRange: [ 0, 1 ],
                            outputRange: [20, 0]
                          })
                        }
                      ]

                  }}>
                <View
                  style={[{
                    flex: 2,
                    marginLeft: PARAMETERS.MARGIN,
                    marginTop: PARAMETERS.MARGIN,
                  },
                  styles.subtitle_container]}>
                  <Text>
                    {Util.formatString(sizeItem.brand) + " " + sizeItem.size}
                  </Text>
              </View>
              <View style={[{flex: 1},styles.subtitle_container]}>
                {Util.fitIcon(sizeItem.chest.fit, true)}
              </View>
              <View style={[{flex: 1},styles.subtitle_container]}>
                {Util.fitIcon(sizeItem.waist.fit, true)}
              </View>
              <View style={[{flex: 1},styles.subtitle_container]}>
                {Util.fitIcon(sizeItem.hip.fit, true)}
              </View>
              <View style={[{flex: 1},styles.subtitle_container]}>
                {Util.fitIcon(sizeItem.height.fit, true)}
              </View>
            </Animated.View>))
            }
          </List>

          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 20,
              bottom: 0
            }}>
            <Icon
              name='equal'
              type='material-community'/>
          </View>
        </View>
  </TouchableHighlight>);
  }

  getRenderCount() {
    return 4;
  }

  measureView(event) {
    count = Math.round(event.nativeEvent.layout.height/PARAMETERS.LABEL_HEIGHT)-2;
    console.log("visibility count " + count);

    if(count>0) {
      index = count-1;

      for(var i=0;i<5;i++) {
        if(i<count && this.state.labelOpacityMap[i]._value == 0) {
          Animated.spring(this.state.labelOpacityMap[i], {
           toValue: 1,
           tension: PARAMETERS.LABEL_ANIMATION_TENSION
          }).start();
          Animated.spring(this.state.labelTransformationMap[i], {
           toValue: 1,
           tension: PARAMETERS.LABEL_ANIMATION_TENSION
          }).start();
        } else if(i>=count && this.state.labelOpacityMap[i]._value == 1) {
          Animated.spring(this.state.labelOpacityMap[i], {
           toValue: 0,
           tension: PARAMETERS.LABEL_ANIMATION_TENSION
          }).start();
          Animated.spring(this.state.labelTransformationMap[i], {
           toValue: 0,
           tension: PARAMETERS.LABEL_ANIMATION_TENSION
          }).start();
        }
      }
    }


    if(event.nativeEvent.layout.height > 225 && this.state.labelIconRotation != 1) {
      Animated.spring(this.state.labelIconRotation, {
        toValue: 1,
        tension: PARAMETERS.LABEL_ANIMATION_TENSION
      }).start();

    } else if(event.nativeEvent.layout.height < 100 && this.state.labelIconRotation != 0) {
        Animated.spring(this.state.labelIconRotation, {
          toValue: 0,
          tension: PARAMETERS.LABEL_ANIMATION_TENSION
        }).start();
    }

    if(event.nativeEvent.layout.height > 125 && this.state.labelIconRotation != 1) {

        Animated.spring(this.state.testFontSize, {
          toValue: 1,
          tension: PARAMETERS.LABEL_ANIMATION_TENSION
        }).start();

        Animated.spring(this.state.bestFitViewHeight, {
          toValue: 1,
          tension: PARAMETERS.LABEL_ANIMATION_TENSION
        }).start();




    } else if(event.nativeEvent.layout.height < 100 && this.state.labelIconRotation != 1) {

      Animated.spring(this.state.testFontSize, {
        toValue: 0,
        tension: PARAMETERS.LABEL_ANIMATION_TENSION
      }).start();

      Animated.spring(this.state.bestFitViewHeight, {
        toValue: 0,
        tension: PARAMETERS.LABEL_ANIMATION_TENSION
      }).start();
    }
  }
}
