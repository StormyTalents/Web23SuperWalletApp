import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import MailSVG from '../../../assets/icons/mail.svg';
import TwitterSVG from '../../../assets/icons/TwitterLogo.svg';
import DiscordSVG from '../../../assets/icons/DiscordLogo.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const ContactSupportScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();

  return (
    <Screen>
      <ScreenTitle
        title={t('Contact Support') || 'Contact Support'}
        onPress={() => navigation.navigate('SettingScreen')}
      />
      <View style={tw`w-full px-6 px-3 flex flex-row justify-center w-full`}>
        <View style={tw`w-full mt-4 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b active:bg-grey-800 rounded-t-xl border-grey-800`}
            onPress={() => {
              // window.open('mailto:anthony@web23.io');
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MailSVG />
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {t('Email us')}
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b active:bg-grey-800 border-grey-800`}
            onPress={() => {
              // chrome.tabs.create({url: 'https://web23.io/discord'});
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <DiscordSVG />
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {t('Discord')}
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 active:bg-grey-800 rounded-b-xl`}
            onPress={() => {
              // chrome.tabs.create({
              //   url: 'https://twitter.com/web23io?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
              // });
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <TwitterSVG fill="#3D9EFF" stroke="#3D9EFF" />
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {t('Twitter')}
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default ContactSupportScreen;
