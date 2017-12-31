import React from 'react';
import {FlatList, View, StyleSheet, Text, Animated, Button} from 'react-native';
import Util from './Util';
import DynamicListRow from './DynamicListRow';

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
  container: {
    height: '100%',
  },
  subtitle_container: {
    height: '100%',
    marginTop: PARAMETERS.MARGIN,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
});

export default class CloseFitList extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
       renderCount: this.props.renderCount,
       dataSource: this.props.sizeData,
       loading     : true,
       refreshing  : false,

       allResultsCallback: this.props.allResultsCallback,

      };
    }


   render() {

       return (
           <View style={styles.container}>
                  <FlatList
                   data={this.props.sizeData.slice(0,this.props.renderCount)}
                   renderItem={this.renderItem}
                   keyExtractor={this._keyExtractor}
                 />
                 <View
                   style={{
                     position: 'absolute',
                     width: '100%',
                     height: 200,
                     bottom: 0,
                     justifyContent: 'center',
                     alignItems: 'flex-end',
                   }}>
                   <Button onPress={(val) => {
                      console.log('preess');
                      this.state.allResultsCallback();
                    }
                  }
                    title="More"
                    color='blue'/>

                 </View>
           </View>
       );
   }

  renderItem({ item, index }) {
     return <DynamicListRow
    item={item}/>;
  }

  _keyExtractor= (item, index) => (item.brand + "-" + item.size);

   _renderRow(sizeItem1, index) {

     var sizeItem = sizeItem1.item;
      return (
        <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: PARAMETERS.LIST_ITEM_HEIGHT,
              marginRight: 40,
              opacity: 1,
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
