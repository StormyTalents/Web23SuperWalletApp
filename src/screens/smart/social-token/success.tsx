import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import CompleteSVG from '../../../assets/icons/complete.svg';

const SuccessSocialTokenSetupScreen: React.FC<{route: any}> = ({route}) => {
  const {tokenName = '', supply = '', value = '', name = ''} = route.params;
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const {settings, saveSettings} = useContext(SettingContext);

  return (
    <Screen>
      <View style={tw`flex justify-between h-full`}>
        <View>
          <ScreenTitle
            title={t('You are all set!') || 'You are all set!'}
            onPress={() => navigation.navigate('SocialTokenSetupProcessScreen')}
          />
          <View style={tw`flex flex-row justify-center mt-2 mb-6`}>
            <CompleteSVG />
          </View>
          <Text style={tw`mb-3 text-2xl font-bold text-center text-white`}>
            {t('Congratulations!')}
          </Text>
          <Text style={tw`mb-6 text-sm font-bold text-center text-grey-400`}>
            {t(
              'You have launched your unique token. You can find the following token card on your smart page dashboard.',
            )}
          </Text>
          <View
            style={tw`relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl`}>
            <View style={tw`flex flex-row items-end justify-between mb-2`}>
              <Text style={tw`text-sm font-bold text-white opacity-70`}>
                {tokenName}
              </Text>
              <View>
                <Image
                  source={require('../../../assets/png/perks.png')}
                  alt="perks"
                />
              </View>
            </View>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View>
                <Text style={tw`font-black text-white text-[48px]`}>
                  {supply}
                </Text>
                <Text style={tw`mb-4 text-base font-bold text-white`}>
                  {t('Tokens')}
                </Text>
                <Text style={tw`text-xs font-bold text-white opacity-50`}>
                  {t('Per token') + ': $'}
                  {value}
                </Text>
              </View>
              <Text
                style={tw`text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]`}>
                {name}
              </Text>
            </View>
            <Text
              style={tw`absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]`}>
              {tokenName}
            </Text>
          </View>
        </View>
        <View style={tw`pb-8`}>
          <Web23Button
            text={t('Go to Dashboard!') || 'Go to Dashboard!'}
            onPress={() => {
              saveSettings({
                ...settings,
                userData: settings.userData.map(user => {
                  if (user.accountId === settings.selectedUser)
                    return {...user, smart: true};
                  else return user;
                }),
              });
              navigation.navigate('SmartSetupScreen', {initialTab: 2});
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SuccessSocialTokenSetupScreen;
