import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import tw from 'utils/tailwind';

type IWeb23Spinner = {
  loading: boolean;
};

const Web23Spinner: React.FC<IWeb23Spinner> = ({loading}) => {
  return (
    <View style={tw`absolute flex justify-center items-center bg-[#F5FCFF]`}>
      <Spinner visible={loading} />
    </View>
  );
};

export default Web23Spinner;
