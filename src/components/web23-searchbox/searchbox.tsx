import React from 'react';
import {View, TextInput} from 'react-native';

import tw from 'utils/tailwind';

import SearchSVG from '../../assets/icons/search.svg';

type IWeb23SearchBox = {
  placeholder: string;
  keyword: string;
  setKeyword: (str: string) => void;
};

const Web23SearchBox: React.FC<IWeb23SearchBox> = ({
  placeholder,
  keyword,
  setKeyword,
}) => {
  return (
    <View style={tw`relative w-full`}>
      <TextInput
        value={keyword}
        onChangeText={str => {
          setKeyword(str);
        }}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        style={tw`placeholder-grey-400 text-grey-400 font-bold text-base placeholder:text-base placeholder:font-bold p-5   bg-grey-900 border border-grey-800 w-full rounded-[32px] pr-10`}
      />
      <SearchSVG style={tw`absolute top-5 right-5 `} fill="#9E9E9E" />
    </View>
  );
};

export default Web23SearchBox;
