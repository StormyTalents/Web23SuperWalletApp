import React from 'react';
import {View} from 'react-native';

import tw from 'utils/tailwind';

const Web23Modal: React.FC<{
  show: boolean;
  children: React.ReactNode;
}> = ({show, children}) => {
  return (
    <View style={tw`fixed top-0 left-0 w-full h-full`}>
      {show && (
        <View style={tw`fixed p-6 m-auto bg-grey-900 rounded-2xl`}>
          {children}
        </View>
      )}
    </View>
  );
};

export default Web23Modal;
