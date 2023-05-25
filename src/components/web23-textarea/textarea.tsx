import React from 'react';
import {View, Text, TextInput} from 'react-native';

import tw from 'utils/tailwind';

type IWeb23TextArea = {
  value?: string;
  onChange?: (e: string) => void;
  className?: string;
  rows?: number;
  placeholder?: string;
};

const Web23TextArea: React.FC<IWeb23TextArea> = ({
  value,
  onChange,
  className,
  rows,
  placeholder = 'Enter Secret Phase',
}) => {
  return (
    <View style={tw`relative`}>
      <TextInput
        multiline={true}
        numberOfLines={rows}
        style={tw.style(
          'bg-grey-900 outline-2  -100   w-full rounded-xl pt-[30px] pb-[10px] px-5 font-bold text-base text-grey-50',
          className,
        )}
        value={value}
        onChangeText={str => onChange && onChange(str)}
      />
      <Text style={tw`absolute text-grey-400 text-sm top-[10px] left-5`}>
        {placeholder}
      </Text>
    </View>
  );
};

export default Web23TextArea;
