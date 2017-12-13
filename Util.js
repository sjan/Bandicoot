class Util {
  constructor() {}

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
        fitDelta: 100
    };

    //iterate therough brands
    for (var brand in sizeData) {
      var brandArray = [];
      var bestBrandFitSize = {
          fitDelta: 100
      };

      if (sizeData.hasOwnProperty(brand)) {
        var array = sizeData[brand][type].sizes;
        for (var i in array) {
          var sizeObject = array[i];

          chestRange = sizeObject.chest;
          heightRange = sizeObject.height;
          waistRange = sizeObject.waist;
          hipRange = sizeObject.hip;

          chestFit = Util.fit(chestRange, chest);
          heightFit = Util.fit(heightRange, height);
          waistFit = Util.fit(waistRange, waist);
          hipFit = Util.fit(hipRange, hip);

          fitDelta = Math.abs(chestFit) +
                    Math.abs(heightFit) +
                    Math.abs(waistFit) +
                    Math.abs(hipFit);

          if(selectionBrand == "ALL" || selectionBrand == brand) {
              if (fitDelta <= bestFitSize.fitDelta) {
                    console.log("best fit brand " + brand);
                    bestFitSize.brand = brand;
                    bestFitSize.fitDelta = fitDelta;
                    bestFitSize.size = sizeObject.size
                    bestFitSize.bestFitChestDelta = chestFit;
                    bestFitSize.bestFitHipDelta = hipFit;
                    bestFitSize.bestFitWaistDelta = waistFit;
                    bestFitSize.bestFitHeightDelta = heightFit;
                }

                if (fitDelta <= bestBrandFitSize.fitDelta) {
                      bestBrandFitSize.brand = brand;
                      bestBrandFitSize.fitDelta = fitDelta;
                      bestBrandFitSize.size = sizeObject.size
                      bestBrandFitSize.bestFitChestDelta = chestFit;
                      bestBrandFitSize.bestFitHipDelta = hipFit;
                      bestBrandFitSize.bestFitWaistDelta = waistFit;
                      bestBrandFitSize.bestFitHeightDelta = heightFit;
                  }

                brandArray.push(
                  {
                    delta: fitDelta,
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

      fitArray.push({
        brand: brand,
        bestFit: bestBrandFitSize,
        fit: brandArray        
      });
    }

    ret.fitArray = fitArray;
    ret.bestFitDelta = bestFitSize.fitDelta;
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
