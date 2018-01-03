import React from 'react';
import {FlatList, View, StyleSheet, Text, Animated, Button} from 'react-native';
import {Divider} from 'react-native-elements';
import Util from './Util';
import DynamicListRow from './DynamicListRow';

const PARAMETERS = {
  SECTION_LABEL_HEIGHT: 35,
  MARGIN: 16
}

export default class CloseFitList extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
       renderCount: this.props.renderCount,
       loading     : true,
       refreshing  : false,
       allResultsCallback: this.props.allResultsCallback,
       labelHeightProgress: this.props.labelHeightProgress
      };
      this.renderItem = this.renderItem.bind(this);
    }

   render() {
       return (
           <Animated.View
             style={[{
               flexDirection: 'column',
                height: this.state.labelHeightProgress.interpolate({
                extrapolate: 'clamp',
                 inputRange: [ 0, 1, 2, 3, 4, 5, 6 ],
                 outputRange: [
                   0,
                   0,
                   PARAMETERS.SECTION_LABEL_HEIGHT,
                   105,
                   175,
                   245,
                   290
                 ]
               })
             }]}>
             <Animated.View
                 style={{
                   height: PARAMETERS.SECTION_LABEL_HEIGHT,
                   opacity: this.state.labelHeightProgress
                   .interpolate({
                       inputRange: Util.generateInputRange(),
                       outputRange: Util.generateOutputOpacityRange(-1)
                   }),
                   transform: [
                     {
                       translateY: this.state.labelHeightProgress
                       .interpolate({
                           inputRange: Util.generateInputRange(),
                           outputRange: Util.generateOutputRange(-1, PARAMETERS.SECTION_LABEL_HEIGHT)
                       })
                     }
                   ]
               }}>
               <Text style={{marginLeft: 16, marginTop: 16}}>Close fit</Text>
             </Animated.View>

              <FlatList
                 data={this.props.sizeData.slice(0,this.props.renderCount)}
                 renderItem={this.renderItem}
                 keyExtractor={this._keyExtractor}
                 extraData={this.props.sizeData}
               />
               <Animated.View
                 style={{
                   height: this.state.labelHeightProgress
                   .interpolate({
                       inputRange: Util.generateInputRange(),
                       outputRange: Util.generateOutputRange2(3, PARAMETERS.LIST_ITEM_HEIGHT)
                   }),
                   opacity: this.state.labelHeightProgress
                   .interpolate({
                       inputRange: Util.generateInputRange(),
                       outputRange: Util.generateOutputOpacityRange(3)
                   })
               }}>
               <Button
                onPress={() => {this.state.allResultsCallback();}}
                title="More"
                />
               </Animated.View>
           </Animated.View>
       );
   }

  renderItem({ item, index }) {
    return (
      <DynamicListRow
        item={item}
        index={index}
        labelHeightProgress={this.state.labelHeightProgress}
      />
    );
  }

  _keyExtractor= (item, index) => {
    return (item.id+"-"+index)
  };
 }
