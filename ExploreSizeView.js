import React from 'react';
import { Text, List, ListItem, Icon, Button  } from 'react-native-elements';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';

export default class FindSizeView extends React.Component {
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
              <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 48
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
                      <ListItem
                        key={j}
                        hideChevron={true}
                        style={{
                          underlayColor: 'blue',
                          height: 12
                        }}
                        title={
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={{
                            flex: 1,
                            fontSize: 24}}
                            >{sizeItem.size}
                          </Text>
                          {this.fitIcon(sizeItem.chest.fit)}
                          {this.fitIcon(sizeItem.waist.fit)}
                          {this.fitIcon(sizeItem.hip.fit)}
                          {this.fitIcon(sizeItem.height.fit)}
                          </View>
                        }/>
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
