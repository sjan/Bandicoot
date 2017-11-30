import React from 'react';
import FindSizeView from './FindSizeView';

let sizeData = {
  "ALLSTAR": require('./resources/allstar_2017.json'),
  "UHLMANN": require('./resources/uhlmann_2017.json'),
  "PBT": require('./resources/pbt_2017.json'),
  "NEGRINI": require('./resources/negrini_2017.json')
};

export default class App extends React.Component {
  render() {
    return (
      <FindSizeView sizeData={sizeData}/>
    );
  }
}
