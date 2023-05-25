import React from 'react';
import {View, Text} from 'react-native';

import tw from 'utils/tailwind';

const Web23DomainTicker: React.FC = () => {
  return (
    <View style={tw`flex gap-2`}>
      <View style={tw`flex flex-row overflow-hidden`}>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#52A876]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .ca
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#6E70E0]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .fyi
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#389AC1]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .bio
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#D0375A]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .live
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#CD8C06]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .com
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#5185EA]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .bio
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#D35036]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .in
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row overflow-hidden`}>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#2D6CDD]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .fyi
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#87B24C]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .art
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#A63CDC]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .info
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#E75F59]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .bar
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#2BBAA9]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .tv
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#B14863]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .ai
          </Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mr-2 rounded-full bg-[#5753DD]`}>
          <Text style={tw`text-base font-medium text-center text-white`}>
            .link
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Web23DomainTicker;
