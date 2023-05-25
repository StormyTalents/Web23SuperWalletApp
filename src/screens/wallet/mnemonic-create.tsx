import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
// import Clipboard from '@react-native-community/clipboard';

import {Screen} from 'layouts';

import {Web23Button, MnemonicBox, Web23Popup, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

import type {UserData} from 'utils/context';

import {API_ENDPOINT_URL} from 'config';

import KeySVG from '../../assets/icons/key.svg';
import ContentCopySVG from '../../assets/icons/content_copy.svg';
import ArrowDownSVG from '../../assets/icons/arrow-down.svg';
import CircleCheckSVG from '../../assets/icons/check_circle.svg';

type IWalletInfo = {
  mnemonic24: string[];
  mnemonic12: string[];
  priv24: string;
  priv12: string;
  pub24: string;
  pub12: string;
};

const CreateMnemonicScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [loading, setLoading] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const [net, setNet] = useState<boolean>(true);
  const [showNet, setShowNet] = useState<boolean>(false);
  const [extendMode, setExtendMode] = useState<boolean>(false);
  const {t} = useTranslation();
  const [walletInfo, setWalletInfo] = useState<IWalletInfo>();
  const toast = useToast();

  const getWalletInfo = async () => {
    const data = await axios.post(API_ENDPOINT_URL + 'create_info');
    setWalletInfo(data.data);
  };

  useEffect(() => {
    getWalletInfo();
  }, []);

  const createMnemonic = async () => {
    if ((walletInfo?.priv12?.length || 0) > 0) {
      let newUser = [...(settings?.userData?.length ? settings?.userData : [])];
      if (!settings?.userData![0]?.accountId) {
        newUser = [
          {
            privKey: extendMode
              ? walletInfo?.priv24 || ''
              : walletInfo?.priv12 || '',
            pubKey: extendMode
              ? walletInfo?.pub24 || ''
              : walletInfo?.pub12 || '',
            mnemonic: extendMode
              ? walletInfo?.mnemonic24 || []
              : walletInfo?.mnemonic12 || [],
            userName: 'Wallet',
            token: '',
            accountId: '',
            themeColor: 'lime',
            type: 'initial',
            currency: {label: 'USD', symbol: '$'},
            net: net,
            contacts: [{userName: '', accountId: '', type: 'initial'}],
          },
        ];
        saveSettings({...settings, userData: newUser});
      } else {
        if (
          settings?.userData[settings?.userData.length - 1].accountId !== ''
        ) {
          newUser.push({
            privKey: extendMode
              ? walletInfo?.priv24 || ''
              : walletInfo?.priv12 || '',
            pubKey: extendMode
              ? walletInfo?.pub24 || ''
              : walletInfo?.pub12 || '',
            mnemonic: extendMode
              ? walletInfo?.mnemonic24 || []
              : walletInfo?.mnemonic12 || [],
            userName: 'Wallet',
            accountId: '',
            themeColor: 'lime',
            type: 'initial',
            net: net,
            token: '',
            currency: {label: 'USD', symbol: '$'},
            contacts: [{userName: '', accountId: '', type: 'initial'}],
          });
        } else {
          newUser.pop();
          newUser.push({
            privKey: extendMode
              ? walletInfo?.priv24 || ''
              : walletInfo?.priv12 || '',
            pubKey: extendMode
              ? walletInfo?.pub24 || ''
              : walletInfo?.pub12 || '',
            mnemonic: extendMode
              ? walletInfo?.mnemonic24 || []
              : walletInfo?.mnemonic12 || [],
            userName: 'Wallet',
            accountId: '',
            themeColor: 'lime',
            type: 'initial',
            net: net,
            token: '',
            currency: {label: 'USD', symbol: '$'},
            contacts: [{userName: '', accountId: '', type: 'initial'}],
          });
        }
        saveSettings({...settings, userData: newUser});
      }
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const {token, accountId} = await apiHandler('new_account', '', {
        privKey:
          settings.userData![(settings.userData?.length || 1) - 1].privKey,
        pubKey: settings.userData![(settings.userData?.length || 1) - 1].pubKey,
        mnemonicWord:
          settings.userData![
            (settings.userData?.length || 1) - 1
          ].mnemonic?.join(','),
        net: net,
      });

      const newUser = [
        ...(settings?.userData?.length ? settings?.userData : []),
      ];

      saveSettings({
        ...settings,
        userData: newUser.map((item, index) => {
          const res: UserData = item;

          if (index === (settings.userData?.length || 1) - 1) {
            res.accountId = accountId;
            res.token = token;
            res.userName =
              'Wallet ' + (settings?.userData?.length || 1 - 1).toString();
            res.themeColor = 'lime';
            res.type = 'initial';
            res.net = net;
          }
          return res;
        }),
        selectedUser: accountId,
      });

      setLoading(false);

      if (settings.userKeyInfo) {
        navigation.navigate('SuccessWalletScreen');
      } else {
        navigation.navigate('WalletPasswordScreen');
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    createMnemonic();
  }, [walletInfo, extendMode]);

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`relative flex justify-between h-full`}>
          <ScreenTitle
            title={t('Secret Phrase') || 'Secret Phrase'}
            onPress={() => {
              navigation.navigate('CreateWalletScreen');
            }}
          />
          <View>
            <View style={tw`flex flex-row justify-center w-full mb-4`}>
              <View
                style={tw`flex flex-row items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl`}>
                <KeySVG />
              </View>
            </View>
            <Text
              style={tw`text-grey-200 font-bold text-base text-center mb-3 px-[70px]`}>
              {t('These words are the keys to your wallet')}
            </Text>
            <Text style={tw`mb-6 text-xs text-center text-grey-200`}>
              {t('Please write them down or store it somewhere safe.')}
            </Text>
            <View style={tw`w-full h-[210px]`}>
              <MnemonicBox
                phrase={
                  settings?.userData![(settings.userData?.length || 1) - 1]
                    .mnemonic
                }
                extendMode={extendMode}
                setExtendMode={setExtendMode}
              />
            </View>
            <View
              style={tw`flex flex-row justify-center px-4 py-1 mt-3 mb-[32px]`}>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-2 active:text-green-500`}
                onPress={() => {
                  // Clipboard.setString(
                  //   settings?.userData![(settings.userData?.length || 1) - 1]
                  //     .mnemonic?.length
                  //     ? settings?.userData![
                  //         (settings.userData?.length || 1) - 1
                  //       ].mnemonic?.join(' ') || ''
                  //     : '',
                  // );
                  toast.show(t('Copied secret phrase') || '');
                }}>
                <Text style={tw`text-base font-bold text-lime-500`}>
                  {t('Copy to clipboard')}
                </Text>
                <ContentCopySVG fill="#D7FC51" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mb-8`}>
            <Web23Button
              text={t('I have securely saved it') || 'I have securely saved it'}
              onPress={handleRegister}
              disabled={loading}
            />
          </View>
          <TouchableOpacity
            style={tw`bg-grey-800 rounded-[100px] px-3 py-2 flex flex-row gap-2 items-center absolute top-8 right-1 active:bg-grey-700  `}
            onPress={() => setShowNet(true)}>
            <Text style={tw`text-base font-bold text-white`}>
              {net ? 'Mainnet' : 'Testnet'}
            </Text>
            <ArrowDownSVG fill="#9E9E9E" />
          </TouchableOpacity>
        </View>
      </Screen>
      <Web23Popup
        title={t('Network') || 'Network'}
        show={showNet}
        setShow={setShowNet}>
        <View style={tw`mb-8 rounded-xl bg-grey-900`}>
          <TouchableOpacity
            style={tw`py-[10px] border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl`}
            onPress={() => {
              setTimeout(() => {
                setNet(true);
                setShowNet(false);
              }, 300);
            }}>
            <View
              style={tw`flex flex-row items-center justify-between px-3 pr-6`}>
              <View style={tw`py-1 font-bold`}>
                <Text style={tw`flex text-base text-grey-50 mb-[2px]`}>
                  Mainnet
                </Text>
                <Text style={tw`flex text-xs text-grey-400`}>
                  {t('All your real transactions here')}
                </Text>
              </View>
              {net && <CircleCheckSVG fill="#D7FC51" />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`py-[10px] px-3 pr-6 flex flex-row justify-between items-center active:bg-grey-800 rounded-b-xl`}
            onPress={() => {
              setTimeout(() => {
                setNet(false);
                setShowNet(false);
              }, 300);
            }}>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`  text-base text-grey-50 mb-[2px]`}>Testnet</Text>
              <Text style={tw`text-xs text-grey-400`}>
                {t('Used for testing only')}
              </Text>
            </View>
            {!net && <CircleCheckSVG fill="#D7FC51" />}
          </TouchableOpacity>
        </View>
      </Web23Popup>
    </>
  );
};

export default CreateMnemonicScreen;
