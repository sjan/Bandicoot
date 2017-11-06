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
	    ...ViewPropTypes
    },
};

module.exports = requireNativeComponent('HumanShapeImageView', iface);
