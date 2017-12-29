import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Button, ListItem, Icon } from 'react-native-elements';

class Util {
  constructor() {}

  static measurment(value, unit) {
    if(unit == 'METRIC') {
      return (
        {
          cmValue: value,
          inValue: Util.convertToInches(value)
        });
    } else {
      return (
        {
          cmValue: Util.convertToCentimeters(value),
          inValue: value
        });
    }
  }

  static convertToInches(value) {
    actualValue = value*(0.393701);
    estimatedValue = Math.round(actualValue * 4);
    return estimatedValue/4.0;
  }

  static convertToCentimeters(value) {
    actualValue = 2.54*value;

    return Math.round(actualValue);
  }

  static inRange(range, size) {
    if (size >= range.lower && size <= range.upper) {
      return true;
    } else {
      return false;
    }
  }

  static fit(range, size) {
    if (size >= range.lower && size <= range.upper) {
      return 0;
    } else if (size < range.lower) {
      return (range.lower - size);
    } else if (size > range.upper) {
      return (range.upper - size);
    }
  }


  static sum(a, b) {
    return a + b;
  }

  static computeSize(selectionBrand, type, sizeData, chest, height, waist, hip) {
    var ret = new Object();
    var fitArray = [];
    var fitArrayAll = [];
    var bestFitSize = {
        maxDelta: 100
    };

    //iterate therough brands
    for (var brand in sizeData) {
      var brandArray = [];
      var bestBrandFitSize = {
          maxDelta: 100
      };

      if (sizeData.hasOwnProperty(brand)) {
        var array = sizeData[brand][type].sizes;
        for (var i in array) {
          var sizeObject = array[i];

          chestRange = sizeObject.chest;
          heightRange = sizeObject.height;
          waistRange = sizeObject.waist;
          hipRange = sizeObject.hip;

          chestFit = Util.fit(chestRange, chest.cmValue);
          heightFit = Util.fit(heightRange, height.cmValue);
          waistFit = Util.fit(waistRange, waist.cmValue);
          hipFit = Util.fit(hipRange, hip.cmValue);

          maxDelta = Math.max(
             Math.abs(chestFit),
              Math.abs(heightFit),
              Math.abs(waistFit),
              Math.abs(hipFit));

          totalDelta = Math.abs(chestFit) +
              Math.abs(heightFit) +
              Math.abs(waistFit) +
              Math.abs(hipFit);



          if(selectionBrand == "ALL" || selectionBrand == brand) {

            fitArrayAll.push({
              delta: maxDelta,
              totalDelta: totalDelta,
              brand: brand,
              size: sizeObject.size,
              chest: {
                fit: chestFit,
                range: chestRange
              },
              waist: {
                fit: waistFit,
                range: waistRange
              },
              hip: {
                fit: hipFit,
                range: hipRange
              },
              height: {
                fit: heightFit,
                range: heightRange
              }
            });

                if (maxDelta <= bestBrandFitSize.maxDelta) {
                      bestBrandFitSize.brand = brand;
                      bestBrandFitSize.maxDelta = maxDelta;
                      bestBrandFitSize.size = sizeObject.size
                      bestBrandFitSize.bestFitChestDelta = chestFit;
                      bestBrandFitSize.bestFitHipDelta = hipFit;
                      bestBrandFitSize.bestFitWaistDelta = waistFit;
                      bestBrandFitSize.bestFitHeightDelta = heightFit;
                  }

                brandArray.push(
                  {
                    delta: maxDelta,
                    totalDelta: totalDelta,
                    brand: brand,
                    size: sizeObject.size,
                    chest: {
                      fit: chestFit,
                      range: chestRange
                    },
                    waist: {
                      fit: waistFit,
                      range: waistRange
                    },
                    hip: {
                      fit: hipFit,
                      range: hipRange
                    },
                    height: {
                      fit: heightFit,
                      range: heightRange
                    }
                  }
                );
          }
        }
      }

      brandArray.sort(function(a, b) {
        return a.size - b.size;
      });

      //set brand fit size
      if (maxDelta <= bestFitSize.maxDelta) {
            bestFitSize.brand = bestBrandFitSize.brand;
            bestFitSize.maxDelta = bestBrandFitSize.maxDelta;
            bestFitSize.size = bestBrandFitSize.size
            bestFitSize.bestFitChestDelta = bestBrandFitSize.bestFitChestDelta;
            bestFitSize.bestFitHipDelta = bestBrandFitSize.bestFitHipDelta;
            bestFitSize.bestFitWaistDelta = bestBrandFitSize.bestFitWaistDelta;
            bestFitSize.bestFitHeightDelta = bestBrandFitSize.bestFitHeightDelta;
      }

      fitArray.push({
        brand: brand,
        bestFit: bestBrandFitSize,
        fit: brandArray
      });
    }

    fitArrayAll.sort(function(a, b) {
      var ret = (a.delta - b.delta);
      if(ret == 0) {
        ret = a.totalDelta - b.totalDelta;
      }
      return ret;
    });


    bestFitSize = fitArrayAll[0];
    ret.topResults = fitArrayAll.slice(1, 10);;
    ret.fitArray = fitArray;
    ret.bestFitDelta = bestFitSize.delta;
    ret.bestFitBrand = bestFitSize.brand;
    ret.bestFitSize = bestFitSize.size;
    ret.bestFitChestDelta = bestFitSize.chest.fit;
    ret.bestFitHipDelta = bestFitSize.hip.fit;
    ret.bestFitWaistDelta = bestFitSize.waist.fit;
    ret.bestFitHeightDelta = bestFitSize.height.fit;
    return ret;
  }

  static fitIcon(fit, reverse) {
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

if(reverse) {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50
    }}>
      <Icon
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
          {Util.formatFit(fit)}
        </Text>
    </View>
    );
  } else {
    return (

      <View style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: 20
      }}>
          <Icon
            name={icon}
            color={color} >
          </Icon>
          <Text
          style={{
            fontSize: 18,
            color: 'black',
            position: 'absolute',
            textAlign: 'center',
          }}>
          {Util.formatFit(fit)}
        </Text>
        </View>
      );
  }
  }

  static formatString(input) {
     return input.charAt(0).toUpperCase() + input.toLowerCase().slice(1);
  }

  static formatFit(fit) {
    if(fit == 0) {
      return "";
    } else if(fit>0) {
      return ("+"+fit);
    } else {
      return (fit);
    }
  }
}

export default Util;
