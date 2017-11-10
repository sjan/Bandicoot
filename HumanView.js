'use strict';

import PropTypes from 'prop-types';
import {
    NativeModules,
    requireNativeComponent,
    View,
    ViewPropTypes
} from 'react-native';

var iface = {
    name: 'HumanImageView',
    propTypes: {
      fullHeight: PropTypes.number,
      hipSize: PropTypes.number,
      waistSize: PropTypes.number,
      chestSize: PropTypes.number,
	    ...ViewPropTypes
    },
};

module.exports = requireNativeComponent('HumanShapeImageView', iface);
