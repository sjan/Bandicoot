import React from 'react';
import {FlatList, View, StyleSheet, Text, Animated} from 'react-native';
import Util from './Util';

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
  subtitle_container: {
    height: '100%',
    marginTop: PARAMETERS.MARGIN,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
});

export default class DynamicListRow extends React.Component {
   // these values will need to be fixed either within the component or sent through props
   _defaultHeightValue = 60;
   _defaultTransition  = 500;
   state = {
       _rowHeight  : new Animated.Value(this._defaultHeightValue),
       _rowOpacity : new Animated.Value(0),
       sizeItem : this.props.item
   };
   componentDidMount() {
       Animated.timing(this.state._rowOpacity, {
           toValue  : 1,
           duration : this._defaultTransition
       }).start()
   }
   componentWillReceiveProps(nextProps) {
       if (nextProps.remove) {
           this.onRemoving(nextProps.onRemoving);
       } else {
// we need this for iOS because iOS does not reset list row style properties
           this.resetHeight()
       }
   }
   onRemoving(callback) {
       Animated.timing(this.state._rowHeight, {
           toValue  : 0,
           duration : this._defaultTransition
       }).start(callback);
   }
   resetHeight() {
       Animated.timing(this.state._rowHeight, {
           toValue  : this._defaultHeightValue,
           duration : 0
       }).start();
   }
   render() {
     let {
       sizeItem,
     } = this.state;


       return (
         <Animated.View
             style={{
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
               height: PARAMETERS.LIST_ITEM_HEIGHT,
               marginRight: 40,
               opacity: this.state._rowOpacity
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
         </Animated.View>

       );
   }
}
