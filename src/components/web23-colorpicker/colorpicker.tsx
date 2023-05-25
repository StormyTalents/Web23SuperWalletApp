import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {
  colorValue,
  getBGColorSchema,
  getAfterBorderColorSchema,
} from 'utils/colorSchema';

import tw from 'utils/tailwind';

const Web23ColorPicker: React.FC<{
  value: string;
  setValue: (color: string) => void;
}> = ({value, setValue}) => {
  return (
    <View style={tw`flex flex-row gap-2`}>
      {colorValue.map((color, index) => (
        <TouchableOpacity
          key={`${color}_${index}`}
          style={tw.style(
            'relative m-1 w-6 h-6 rounded-full flex flex-row justify-center items-center',
            getAfterBorderColorSchema(color),
            getBGColorSchema(color),
            value === color &&
              "after:content-[''] after:absolute after:w-8 after:h-8 after:top-[-4px] after:left-[-4px] after:rounded-full after:border",
          )}
          onPress={() => setValue(color)}>
          {value === color && (
            <View
              style={{
                ...tw`border-l border-b border-black w-3 h-[6px]`,
                transform: [{rotate: '-45deg'}],
              }}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Web23ColorPicker;
