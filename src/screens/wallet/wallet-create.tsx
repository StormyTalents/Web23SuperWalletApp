import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Popup} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import Web23LogoSVG from '../../assets/icons/logo_title.svg';
import GodaddySVG from '../../assets/icons/GoDaddy.svg';
import NameCheapSVG from '../../assets/icons/NameCheap_md.svg';
import DynadotSVG from '../../assets/icons/Dynadot_md.svg';
import Option2SVG from '../../assets/icons/create_wallet_option2.svg';
import Option3SVG from '../../assets/icons/create_wallet_option3.svg';
import MDHBarSVG from '../../assets/icons/hbar_md.svg';
import ReceiveSVG from '../../assets/icons/call_received.svg';
import ArrowDownSVG from '../../assets/icons/arrow-down.svg';

const CreateWalletScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const [showDomainProvider, setShowDomainProvider] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <>
      <Screen>
        <View style={tw`h-full`}>
          <View style={tw`px-2 pt-6 mb-[90px]`}>
            <Web23LogoSVG />
          </View>
          <View style={tw`px-2 pb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-grey-400`}>
              {t('What would you like to do?')}
            </Text>
            <View style={tw`p-4 mb-4 bg-grey-900 rounded-xl`}>
              <View style={tw`flex flex-row justify-between mb-[70px]`}>
                <View>
                  <MDHBarSVG />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CreateMnemonicScreen');
                  }}>
                  <ReceiveSVG />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={tw`mb-2 text-xl font-bold text-lime-500`}>
                  {t('Create / Import a Wallet')}
                </Text>
                <Text style={tw`text-sm font-bold text-grey-200`}>
                  {t(
                    'Create a New Wallet or Import an Existing Wallet on the Hedera Ecosystem',
                  )}
                </Text>
              </View>
            </View>
            <View style={tw`p-4 bg-grey-900 rounded-xl`}>
              <View style={tw`flex flex-row justify-between mb-[70px]`}>
                <View style={tw`flex flex-row gap-2`}>
                  <View>
                    <Option2SVG />
                  </View>
                  <View>
                    <Option3SVG />
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowDomainProvider(true)}>
                  <ReceiveSVG />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={tw`mb-2 text-xl font-bold text-lime-500`}>
                  {t('Create / Manage Domains')}
                </Text>
                <Text style={tw`text-sm font-bold text-grey-200`}>
                  {t(
                    'Manage your Domains on GoDaddy, Namecheap and other providers',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Select Domain Provider') || 'Select Domain Provider'}
        show={showDomainProvider}
        setShow={setShowDomainProvider}>
        <View style={tw`pt-4 pb-8`}>
          <View style={tw`bg-grey-900 rounded-xl`}>
            <Text
              style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
              {t('Supported Providers')}
            </Text>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between border-b border-b-grey-800 active:bg-grey-800 items-center`}
              onPress={() =>
                navigation.navigate('Web2ConfigScreen', {type: 'godaddy'})
              }>
              <View style={tw`flex flex-row items-center gap-2`}>
                <GodaddySVG />
                <Text style={tw`text-base font-bold text-grey-50`}>
                  GoDaddy
                </Text>
              </View>
              <ArrowDownSVG
                fill="#9E9E9E"
                style={{transform: [{rotate: '-90deg'}]}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between border-b border-b-grey-800 active:bg-grey-800 items-center`}
              onPress={() =>
                navigation.navigate('Web2ConfigScreen', {type: 'namecheap'})
              }>
              <View style={tw`flex flex-row items-center gap-2`}>
                <NameCheapSVG />
                <Text style={tw`text-base font-bold text-grey-50`}>
                  Namecheap
                </Text>
              </View>
              <ArrowDownSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between rounded-b-xl active:bg-grey-800 items-center`}
              onPress={() =>
                navigation.navigate('Web2ConfigScreen', {type: 'dynadot'})
              }>
              <View style={tw`flex flex-row items-center gap-2`}>
                <DynadotSVG />
                <Text style={tw`text-base font-bold text-grey-50`}>
                  Dynadot
                </Text>
              </View>
              <ArrowDownSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Web23Popup>
    </>
  );
};

export default CreateWalletScreen;
