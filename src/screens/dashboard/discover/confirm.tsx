import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {ScreenTitle, Web23Button} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import ArrowBackSVG from '../../../assets/icons/arrow_back.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';
import CheckSVG from '../../../assets/icons/check.svg';

const ConfirmScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();

  return (
    <Screen>
      <View style={tw`flex justify-between h-full`}>
        <ScreenTitle
          title={t('You are all set!') || 'You are all set!'}
          onPress={() => navigation.navigate('CreateSmartScreen')}
        />
        <View style={tw`px-3 flex flex-row justify-center items-center`}>
          <View style={tw`w-full`}>
            <View style={tw`flex flex-row justify-center w-full mb-4`}>
              <CompleteSVG />
            </View>
            <Text style={tw`mb-3 text-2xl font-bold text-center text-white`}>
              {t('Congratulations!')}
            </Text>
            <Text style={tw`mb-6 text-base font-medium text-center text-white`}>
              {t('You can now setup your smart page')}
            </Text>
            <View style={tw`flex flex-row justify-center`}>
              <View style={tw`flex gap-3`}>
                <View style={tw`flex flex-row gap-1`}>
                  <CheckSVG fill="#29741B" />
                  <Text style={tw`font-medium text-sm text-grey-200 w-[274px]`}>
                    {t('Post NFTs, photos, videos, articles & more')}
                  </Text>
                </View>
                <View style={tw`flex flex-row gap-1`}>
                  <CheckSVG fill="#29741B" />
                  <Text style={tw`font-medium text-sm text-grey-200 w-[274px]`}>
                    {t(
                      'Build a dedicated community and reward your best followers with unique social coins',
                    )}
                  </Text>
                </View>
                <View style={tw`flex flex-row gap-1`}>
                  <CheckSVG fill="#29741B" />
                  <Text style={tw`font-medium text-sm text-grey-200 w-[274px]`}>
                    {t(
                      'Monentize your artwork and content on the go and get paid to your web2 wallet',
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`pb-8`}>
          <Web23Button
            text={t('Continue to my Smart page') || 'Continue to my Smart page'}
            onPress={() => {
              navigation.navigate('SmartSetupScreen');
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ConfirmScreen;
