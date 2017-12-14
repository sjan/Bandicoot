import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Button, ListItem, Icon } from 'react-native-elements';

export default class SizeListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chestFit: props.chestFit,
      waistFit: props.waistFit,
      hipFit: props.hipFit,
      heightFit: props.heightFit,
      label: props.label
    };
  }

  render() {
    if(this.props.header) {
      return (<View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: 50
        }}>
          <Text style={{
            marginLeft: 16,
            flex: 2
          }}>
            Size
          </Text>
          <Text style={{
            flex: 1,
          }}>Chest</Text>
          <Text style={{
            flex: 1,
          }}>Waist</Text>
          <Text style={{
            flex: 1,
          }}>Hip</Text>
          <Text style={{
            flex: 1,
          }}>Height</Text>
        </View>
      );

    } else {
      return (
          <ListItem
            hideChevron={true}
            style={{height: 12}}
            title={
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{
                flex: 2,
                fontSize: 14}}
                >{this.props.label}
              </Text>
              {this.fitIcon(this.props.chestFit)}
              {this.fitIcon(this.props.waistFit)}
              {this.fitIcon(this.props.hipFit)}
              {this.fitIcon(this.props.heightFit)}
              </View>
            }/>
          );
       }
    }

    fitIcon(fit) {
      var icon;
      var color;

      if(fit == 0) {
        icon = 'done';
      } else if(fit < 0) {
        icon = null;
      } else if (fit > 0) {
        icon = null;
      }

      if(Math.abs(fit) == 0) {
        color = 'green'
      } else if(Math.abs(fit) < 2) {
        color = 'orange'
      } else if(Math.abs(fit) < 4) {
        color = 'orange'
      } else if(Math.abs(fit) < 6) {
        color = 'red'
      } else {
        color = 'red'
      }

    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
      }}>
        <Icon
          style={{
            flex: 2,
          }}
          reverse
          name={icon}
          color={color} >
          </Icon>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              position: 'absolute',
              textAlign: 'center',
            }}>
            {this.formatFit(fit)}
          </Text>


        </View>
      );
    }

    formatFit(fit) {
      if(fit == 0) {
        return "";
      } else if(fit>0) {
        return ("+"+fit);
      } else {
        return (fit);
      }

    }
}
