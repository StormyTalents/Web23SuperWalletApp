import React from 'react';
import {View, Text} from 'react-native';

import {Screen} from 'layouts';

import {Web23Input, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import MoreSVG from '../../../assets/icons/more_horiz.svg';
import FavoriteSVG from '../../../assets/icons/favorite_fill.svg';
import FavoriteBroderSVG from '../../../assets/icons/favorite_border.svg';

const CommentScreen: React.FC<{route: any}> = ({route}) => {
  const {
    backMode = 'normal',
    img = '',
    tokenId = '',
    name = '',
    description = '',
    category = '',
    attribute = '',
    external_link = '',
    collection = '',
    alternate_text = '',
  } = route.params;
  const navigation = useWeb23Navigation();

  return (
    <Screen>
      <ScreenTitle
        title="Comments  432"
        onPress={() => {
          if (backMode === 'desktop')
            navigation.navigate('DetailPostViewDesktopScreen', {
              img,
              tokenId,
              name,
              description,
              category,
              attribute,
              external_link,
              collection,
              alternate_text,
            });
          else
            navigation.navigate('DetailPostViewScreen', {
              img,
              tokenId,
              name,
              description,
              category,
              attribute,
              external_link,
              collection,
              alternate_text,
            });
        }}
      />
      <View style={tw`bg-grey-900 h-full flex flex-col justify-between`}>
        <View>
          <View
            style={tw`px-6 py-[10px] flex flex-row items-center gap-3 border-b border-grey-800`}>
            <View style={tw`w-10 h-10 bg-grey-200`} />
            <View style={tw`py-[2px] font-bold`}>
              <Text style={tw`pb-[2px] text-grey-50 font-base`}>
                Guardians of the Gwa’ol #3201
              </Text>
              <Text style={tw`text-xs text-grey-400`}>dilipmerugu.hbar</Text>
            </View>
          </View>
          <View style={tw`px-6 py-4 max-h-[384px]  `}>
            <View style={tw`flex flex-row gap-2`}>
              <View>
                <View style={tw`w-10 h-10 rounded-full bg-grey-200`} />
              </View>
              <View>
                <Text style={tw`font-bold text-base text-grey-200 mb-1`}>
                  dilipmerugu
                </Text>
                <Text style={tw`w-[232px] font-medium text-sm text-white mb-2`}>
                  great work Vishnu. Looking forward to a purchase. This is
                  perfect collection that i wanted to own
                </Text>
                <View style={tw`flex flex-row gap-3 items-center`}>
                  <Text style={tw`font-medium text-xs text-grey-400`}>
                    2 days ago
                  </Text>
                  <Text style={tw`text-xs font-medium text-white`}>
                    4 likes
                  </Text>
                  <Text style={tw`text-xs font-bold text-white`}>Reply</Text>
                </View>
              </View>
              <View style={tw`flex flex-col gap-2`}>
                <View>
                  <MoreSVG fill="#B8B8B8" />
                </View>
                <View>
                  <FavoriteSVG />
                </View>
              </View>
            </View>
            <View style={tw`flex flex-row gap-2 mt-6`}>
              <View>
                <View style={tw`w-10 h-10 rounded-full bg-grey-200`} />
              </View>
              <View>
                <Text style={tw`font-bold text-base text-grey-200 mb-1`}>
                  ursula
                </Text>
                <Text style={tw`w-[232px] font-medium text-sm text-white mb-2`}>
                  Amazing work. This clearly gave me that experience of
                  wandering in the universe. thank you
                </Text>
                <View style={tw`flex flex-row gap-3 items-center`}>
                  <Text style={tw`font-medium text-xs text-grey-400`}>
                    2 hrs
                  </Text>
                  <Text style={tw`text-xs font-medium text-white`}>
                    1 likes
                  </Text>
                  <Text style={tw`text-xs font-bold text-white`}>Reply</Text>
                </View>
              </View>
              <View style={tw`flex flex-col gap-2`}>
                <View>
                  <MoreSVG fill="#B8B8B8" />
                </View>
                <View>
                  <FavoriteBroderSVG />
                </View>
              </View>
            </View>
            <View style={tw`flex flex-row justify-center mt-2`}>
              <View style={tw`w-[232px]`}>
                <Text style={tw`text-grey-400 text-xs font-bold mb-2`}>
                  ---- Hide replies
                </Text>
                <View style={tw`flex flex-row gap-2 justify-center`}>
                  <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
                  <View>
                    <View style={tw`w-[143px]`}>
                      <Text style={tw`font-bold text-base text-grey-100 mb-1`}>
                        malevolent
                      </Text>
                      <Text style={tw`text-white font-medium text-sm`}>
                        Amazing work. This clearly gave me that experience of
                        wandering in the universe. thank you
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={tw`px-6 py-3 flex flex-row gap-4 items-center border-t border-grey-800`}>
          <View style={tw`w-10 h-10 rounded-full bg-grey-200`} />
          <Web23Input placeholder="Add a comment..." />
        </View>
      </View>
    </Screen>
  );
};

export default CommentScreen;
