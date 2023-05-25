import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import CompleteSVG from '../../assets/icons/complete.svg';

const SuccessWalletScreen: React.FC = () => {
  const navigation = useWeb23Navigation();

  const {t} = useTranslation();

  return (
    <Screen>
      <View style={tw`flex justify-between h-full`}>
        <ScreenTitle
          title={t('You are all set!') || 'You are all set!'}
          onPress={() => navigation.navigate('WalletPasswordScreen')}
        />
        <View>
          <View style={tw`flex flex-row justify-center w-full mb-4`}>
            <CompleteSVG />
          </View>
          <Text style={tw`mb-3 text-2xl font-bold text-center text-white`}>
            {t('Congratulations!')}
          </Text>
          <Text style={tw`text-base font-medium text-center text-grey-200`}>
            {t('Your Hedera super wallet is ready to go')}
          </Text>
        </View>
        <View style={tw`pb-8`}>
          <Web23Button
            text={t('Let’s see my dashboard') || 'Let’s see my dashboard'}
            onPress={() => navigation.navigate('DashboardWalletScreen')}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SuccessWalletScreen;
