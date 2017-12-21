import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder
} from 'react-native';

import { Button, ListItem, Icon } from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';

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
      dimensions: undefined
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
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

   _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
     console.log("_handleStartShouldSetPanResponder");
     return true;
   }

   _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
     console.log("_handleMoveShouldSetPanResponder");
     return true;
   }

   _handlePanResponderGrant(e: Object, gestureState: Object) {
     console.log("_handlePanResponderGrant");
   }

   _handlePanResponderEnd(e: Object, gestureState: Object) {
     console.log("_handlePanResponderEnd");
   }

   render() {
    return (
      <View
        style={[{
          flexDirection: 'column',
          height: '100%'
        },
          this.props.style]}
        {...this._panResponder.panHandlers}
        onLayout={this.onLayout}>
        <View style={{height: 20}}/>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 80,
        }}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text style={{
          flex: 1,
          alignItems: 'center',
          height: 10,
          fontSize: 14}}>
          Best Size and Brand
        </Text>
        <Text style={{
          flex: 1,
          fontSize: 14}}
          >{this.props.bestFitBrand + " " + this.props.bestFitSize}
        </Text>
      </View>
      <View style={{
       flexDirection: 'column',
       alignItems: 'center',
      }}>
        <Text style={{
          flex: 1,
        }}>Chest</Text>
        {Util.fitIcon(this.props.bestFitChestDelta)}
      </View>

      <View style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Text style={{
            flex: 1,
          }}>Waist</Text>
          {Util.fitIcon(this.props.bestFitWaistDelta)}
      </View>

      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
          <Text style={{
            flex: 1,
          }}>Hip</Text>
          {Util.fitIcon(this.props.bestFitHipDelta)}
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
          <Text style={{
            flex: 1,
          }}>Height</Text>
          {Util.fitIcon(this.props.bestFitHeightDelta)}
      </View>
    </View>
    </View>
    );
  }

  onLayout = event => {
   console.log("onLayout " + JSON.stringify(event.nativeEvent.layout));
 }
}
