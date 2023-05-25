import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, Web23CheckBox, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import LockOpenSVG from '../../assets/icons/lock_open.svg';

const WalletPasswordScreen: React.FC<{route: any}> = ({route}) => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const {t} = useTranslation();
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [error, setError] = useState<{
    password?: string;
    confirm?: string;
    checkbox?: string;
  }>();
  const {back} = route?.params || {back: 'web3'};

  const handleSubmit = () => {
    let errors: {password?: string; confirm?: string; checkbox?: string} = {};
    if (!password) {
      errors.password = 'Required';
    }
    if (password !== confirm) {
      errors.confirm =
        t('Do not match, please confirm and try again') ||
        'Do not match, please confirm and try again';
    }
    if (password.length > 0 && password.length < 12) {
      errors.password =
        t('The Minimum password length is 12') ||
        'The Minimum password length is 12';
    }
    if (Object.keys(errors).length === 0) {
      saveSettings({
        ...settings,
        userKeyInfo: password,
      });

      if (check) {
        if (settings.selectedUser === '') {
          navigation.navigate('CreateMnemonicScreen');
        } else {
          navigation.navigate('SuccessWalletScreen');
        }
      }
    } else {
      setError(errors);
    }
  };

  return (
    <Screen>
      <View style={tw`h-full flex justify-between`}>
        <ScreenTitle
          title={t('Create Password') || 'Create Password'}
          onPress={() => {
            if (back === 'web3') {
              navigation.navigate('CreateMnemonicScreen');
            } else {
              navigation.navigate('Web2ConfigScreen');
            }
          }}
        />
        <View style={tw`mb-5`}>
          <View style={tw`flex flex-row justify-center w-full mb-4`}>
            <View
              style={tw`flex flex-row items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl`}>
              <LockOpenSVG />
            </View>
          </View>
          <Text
            style={tw`px-10 mb-6 text-base font-bold text-center text-grey-200`}>
            {t('Setup a password to unlock your Web23 account')}
          </Text>
          <Web23Input
            id="password"
            placeholder={t('Enter password')}
            type="password"
            value={password}
            onChange={e => setPassword(e)}
          />
          <Text style={tw`pl-4 mb-4 text-xs font-bold text-red-400`}>
            {(error?.password?.length || 0) > 0 && error?.password}
          </Text>
          <Web23Input
            id="confirm"
            placeholder={t('Confirm password')}
            type="password"
            value={confirm}
            onChange={e => setConfirm(e)}
          />
          <Text style={tw`pl-4 mb-4 text-xs font-bold text-red-400`}>
            {(error?.confirm?.length || 0) > 0 && error?.confirm}
          </Text>
          <View style={tw`flex flex-row`}>
            <Web23CheckBox
              checked={check}
              onChange={() => setCheck(prev => !prev)}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`text-sm font-medium text-grey-100`}>
                  {t('I agree with the') + ' '}
                </Text>
                <Text style={tw`text-sm font-medium text-lime-500`}>
                  {t('terms of Conditions')}
                </Text>
              </View>
            </Web23CheckBox>
          </View>
        </View>
        <View style={tw`pb-8`}>
          <Web23Button
            disabled={!password || !confirm || !check}
            text={t('I have securely saved it') || 'I have securely saved it'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Screen>
  );
};

export default WalletPasswordScreen;
