import React, {useMemo} from 'react';
import {View, Text} from 'react-native';

import {getBGColorSchema} from 'utils/colorSchema';

import tw from 'utils/tailwind';

import WalletSVG from '../../assets/icons/Wallet.svg';

const Web23Avatar: React.FC<{
  name: string;
  color: string;
  walletColor?: 'black' | 'white';
  size?: 'sm' | 'md' | 'lg';
  type: 'initial' | 'icon';
}> = ({
  name,
  color = 'yellow',
  walletColor = 'black',
  size = 'sm',
  type = 'initial',
}) => {
  const avatarName = useMemo(() => {
    return name?.charAt(0);
  }, [name]);
  return (
    <View
      style={tw.style(
        'rounded-full flex justify-center items-center',
        getBGColorSchema(color),
        size === 'sm' && 'w-10 h-10',
        size === 'md' && 'w-16 h-16',
        size === 'lg' && 'w-[80px] h-[80px]',
      )}>
      <Text
        style={tw.style(
          'text-base font-bold',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-[32px] leading-10',
        )}>
        {type === 'initial' ? (
          avatarName
        ) : (
          <WalletSVG fill={walletColor === 'black' ? '#000000' : '#FFFFFF'} />
        )}
      </Text>
    </View>
  );
};

export default Web23Avatar;
