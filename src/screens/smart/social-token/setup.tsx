import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23ComingSoon, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import TokenSMSVG from '../../../assets/icons/token_sm.svg';
import LocalOfferSVG from '../../../assets/icons/local_offer.svg';
import LocalCafeSVG from '../../../assets/icons/local_cafe.svg';
import VideoCamSVG from '../../../assets/icons/videocam_sm.svg';
import SubscriptSVG from '../../../assets/icons/subscriptions.svg';

const SetupSocialTokenScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();

  return (
    <Screen>
      <ScreenTitle
        title="Setup Social tokens"
        onPress={() => navigation.navigate('SmartSetupScreen')}
      />
      <View style={tw`flex flex-row justify-center my-4`}>
        <View
          style={tw`flex flex-row items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-grey-900`}>
          <TokenSMSVG />
        </View>
      </View>
      <Text style={tw`mb-3 text-base font-bold text-center text-grey-200`}>
        {t('What are Social Tokens?')}
      </Text>
      <Text style={tw`mb-4 text-sm font-bold text-center text-grey-400`}>
        {t(
          'Your tokens, once launched can be used by your fans to unlock your content & experiences',
        )}
      </Text>
      <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
        <View
          style={tw`flex flex-row items-center gap-3 px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl`}>
          <View>
            <View
              style={tw`flex flex-row items-center justify-center bg-green-400 rounded-full w-9 h-9`}>
              <LocalOfferSVG fill="#0A0939" />
            </View>
          </View>
          <View>
            <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
              {t('Coupon Giveaways')}
            </Text>
            <Text style={tw`text-sm font-bold text-grey-400`}>
              {t('Giveaway the coupons to purchase your art at a discount')}
            </Text>
          </View>
        </View>
        <View
          style={tw`flex flex-row items-center gap-3 px-3 py-4 active:bg-grey-800 rounded-b-xl`}>
          <View>
            <View
              style={tw`flex flex-row items-center justify-center bg-purple-300 rounded-full w-9 h-9`}>
              <LocalCafeSVG fill="#0A0939" />
            </View>
          </View>
          <View>
            <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
              {t('Let fans Say Thanks')}
            </Text>
            <Text style={tw`text-sm font-bold text-grey-400`}>
              {t('Receive donations from your fans')}
            </Text>
          </View>
        </View>
      </View>
      <View style={tw`mb-8`}>
        <View style={tw`w-[112px]`}>
          <Web23ComingSoon />
        </View>
        <View
          style={tw`mb-6 border border-yellow-600 rounded-tl-none rounded-xl`}>
          <View
            style={tw`flex flex-row items-center gap-3 px-3 py-4 border-b border-yellow-600`}>
            <View>
              <View
                style={tw`flex flex-row items-center justify-center bg-orange-500 rounded-full w-9 h-9`}>
                <VideoCamSVG fill="#0A0939" />
              </View>
            </View>
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {t('10 minute Video Call')}
              </Text>
              <Text style={tw`text-sm font-bold text-grey-400`}>
                {t('Let your fans can setup a 1:1 live video call with you')}
              </Text>
            </View>
          </View>
          <View
            style={tw`flex flex-row items-center gap-3 px-3 py-4 rounded-b-xl`}>
            <View>
              <View
                style={tw`flex flex-row items-center justify-center bg-yellow-500 rounded-full w-9 h-9`}>
                <SubscriptSVG fill="#0A0939" />
              </View>
            </View>
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {t('Subscription to your club')}
              </Text>
              <Text style={tw`text-sm font-bold text-grey-400`}>
                {t('Sell recurring access to your content and experiences')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw`mb-8`}>
        <Web23Button
          text={t('Continue') || 'Continue'}
          variant="secondary"
          onPress={() => navigation.navigate('SocialTokenSetupProcessScreen')}
        />
      </View>
    </Screen>
  );
};

export default SetupSocialTokenScreen;
