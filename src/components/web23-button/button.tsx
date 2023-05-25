import React, {ReactNode} from 'react';

import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import tw from 'utils/tailwind';

type IButton = {
  variant?: 'primary' | 'secondary' | 'danger' | 'third';
  text?: string;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
};

const Web23Button: React.FC<IButton> = ({
  variant = 'primary',
  text = 'sample text',
  className,
  disabled,
  onPress,
  size = 'md',
  icon = false,
  iconPosition = 'right',
}) => {
  return (
    <TouchableOpacity
      style={tw.style(
        variant === 'primary'
          ? disabled
            ? 'bg-white border-grey-900 active:bg-white'
            : 'bg-lime-500 border-grey-900 active:bg-green-500'
          : variant === 'secondary'
          ? disabled
            ? 'bg-white border-grey-300 active:bg-white'
            : 'bg-white  border-grey-300 active:bg-grey-300'
          : variant === 'danger'
          ? 'bg-red-500 active:bg-red-400 border-grey-900'
          : variant === 'third' && 'bg-transparent border-white',
        size === 'sm' ? 'py-[6px]' : 'py-3',
        'w-full border-2 rounded-3xl flex flex-row gap-1 items-center justify-center',
        className,
      )}
      onPress={onPress}
      disabled={disabled}>
      {iconPosition === 'left' && icon && icon}
      <Text
        style={tw.style(
          'font-bold text-base',
          disabled && 'text-gray-400',
          variant === 'third' ? 'text-white' : 'text-grey-900',
        )}>
        {text}
      </Text>
      {iconPosition === 'right' && icon && icon}
    </TouchableOpacity>
  );
};

export default Web23Button;
