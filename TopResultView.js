import React from 'react';
import {StyleSheet, View, Text, PanResponder, Animated, TouchableHighlight } from 'react-native';

import {Button, ListItem, Icon, List} from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';
import MoreResultView from './MoreResultView';

const PARAMETERS = {
  LABEL_HEIGHT: 90,
}


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
    var test = (PARAMETERS.LABEL_HEIGHT+this.props.labelHeightProgress._value/20);

    return (
      <TouchableHighlight
        onPress= {console.log("press!")}>
        <View
            nativeID={"top-result-menu"}
            style={[
            {
              flexDirection: 'column',
              height: '100%'
            },
            this.props.style
          ]}>
          <View
            nativeID={"top-result-best-fit-label-conatiner"}
            style={[
              {
                height: test,
                flexDirection: 'column'
              }
            ]}>
            <View
              nativeID={"top-result-best-fit-label-text"}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                  flex: 1,
                }}> Size
              </Text>
              <Text style={{
                  flex: 1,
                  textAlign: 'center'
                }}>Chest</Text>
              <Text style={{
                flex: 1,
                textAlign: 'center'
                  }}>Waist</Text>
              <Text style={{
                flex: 1,
                textAlign: 'center'
                  }}>Hip</Text>
              <Text style={{
                flex: 1,
                textAlign: 'center'
                  }}>Height</Text>
            </View>
            <View
              nativeID={"top-result-best-fit-label-data"}
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Text style={{
              flex: 1,

            }}>
              {this.props.bestFitBrand + " " + this.props.bestFitSize}
            </Text>
            {Util.fitIcon(this.props.bestFitChestDelta )}
            {Util.fitIcon(this.props.bestFitWaistDelta )}
            {Util.fitIcon(this.props.bestFitHipDelta )}
            {Util.fitIcon(this.props.bestFitHeightDelta )}
            </View>
            <View
              nativeID={"top-result-best-fit-label-bottom"}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
              nativeID={"more-results-label"}>
              <Button
                raised
                icon={{name: 'home'}}
                onPress = {() => {
                  console.log('You tapped the button!');
                }}
              />
            </View>
          </View>

          <List
            style={[
              {
                backgroundColor: 'red'
              }
            ]}>
            {
              this.props.topResults.
              map((sizeItem, j) => (
                <View key={j}
                  style={{
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1}}>
                  {sizeItem.brand + " " + sizeItem.size}
                </Text>
                {Util.fitIcon(sizeItem.chest.fit)}
                {Util.fitIcon(sizeItem.waist.fit)}
                {Util.fitIcon(sizeItem.hip.fit)}
                {Util.fitIcon(sizeItem.height.fit)}
                </View>))
            }
          </List>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 45,
              bottom: 0,
              backgroundColor: 'lightgrey'
            }}
            {...this._panResponder.panHandlers}
            >
            <Icon
              style={{
              }}
              onPress = {() => {
                console.log('You tapped the button!');
              }}
              name='menu'/>
          </View>
        </View>
  </TouchableHighlight>);
  }
}
