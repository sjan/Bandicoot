import React from 'react';
import {FlatList, View, StyleSheet, Text, Animated, Button} from 'react-native';
import Util from './Util';

const PARAMETERS = {
  LIST_ITEM_HEIGHT: 70,
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
   state = {
       sizeItem : this.props.item,
       index : this.props.index,
       last : this.props.last,
       labelHeightProgress : this.props.labelHeightProgress,
       allResultsCallback: this.props.allResultsCallback
   };

   render() {
     let {
       sizeItem,
     } = this.state;

     if(this.state.last) {
       return (
          <Animated.View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: PARAMETERS.LIST_ITEM_HEIGHT,
                marginRight: 40,
                opacity: this.state.labelHeightProgress
                .interpolate({
                    inputRange: Util.generateInputRange(),
                    outputRange: Util.generateOutputOpacityRange(this.state.index)
                }),
                transform: [
                  {
                    translateY: this.state.labelHeightProgress
                    .interpolate({
                      inputRange: Util.generateInputRange(),
                      outputRange: Util.generateOutputRange(this.state.index, PARAMETERS.LIST_ITEM_HEIGHT),
                      extrapolate: 'clamp'
                    })
                  }
                ]
            }}>
            <Button
              onPress= {() => {this.state.allResultsCallback();}}
              title="All Fit"
              />
          </Animated.View>
        );
     }

      return (
         <Animated.View
             style={{
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
               height: PARAMETERS.LIST_ITEM_HEIGHT,
               marginRight: 40,
               opacity: this.state.labelHeightProgress
               .interpolate({
                   inputRange: Util.generateInputRange(),
                   outputRange: Util.generateOutputOpacityRange(this.state.index)
               }),
               transform: [
                 {
                   translateY: this.state.labelHeightProgress
                   .interpolate({
                     inputRange: Util.generateInputRange(),
                     outputRange: Util.generateOutputRange(this.state.index, PARAMETERS.LIST_ITEM_HEIGHT)
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
         </Animated.View>

       );
   }
}
