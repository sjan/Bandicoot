import React from 'react';
import {StyleSheet, View, Text, PanResponder} from 'react-native';

import {Button, ListItem, Icon, List} from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';
import MoreResultView from './MoreResultView';

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
      fitResultArray: props.fitResultArray
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this.props.handleDrag,
      onPanResponderRelease: this.props.handleDragRelease,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
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
    console.log("TopResultsView " + JSON.stringify(this.props.fitResultArray));
    return (
    <View style={[
        {
          flexDirection: 'column',
          height: '100%'
        },
        this.props.style
      ]}>
      <View
        nativeID={"top-result-best-fit-label"}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
        {...this._panResponder.panHandlers}>
        <Text style={{
            flex: 1,
          }}>
          Size
        </Text>
        <Text style={{
              flex: 1
            }}>Chest</Text>
        <Text style={{
              flex: 1
            }}>Waist</Text>
        <Text style={{
              flex: 1
            }}>Hip</Text>
        <Text style={{
              flex: 1
            }}>Height</Text>
      </View>
      <View
        nativeID={"top-result-best-fit-data"}
        style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1}}>
        {this.props.bestFitBrand + " " + this.props.bestFitSize}
      </Text>
      {Util.fitIcon(this.props.bestFitChestDelta )}
      {Util.fitIcon(this.props.bestFitWaistDelta )}
      {Util.fitIcon(this.props.bestFitHipDelta )}
      {Util.fitIcon(this.props.bestFitHeightDelta )}
      </View>
      <View
        style={{
          alignItems: 'center',
        }}

        nativeID={"more-results-label"}>
        <Text
          >
          More Sizes
        </Text>
      </View>
      <List>
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
    </View>);
  }
}
