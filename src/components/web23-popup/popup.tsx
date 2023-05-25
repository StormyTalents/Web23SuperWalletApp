import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

import tw from 'utils/tailwind';

import CloseSVG from '../../assets/icons/close.svg';

type IWeb23Popup = {
  title?: string;
  show: boolean;
  setShow: Function;
  children: React.ReactNode;
};

const Web23Popup: React.FC<IWeb23Popup> = ({
  title,
  show = false,
  setShow,
  children,
}) => {
  return (
    <View
      style={{
        ...tw.style(
          'z-10 absolute min-w-full bottom-[100%] justify-end bg-black border border-white border-l-0 border-r-0 border-grey-50 rounded-t-3xl',
          show ? 'bottom-0 flex' : 'hidden bottom-[100%]',
        ),
      }}>
      <View style={tw`flex flex-row justify-center mt-2 mb-3`}>
        <View style={tw`w-12 h-1 rounded-sm bg-grey-700`} />
      </View>
      {title && (
        <View style={tw`pl-4 flex flex-row gap-5 items-center mb-[30px]`}>
          <TouchableOpacity onPress={() => setShow(false)}>
            <CloseSVG />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-white`}>{title}</Text>
        </View>
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`mx-6 max-h-[500px]`}
        style={tw`w-full`}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Web23Popup;
