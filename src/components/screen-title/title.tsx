import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import tw from 'utils/tailwind';

import ArrowBackSVG from '../../assets/icons/arrow_back.svg';

const ScreenTitle: React.FC<{title?: string; onPress?: () => void}> = ({
  title = '',
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex flex-row items-center gap-3 px-6 py-5`}>
      <ArrowBackSVG fill="#D6D6D6" />
      <Text style={tw`text-xl font-bold   text-grey-50`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ScreenTitle;
