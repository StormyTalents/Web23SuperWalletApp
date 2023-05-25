import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {API_SMART_ENDPOINT_URL} from 'config';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import KeySVG from '../../../assets/icons/key.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const VerificationScreen: React.FC<{
  uid?: string;
  email?: string;
  name?: string;
  password?: string;
  web3?: string;
}> = ({uid = '', email = '', name = '', password = '', web3 = ''}) => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const {t} = useTranslation();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Screen loading={loading}>
      <View style={tw`flex justify-between h-full`}>
        <ScreenTitle
          title={t('Enter verification code') || 'Enter verification code'}
          onPress={() => navigation.navigate('CreateSmartScreen')}
        />
        <View style={tw`px-3 flex flex-row justify-center items-center`}>
          <View style={tw`w-full`}>
            <View style={tw`flex flex-row justify-center my-4`}>
              <View
                style={tw`bg-grey-900 w-12 h-12 rounded-2xl flex flex-row items-center justify-center`}>
                <KeySVG />
              </View>
            </View>
            <Text
              style={tw`font-bold text-base text-grey-200 mb-3 text-center`}>
              {t('2-Step Verification')}
            </Text>
            <Text style={tw`font-bold text-sm text-grey-400 mb-6 text-center`}>
              {t('Please enter the 6-digit verification code sent to')}
              {' ' + email || ` <${t('unknown email')}>`}
            </Text>
            <Web23Input
              placeholder={t('Enter code')}
              value={code}
              onChange={e => setCode(e)}
            />
            <Text style={tw`font-bold text-sm text-grey-400 mt-4 text-center`}>
              {t('Didn’t receive the code yet?')}{' '}
              <Text
                style={tw`text-lime-500 underline active:text-green-50`}
                onPress={async () => {
                  await axios.post(`${API_SMART_ENDPOINT_URL}auth`, {
                    displayName: name,
                    email: email,
                    domainName: web3,
                    password: password,
                  });
                }}>
                {t('Resend code')}
              </Text>
            </Text>
          </View>
        </View>

        <View style={tw`pb-8 px-3`}>
          <Web23Button
            text={t('Verify code') || 'Verify code'}
            disabled={code.length === 0}
            onPress={async () => {
              try {
                setLoading(true);
                const {data} = await axios.post(
                  `${API_SMART_ENDPOINT_URL}auth/${uid}/verify`,
                  {
                    email,
                    code,
                  },
                );
                if (data?.message === 'Email Verification Success') {
                  const newData = settings.userData.map(user => {
                    if (user.accountId === settings.selectedUser) {
                      return {...user, smartUid: uid};
                    }
                    return {...user};
                  });
                  saveSettings({...settings, userData: newData});
                  navigation.navigate('ConfirmScreen');
                }
                setLoading(false);
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default VerificationScreen;
