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

  static computeSize(selectionBrand, type, sizeData, chest, height, waist, hip) {
    var ret = new Object();
    var fitArray = [];
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

          if(selectionBrand == "ALL" || selectionBrand == brand) {
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

    ret.fitArray = fitArray;
    ret.bestFitDelta = bestFitSize.maxDelta;
    ret.bestFitBrand = bestFitSize.brand;
    ret.bestFitSize = bestFitSize.size;
    ret.bestFitChestDelta = bestFitSize.bestFitChestDelta;
    ret.bestFitHipDelta = bestFitSize.bestFitHipDelta;
    ret.bestFitWaistDelta = bestFitSize.bestFitWaistDelta;
    ret.bestFitHeightDelta = bestFitSize.bestFitHeightDelta;
    return ret;
  }
}

export default Util;
