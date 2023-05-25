import React from 'react';
import {View, Text} from 'react-native';

import tw from 'utils/tailwind';

import WatchLaterSVG from '../../assets/icons/watch_later.svg';

const Web23ComingSoon: React.FC = () => {
  return (
    <View style={tw`bg-yellow-500 p-1 flex flex-row gap-[2px] rounded-[4px]`}>
      <WatchLaterSVG />
      <Text style={tw`text-xs font-bold text-black`}>Coming Soon</Text>
    </View>
  );
};

export default Web23ComingSoon;
