import React from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};


export default class FindSizeView extends React.Component {
  static navigationOptions = {
    title: 'Brand and Size',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  lookupSize(brand, type, size) {
    console.log(JSON.stringify(brand));
     var sizes = sizeData[brand].MEN.sizes;

     for(i=0;i<sizes.length;i++) {
       if(sizes[i]["size"] == size) {
         return sizes[i];
       }
    }
    return "";
  }

  render() {
    // let sizeData = this.props.screenProps.sizeData
    // let currentSize = this.props.screenProps.currentSize
    const {state} = this.props.navigation;

    return (
      <View
        style={{flexDirection: 'column'}}>
      <Text>Size info here</Text>
      <View
       style={{
         flexDirection: 'row'
       }}>
       <Text>Chest: {state.params.size.chest}</Text>
       <Text>Waist: {state.params.size.waist}</Text>
       <Text>Hip: {state.params.size.hip}</Text>
       <Text>Height: {state.params.size.height}</Text>
      </View>

      <FlatList
           data={state.params.fitResultArray}
           renderItem={({item}) => <View
           style={{
             height: 30,
             flexDirection: 'row'
           }}>
           <Text>{item[1]} size: {item[2]}</Text><Text>size data: {JSON.stringify(this.lookupSize(item[1], 'MEN', item[2])["height"])}</Text>
         </View>}
         />
      </View>
    );
  }
}
