import React, {useState, useRef} from 'react';
import {Text, View, TextInput} from 'react-native';

import tw from 'utils/tailwind';

type IWeb23Input = {
  id?: string;
  placeholder: string;
  type?: string;
  value?: string;
  limit?: number;
  className?: string;
  variant?: string;
  onChange?: (e: any) => void;
};

const Web23Input: React.FC<IWeb23Input> = ({
  id,
  placeholder = 'sample place holder',
  type = 'input',
  limit = 0,
  value,
  className,
  variant = 'primary',
  onChange,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={tw`w-full relative`}>
      <TextInput
        id={id}
        secureTextEntry={type === 'input' ? false : true}
        value={limit > 0 ? value?.slice(0, limit - 1) : value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={onChange}
        style={tw.style(
          'w-full border rounded-[32px] font-bold text-base focus:outline-white  ',
          limit > 0 && 'pr-[42px]',
          variant === 'primary'
            ? 'bg-grey-900 border-grey-800 pt-[22px] pb-1 px-5 text-white'
            : 'bg-white p-5 text-grey-600',
          className,
        )}
        ref={inputRef}
      />
      {placeholder.length > 32 ? (
        <Text
          style={tw.style(
            'absolute font-bold  ',
            focus || value?.length
              ? 'top-1 left-5 text-xs'
              : variant === 'primary'
              ? 'top-3 left-5 text-sm'
              : 'top-5 left-5 text-sm',
            variant === 'primary' ? 'text-grey-400' : 'text-grey-600',
          )}
          onPress={() => {
            inputRef.current?.focus();
          }}>
          {placeholder}
        </Text>
      ) : (
        <Text
          style={tw.style(
            'absolute font-bold  ',
            focus || value?.length
              ? 'top-1 left-5 text-xs'
              : variant === 'primary'
              ? 'top-3 left-5 text-base'
              : 'top-5 left-5 text-base',
            variant === 'primary' ? 'text-grey-400' : 'text-grey-600',
          )}
          onPress={() => {
            inputRef.current?.focus();
          }}>
          {placeholder}
        </Text>
      )}

      {limit > 0 && (
        <Text
          style={{
            ...tw`absolute text-sm font-medium top-[22px] right-[42px] text-grey-400`,
            transform: [{translateY: -4}],
          }}>
          {(value?.length || 0) > limit ? limit : value?.length ?? 0}/{limit}
        </Text>
      )}
    </View>
  );
};

export default Web23Input;
