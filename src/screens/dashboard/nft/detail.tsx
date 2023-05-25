import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, ScreenTitle, Web23Scrollbox} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import CircleWavyCheckSVG from '../../../assets/icons/CircleWavyCheck.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const DetailNFTGalleryScreen: React.FC<{
  name: string;
  description: string;
  category: string;
  photo: string;
  token: string;
  attribute: string[];
  collection: string;
  external_link: string;
  alternate_text: string;
}> = ({
  name,
  description,
  category,
  photo,
  token,
  attribute,
  collection,
  external_link,
  alternate_text,
}) => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const {t} = useTranslation();

  return (
    <Screen>
      <ScreenTitle
        title={name}
        onPress={() => navigation.navigate('DashboardNFTScreen')}
      />
      <View style={tw`px-3 h-full flex flex-row justify-center h-auto `}>
        <View style={tw`flex flex-row justify-center mt-2 mb-6`}>
          <View
            style={tw`w-[300px] h-[300px] rounded-xl bg-white flex flex-row items-center justify-center`}>
            <Image
              source={{uri: photo}}
              width="296px"
              height="296px"
              alt={name}
              style={tw`border rounded-xl`}
            />
          </View>
        </View>
        <View style={tw`px-3`}>
          <Web23Button
            text={t('Send') || 'Send'}
            onPress={() =>
              navigation.navigate('SendNFTScreen', {
                name,
                description,
                category,
                photo,
                token,
                attribute,
                collection,
                external_link,
                alternate_text,
              })
            }
          />
          <View
            style={tw`flex flex-row items-stretch py-3 my-6 border justify-evenly rounded-xl border-grey-800`}>
            <View>
              <Text
                style={tw`mb-1 text-xs font-bold text-center text-grey-400`}>
                {t('Last Sale Price')}
              </Text>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MDHBarSVG />
                <Text style={tw`  text-xl font-bold text-white`}>1,321.79</Text>
              </View>
            </View>
            <View style={tw`flex flex-row `}>
              <View style={tw`w-[1px] h-full border-r-[1px] border-grey-800`} />
            </View>
            <View>
              <Text
                style={tw`mb-1 text-xs font-bold text-center text-grey-400`}>
                {t('Floor Value')}
              </Text>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MDHBarSVG />
                <Text style={tw`  text-xl font-bold text-white`}>1,100.00</Text>
              </View>
            </View>
          </View>
          <View
            style={tw`flex flex-row justify-between mb-2 text-sm font-bold text-grey-400`}>
            <Text>{t('Category')}</Text>
            <Text>{t('Collection')}</Text>
          </View>
          <View
            style={tw`flex flex-row justify-between mb-6 text-base font-medium text-white`}>
            <Text>{name}</Text>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text>{collection}</Text>
              <CircleWavyCheckSVG />
            </View>
          </View>
          <Text style={tw`mb-1 text-sm font-bold text-grey-400`}>
            {t('Description')}
          </Text>
          <Text style={tw`mb-1 text-base font-medium text-white`}>
            {description}
          </Text>
          <Text
            style={tw`mb-6 text-sm font-bold   text-lime-500 active:text-green-500`}>
            {t('Read more')}
          </Text>
          <Text style={tw`mb-1 text-sm font-bold text-grey-400`}>
            {t('Attributes')}
          </Text>
          {attribute ? (
            <Web23Scrollbox>
              {attribute.map((item: any, id) => (
                <View key={id + item.name}>
                  <View
                    style={tw`p-3 rounded-[4px] border border-[rgb(255,_255,_255,_0.32)]`}>
                    <Text style={tw`mb-1 text-xs font-bold text-grey-400`}>
                      {item.name}
                    </Text>
                    <Text
                      style={tw`text-base font-medium text-white whitespace-nowrap`}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              ))}
            </Web23Scrollbox>
          ) : (
            <View style={tw`p-3 border border-white border-opacity-30`}>
              <Text
                style={tw`font-bold text-base text-grey-50 text-center mb-2`}>
                {t('Not added yet')}
              </Text>
              <Text
                style={tw`font-bold text-xs text-grey-600 text-center px-10`}>
                {t('Add attributes and their respective percentages')}
              </Text>
            </View>
          )}
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 mt-6 mb-8 border rounded-xl border-grey-800`}>
            <Text style={tw`text-sm font-bold text-grey-200`}>
              {t('Activity')}
            </Text>
            <ArrowDownSVG style={tw`rotate-180`} fill="#9e9e9e" />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default DetailNFTGalleryScreen;
