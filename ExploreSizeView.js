import React from 'react';
import { Text, List, ListItem, Icon, Button  } from 'react-native-elements';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import SizeListItem from './SizeListItem';

export default class ExploreSizeView extends React.Component {
  static navigationOptions = {
    title: 'Brand and Size',
  };

  constructor(props) {
    super(props);
    this.state = {
      showAll: {
        PBT: false,
        NEGRINI: false,
        UHLMANN: false,
        ALLSTAR: false,
      }
    };
  }

  fitIcon(fit) {
    var icon;
    var color;

    if(fit == 0) {
      icon = 'done';
    } else if(fit < 0) {
      icon = 'arrow-downward';
    } else if (fit > 0) {
      icon = 'arrow-upward';
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
    <Icon
      style={{
        flex: 2,
      }}
      reverse
      name={icon}
      color={color} />
    );
  }

  fitTitleText(input) {
    if(input.delta == 0) {
      return "perfect fit!"
    } else {
      var string = "";
      if(input.chest.fit > 0) {
        string = string + " Chest: +" + input.chest.fit;
      }

      if(input.waist.fit > 0) {
        string = string + " Waist: +" + input.waist.fit;
      }

      if(input.hip.fit > 0) {
        string = string + " Hip: +" + input.hip.fit;
      }

      if(input.height.fit > 0) {
        string = string + " Height: +" + input.height.fit;
      }
      return string;
  }
}

hideShowButton(brand) {
    if(this.state.showAll[brand]) {
      return "Hide";
    } else {
      return "Show";
    }
}

enableBrand(brand) {
  var obj;
  if(this.state.showAll[brand]) {
     obj = {
       showAll: {
         PBT: false,
         NEGRINI: false,
         UHLMANN: false,
         ALLSTAR: false,
       }
     }
  } else {
     obj = {
       showAll: {
         PBT: false,
         NEGRINI: false,
         UHLMANN: false,
         ALLSTAR: false,
       }
     }
     obj.showAll[brand] = true;
  }
  return obj;
}

disableBrand(brand) {
  var obj = {
     showAll: {
       PBT: false,
       NEGRINI: false,
       UHLMANN: false,
       ALLSTAR: false,
     }
   }

   obj.showAll[brand] = true;
   console.log(JSON.stringify(obj));
   return obj;
}

  render() {
    const {state} = this.props.navigation;
    var showAll = this.state.showAll;

    return (
      <ScrollView>
        {
          state.params.fitResultArray.filter(function(brandData) {
              if(brandData.fit.length <= 0) {
                  return false;
              } else {
                  return true;
              }

            }).map(
            (brandItem, i) => (
              <View key={i}>
                <View style={{
                  height: 48,
                  justifyContent: 'center'
                }}>
                <Text style={{
                  marginLeft: 72,
                  fontSize: 18
                }}>
                  {brandItem.brand}
                </Text>
              </View>
              <SizeListItem header='true'/>
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
                <View style={{
                      flex: 1,
                      alignItems: 'center',
                      margin: 12,
                      justifyContent: 'center'
                    }}>
                    <Button
                      small
                      raised
                      borderRadius = {3}
                      title={this.hideShowButton(brandItem.brand)}
                      onPress={(val) => {
                          this.setState(this.enableBrand(brandItem.brand))
                      }}
                    />
                </View>
              </View>
            )
          )
        }
      </ScrollView>
    );
  }
}
