import React from 'react';
import {View, Text} from 'react-native';
import tw from 'utils/tailwind';

import Web23LogoSVG from '../../assets/icons/logo.svg';

const Web23Logo: React.FC = () => {
  return (
    <View style={tw`h-full`}>
      <View style={tw`flex flex-row items-center justify-center gap-2 mb-2`}>
        <View>
          <Web23LogoSVG />
        </View>
        <View>
          <Text
            style={tw`text-green-500 font-bold leading-9 text-[28px] text-center`}>
            Web23
          </Text>
        </View>
      </View>
      <Text style={tw`text-base font-medium text-center text-lime-500`}>
        Super Wallet for Hedera
      </Text>
    </View>
  );
};

export default Web23Logo;
