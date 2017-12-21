import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import { List, ListItem, Icon, Button  } from 'react-native-elements';
import SizeListItem from './SizeListItem';
import Util from './Util';

export default class MoreResultView extends React.Component {

  constructor(props) {
    super(props);

    console.log("constructor MoreResults " + props.moreResults);

    this.state = {
      showAll: {
        PBT: false,
        NEGRINI: false,
        UHLMANN: false,
        ALLSTAR: false,
      }
    };
  }

  render() {
    var showAll = this.state.showAll;
    var moreResults = this.props.moreResults;

    return (
      <ScrollView>
        {
          this.props.fitResultArray.filter(function(brandData) {
              if(!moreResults || brandData.fit.length <= 0) {
                  return false;
              } else {
                  return true;
              }
            }).map(
            (brandItem, i) => (
              <View key={i}>
              <List>
                  {
                    brandItem.fit.filter(function(sizeData) {
                      if(!showAll[brandItem.brand]) {
                        if(sizeData.size == brandItem.bestFit.size) {
                          return true;
                        } else if(sizeData.delta > 4) {
                          return false;
                        } else {
                          return true;
                        }
                      } else {
                        return true;
                      }
                    }).map(
                      (sizeItem, j) => (
                        <SizeListItem
                          key= {j}
                          chestFit = {sizeItem.chest.fit}
                          waistFit = {sizeItem.waist.fit}
                          hipFit = {sizeItem.hip.fit}
                          heightFit = {sizeItem.height.fit}
                          label = {sizeItem.brand + " " + sizeItem.size}>
                        </SizeListItem>
                    ))
                  }
                </List>
              </View>
            )
          )
        }

      </ScrollView>
    );
  }
}
