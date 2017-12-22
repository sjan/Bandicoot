import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {List, ListItem, Icon, Button} from 'react-native-elements';
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
        ALLSTAR: false
      }
    };
  }

  render() {
    var showAll = this.state.showAll;

    console.log("result " + JSON.stringify(this.props.fitResultArray));

    return (<View>
      {

        this.props.fitResultArray.map((brandItem, i) => (

          <List key={i}>
            {
              brandItem.fit.filter(function(sizeData) {
                return true;
              }).map((sizeItem, j) =>
              (<SizeListItem
                key={j}
                chestFit={sizeItem.chest.fit}
                waistFit={sizeItem.waist.fit}
                hipFit={sizeItem.hip.fit}
                heightFit={sizeItem.height.fit}
                label={sizeItem.brand + " " + sizeItem.size}/>))
            }
          </List>
        ))
      }

    </View>);
  }
}
