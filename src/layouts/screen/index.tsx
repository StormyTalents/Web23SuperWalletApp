import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {Web23Spinner} from 'components';

import tw from 'utils/tailwind';

type IScreen = {
  loading?: boolean;
  children: React.ReactNode;
};

const Screen: React.FC<IScreen> = ({loading, children}) => {
  return (
    <SafeAreaView style={tw`w-full h-full bg-black`}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`min-h-full`}
        style={tw`relative w-full h-full bg-black`}>
        {children}
        {loading && <Web23Spinner loading={loading} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
