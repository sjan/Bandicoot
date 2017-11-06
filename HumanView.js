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
      hipWidth: PropTypes.number,
      fullHeight: PropTypes.number,
      waistWidth: PropTypes.number,
      chestWidth: PropTypes.number,
	    ...ViewPropTypes
    },
};

module.exports = requireNativeComponent('HumanShapeImageView', iface);
