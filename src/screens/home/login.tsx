import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23Input} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import DomainSVG from '../../assets/icons/Domains_big.svg';
import LogoSVG from '../../assets/icons/logo-yellow.svg';

const LoginScreen: React.FC = () => {
  const {settings} = useContext(SettingContext);
  const navigation = useWeb23Navigation();
  const [password, setPassword] = useState<string>('');
  const {t} = useTranslation();

  const handleLogin = () => {
    if (settings.userKeyInfo === password) {
      navigation.navigate('DashboardWalletScreen');
    }
  };

  return (
    <Screen>
      <View style={tw`h-full flex justify-between`}>
        <View>
          <View style={tw`flex flex-row justify-center w-full my-3`}>
            <LogoSVG />
          </View>
          <View style={tw`my-4 flex flex-row justify-center`}>
            <DomainSVG />
          </View>
          <Text
            style={tw`text-white font-bold text-[20px] leading-7 text-center mb-2`}>
            {t('Welcome back')}
          </Text>
          <Text style={tw`mb-4 text-sm font-bold text-center text-grey-400`}>
            {t('Manage all your domains from one wallet')}
          </Text>
          <Web23Input
            placeholder={t('Enter password')}
            type="password"
            value={password}
            onChange={e => setPassword(e)}
          />
        </View>
        <View style={tw`pb-8`}>
          <Web23Button text={t('Unlock') || 'Unlock'} onPress={handleLogin} />
          <Text
            style={tw`text-lime-500 text-sm text-center underline font-bold mt-5  `}>
            {t('Forgot Password?')}
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;
