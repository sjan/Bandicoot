import React from 'react';
import {StyleSheet, View, Text, PanResponder, Animated, TouchableHighlight, ListView } from 'react-native';
import {Button, ListItem, Icon, List} from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';
import MoreResultView from './MoreResultView';
import CloseFitList from "./CloseFitList"

const PARAMETERS = {
  LABEL_HEIGHT: 64,
  LABEL_HEIGHT_EXPANDED: 88,
  LABEL_ANIMATION_TENSION: 20,
  LIST_ITEM_HEIGHT: 70,
  TOP_LABEL_FONT_SIZE: 12,
  TOP_LABEL_EXPANDED_FONT_SIZE: 18,
  TOP_LABEL_HEIGHT: 64,
  TOP_LABEL_HEIGHT_EXPANDED: 88,
  MARGIN: 16,
  MARGIN_LEFT: 32
}

const styles = StyleSheet.create({
  subtitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: PARAMETERS.MARGIN_LEFT,
    marginRight: PARAMETERS.MARGIN_LEFT
  },

  subtitle_container: {
    height: '100%',
    marginTop: PARAMETERS.MARGIN,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});

var rowsToShow;

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
      handleDrag: props.handleDrag,
      handleTap: props.handleTap,
      handleShowAll: props.handleShowAll,
      labelIconRotation: props.labelIconRotation,
      labelFontSize: new Animated.Value(0),
      bestFitViewHeight: new Animated.Value(0),
      rowCount: 0,
    };



    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
  }

  componentWillMount() {
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
    this.state.handleDrag(e, gestureState);
    return true;
  }

  _handleStartShouldSetPanResponder(e : Object, gestureState : Object): boolean {
    return true;
  }

  _handleMoveShouldSetPanResponder(e : Object, gestureState : Object): boolean {
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
                fontSize: this.state.labelFontSize
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
                  this.state.handleTap();
                }}
                name='menu-down'
                type='material-community'/>
            </Animated.View>
            </View>
          </Animated.View>

          <CloseFitList
            renderCount = {this.rowsToShow}
            sizeData = {this.props.topResults}
            allResultsCallback = {this.state.handleShowAll}/>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 20,
              bottom: 15
            }}>
            <Icon
              name='equal'
              type='material-community'/>
          </View>
        </View>
  </TouchableHighlight>);
  }



  measureView(event) {
    var tt = this.state.bestFitViewHeight.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [PARAMETERS.TOP_LABEL_HEIGHT, PARAMETERS.TOP_LABEL_HEIGHT_EXPANDED]
    });
    var totalHeight = event.nativeEvent.layout.height - PARAMETERS.TOP_LABEL_HEIGHT_EXPANDED;
    var listHeight = PARAMETERS.LABEL_HEIGHT;
    this.rowsToShow = Math.round(totalHeight/listHeight);

    // console.log("show: " + this.rowsToShow);

    count = Math.round(event.nativeEvent.layout.height/PARAMETERS.LABEL_HEIGHT)-2;
    // console.log("visibility count " + this.state.rowCount + " height " + event.nativeEvent.layout.height + " " + rowsToShow);
    if(count>0) {
      index = count-1;
      this.setState({
          rowCount: index,
      });
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

        Animated.spring(this.state.labelFontSize, {
          toValue: 1,
          tension: PARAMETERS.LABEL_ANIMATION_TENSION
        }).start();

        Animated.spring(this.state.bestFitViewHeight, {
          toValue: 1,
          tension: PARAMETERS.LABEL_ANIMATION_TENSION
        }).start();
    } else if(event.nativeEvent.layout.height < 100 && this.state.labelIconRotation != 1) {

      Animated.spring(this.state.labelFontSize, {
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
