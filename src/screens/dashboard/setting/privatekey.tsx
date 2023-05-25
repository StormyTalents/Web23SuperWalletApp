import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {Screen} from 'layouts';

import {ScreenTitle, Web23Input} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import LockSVG from '../../../assets/icons/lock_open.svg';
import ContentCopySVG from '../../../assets/icons/content_copy.svg';
import KeySVG from '../../../assets/icons/key.svg';

const PrivateKeyScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const {settings} = useContext(SettingContext);
  const [value, setValue] = useState<string>('');
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const toast = useToast();

  useEffect(() => {
    if (value === settings.userKeyInfo) {
      setShowPhrase(true);
    }
  }, [value]);

  return (
    <Screen>
      <ScreenTitle
        title={t('Secret Phrase') || 'Secret Phrase'}
        onPress={() => navigation.navigate('SettingScreen')}
      />
      <View style={tw`flex justify-center w-full px-3`}>
        {!showPhrase ? (
          <>
            <View style={tw`mb-6`}>
              <View style={tw`flex flex-row justify-center mt-4`}>
                <View
                  style={tw`flex flex-row items-center justify-center w-12 h-12 mb-4 bg-grey-900 rounded-2xl`}>
                  <LockSVG />
                </View>
              </View>
              <Text
                style={tw`text-base font-bold text-center text-grey-200 px-9`}>
                {t('Enter wallet password to reveal the private key')}
              </Text>
            </View>
            <Web23Input
              placeholder={t('Enter password') || 'Enter password'}
              type="password"
              value={value}
              onChange={e => setValue(e as string)}
            />
          </>
        ) : (
          <>
            <View style={tw`mb-6`}>
              <View style={tw`flex flex-row justify-center mt-4`}>
                <View
                  style={tw`flex flex-row items-center justify-center w-12 h-12 mb-4 bg-grey-900 rounded-2xl`}>
                  <KeySVG />
                </View>
              </View>
              <Text
                style={tw`  text-grey-200 font-bold text-base text-center px-[70px] mb-3`}>
                {t('This is the key to your wallet')}
              </Text>
              <Text style={tw`text-xs font-medium text-center text-grey-400`}>
                {t('Please make sure no one is watching your screen')}
              </Text>
            </View>
            <View
              style={tw`p-4 text-xs font-medium text-white border border-grey-800 rounded-xl bg-grey-900`}>
              <Text>{currentUser.privKey}</Text>
            </View>
            <View style={tw`flex flex-row justify-center px-4 py-1 mt-5`}>
              <TouchableOpacity
                style={tw`flex flex-row gap-2`}
                onPress={() => {
                  Clipboard.setString(currentUser.privKey);
                  toast.show(t('Copied to clipboard') || '');
                }}>
                <Text
                  style={tw`text-base font-bold text-lime-500 active:text-green-500`}>
                  {t('Copy to clipboard')}
                </Text>
                <ContentCopySVG fill="#D7FC51" />
              </TouchableOpacity>
            </View>
            {/* {ToasterBox} */}
          </>
        )}
      </View>
    </Screen>
  );
};

export default PrivateKeyScreen;
