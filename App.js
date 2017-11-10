import React from 'react';
import { FlatList, StyleSheet, Text, View, Slider, Image } from 'react-native';
import HumanImageView from './HumanView';

let allstarSizeData = require('./resources/allstar_2017.json');
let uhlmannSizeData = require('./resources/uhlmann_2017.json');
let pbtSizeData = require('./resources/pbt_2017.json');
let negriniSizeData = require('./resources/negrini_2017.json');


export default class App extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
      chest: chest.default,
      waist: waist.default,
      hip: hip.default,
      height: height.default,
      bestFitBrand: 'ALLSTAR',
      bestFitSize: '50',
      bestFit: ['ALLSTAR', 0, 0]
    };
  }

  findSize() {
    var resultArray = [];
    var allstarMensSizeArray = allstarSizeData.MEN.sizes;
    var uhlmannMensSizeArray = uhlmannSizeData.MEN.sizes;
    var pbtMensSizeArray = pbtSizeData.MEN.sizes;
    var negriniMensSizeArray = negriniSizeData.MEN.sizes;

    for(var i in allstarMensSizeArray) {
      var sizeObject = allstarMensSizeArray[i];

      chestRange = sizeObject.chest;
      heightRange = sizeObject.height;
      waistRange = sizeObject.waist;
      hipRange = sizeObject.hip;

      chestFit = this.fit(chestRange, this.state.chest);
      heightFit = this.fit(heightRange, this.state.height);
      waistFit = this.fit(waistRange, this.state.waist);
      hipFit = this.fit(hipRange, this.state.hip);

      fitDelta = chestFit + heightFit + waistFit + hipFit;

      if(chestFit >= 0 &&
          heightFit >= 0 &&
          waistFit >= 0 &&
          hipFit >= 0) {
            resultArray.push([fitDelta, 'ALLSTAR', allstarMensSizeArray[i].size]);
      }
    }

    for(var i in uhlmannMensSizeArray) {
      var sizeObject = uhlmannMensSizeArray[i];

      chestRange = sizeObject.chest;
      heightRange = sizeObject.height;
      waistRange = sizeObject.waist;
      hipRange = sizeObject.hip;

      chestFit = this.fit(chestRange, this.state.chest);
      heightFit = this.fit(heightRange, this.state.height);
      waistFit = this.fit(waistRange, this.state.waist);
      hipFit = this.fit(hipRange, this.state.hip);

      fitDelta = chestFit + heightFit + waistFit + hipFit;

      if(chestFit >= 0 &&
          heightFit >= 0 &&
          waistFit >= 0 &&
          hipFit >= 0) {
            resultArray.push([fitDelta, 'UHLMANN', uhlmannMensSizeArray[i].size]);
      }
    }

    for(var i in pbtMensSizeArray) {
      var sizeObject = pbtMensSizeArray[i];

      chestRange = sizeObject.chest;
      heightRange = sizeObject.height;
      waistRange = sizeObject.waist;
      hipRange = sizeObject.hip;

      chestFit = this.fit(chestRange, this.state.chest);
      heightFit = this.fit(heightRange, this.state.height);
      waistFit = this.fit(waistRange, this.state.waist);
      hipFit = this.fit(hipRange, this.state.hip);

      fitDelta = chestFit + heightFit + waistFit + hipFit;

      if(chestFit >= 0 &&
          heightFit >= 0 &&
          waistFit >= 0 &&
          hipFit >= 0) {
            resultArray.push([fitDelta, 'PBT', pbtMensSizeArray[i].size]);
      }
    }

    for(var i in negriniMensSizeArray) {
      var sizeObject = negriniMensSizeArray[i];

      chestRange = sizeObject.chest;
      heightRange = sizeObject.height;
      waistRange = sizeObject.waist;
      hipRange = sizeObject.hip;

      chestFit = this.fit(chestRange, this.state.chest);
      heightFit = this.fit(heightRange, this.state.height);
      waistFit = this.fit(waistRange, this.state.waist);
      hipFit = this.fit(hipRange, this.state.hip);

      fitDelta = chestFit + heightFit + waistFit + hipFit;

      if(chestFit >= 0 &&
          heightFit >= 0 &&
          waistFit >= 0 &&
          hipFit >= 0) {
            resultArray.push([fitDelta, 'NEGRINI', negriniMensSizeArray[i].size]);
      }
    }

    resultArray.sort(function(a, b) {
      return a[0] - b[0];
    });

    if(resultArray.length>0) {
      this.state.bestFit = [resultArray[0][0], resultArray[0][1], resultArray[0][2]];
      this.state.bestFitDelta = this.state.bestFit[0];
      this.state.bestFitBrand = this.state.bestFit[1];
      this.state.bestFitSize = this.state.bestFit[2];

    } else {
      this.state.bestFitSize = '';
      this.state.bestFitDelta = '';
      this.state.bestFitBrand = 'No Match';
    }
  }

  inRange(range, size) {
      if(size >= range.lower && size <= range.upper) {
        return true;
      } else {
        return false;
      }
  }

  fit(range, size) {
      if(size >= range.lower &&
         size <= range.upper) {
        return 0;
      } else if(size < range.lower) {
        return (range.lower - size);
      } else if(size > range.upper) {
        return (range.upper - size);
      }
  }

  slidingChest(itemSelected) {
    console.log("sliding chest");
    this.setState({chest: itemSelected});
  }

  slidingChestComplete(itemSelected) {
    console.log("sliding chest complete");
    this.setState({chest: itemSelected});
    this.findSize();
  }

  slidingWaist(itemSelected) {
    console.log("sliding waist complete");
    this.setState({waist: itemSelected})
    }

  slidingWaistComplete(itemSelected) {
    console.log("sliding waist complete");
    this.setState({waist: itemSelected})
    this.findSize();
  }

  slidingHip(itemSelected) {
    console.log("sliding hip complete");
    this.setState({hip: itemSelected})
  }

  slidingHipComplete(itemSelected) {
    console.log("sliding hip complete");
    this.setState({hip: itemSelected})
    this.findSize();
  }

  slidingHeight(itemSelected) {
    this.setState({height: itemSelected})
  }

  slidingHeightComplete(itemSelected) {
    this.setState({height: itemSelected})
    this.findSize();
  }

  render() {
    return (
      <View style= {{flex: 1, flexDirection: 'column'}}>
        <HumanImageView
          chestSize= {this.state.chest}
          waistSize= {this.state.waist}
          hipSize= {this.state.hip}
          fullHeight= {this.state.height}
          style= {{flex: 6, backgroundColor: 'skyblue'}} />
        <View style = {styles.size_label_container} >
            <Text style = {styles.size_label_text} >
              {this.state.bestFitBrand} {this.state.bestFitSize}
            </Text>
        </View>
        <View style={styles.slider_controller_container} >
          <Image
            source={require('./my-icon.png')}
            style={styles.slider_controller_icon} />
          <View style={styles.slider_controller_sub_container}>
            <Text>Chest: {this.state.chest}cm</Text>
            <Slider
              maximumValue = {chest.max}
              minimumValue = {chest.min}
              step = {chest.step}
              value = {chest.default}
              onSlidingComplete = {(val) => {this.slidingChestComplete(val)}}
              onValueChange = {(val) => {this.slidingChest(val)}}/>
          </View>
        </View>
        <View style={styles.slider_controller_container} >
          <Image
            source={require('./my-icon.png')}
            style={styles.slider_controller_icon} />
          <View style={styles.slider_controller_sub_container}>
            <Text>Waist: {this.state.waist}cm</Text>
            <Slider
              maximumValue = {waist.max}
              minimumValue = {waist.min}
              value = {waist.default}
              step = {waist.step}
              onSlidingComplete = {(val) => {this.slidingWaistComplete(val)}}
              onValueChange = {(val) => {this.slidingWaist(val)}}/>
          </View>
        </View>
        <View style={styles.slider_controller_container} >
          <Image
            source={require('./my-icon.png')}
            style={styles.slider_controller_icon} />
          <View style={styles.slider_controller_sub_container}>
            <Text>Hip: {this.state.hip}cm</Text>
            <Slider
              maximumValue = {hip.max}
              minimumValue = {hip.min}
              value = {hip.default}
              step = {hip.step}
              onSlidingComplete = {(val) => {this.slidingHipComplete(val)}}
              onValueChange = {(val) => {this.slidingHip(val)}}/>
          </View>
        </View>
        <View style={styles.slider_controller_container} >
          <Image
            source={require('./my-icon.png')}
            style={styles.slider_controller_icon} />
          <View style={styles.slider_controller_sub_container}>
            <Text>Height: {this.state.height}cm</Text>
            <Slider
              maximumValue = {height.max}
              minimumValue = {height.min}
              value = {height.default}
              step = {height.step}
              onSlidingComplete = {(val) => {this.slidingHeightComplete(val)}}
              onValueChange = {(val) => {this.slidingHeight(val)}}/>
          </View>
        </View>
      </View>
    );
  }
}

const chest = {
  min: 62,
  max: 125,
  step: 1,
  default: 96
}

const waist = {
  min: 55,
  max: 110,
  step: 1,
  default: 88
}

const hip = {
  min: 65,
  max: 127,
  step: 1,
  default: 104
}

const height = {
  min: 120, //4 feet
  max: 200, //11 ft
  step: 1,
  default: 176 //9feet
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  slider_controller_container: {
    flex: 1,
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    alignItems:'center'
  },
  slider_controller_sub_container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  slider_controller_icon: {
    width: 40,
    height: 40,
    marginLeft: 5
  },
  size_label_container: {
    height: 80,
    backgroundColor: 'lightyellow',
    alignItems:'center',
    justifyContent: 'center'
  },
  size_label_text: {
    height: 30,
    alignItems:'center',
    justifyContent: 'center'
  }
});
