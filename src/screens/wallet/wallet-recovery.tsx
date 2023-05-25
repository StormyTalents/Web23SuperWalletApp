import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23TextArea, Web23Popup, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

import KeySVG from '../../assets/icons/key.svg';
import ArrowDownSVG from '../../assets/icons/arrow-down.svg';
import CircleCheckSVG from '../../assets/icons/check_circle.svg';

const RecoveryWalletScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const [showNet, setShowNet] = useState<boolean>(false);
  const [net, setNet] = useState<boolean>(true);
  const {t} = useTranslation();

  const handleProceed = async () => {
    try {
      setLoading(true);

      const data = await apiHandler('info_from_seed', '', {seed: value});

      let newAccountPrivateKey = data.priv;
      let newAccountPublicKey = data.pub;
      let words = data.words;

      const {token, accountId} = await apiHandler('recover_account', '', {
        privKey: newAccountPrivateKey,
        pubKey: newAccountPublicKey,
        mnemonicWord: words,
        net: net,
      });

      Alert.alert(token);

      if (!settings.userData?.find(item => item.accountId === accountId)) {
        const newUser = [
          ...(settings?.userData?.length ? settings?.userData : []),
        ];

        newUser.push({
          privKey: newAccountPrivateKey,
          pubKey: newAccountPublicKey,
          mnemonic: words || [],
          accountId,
          token,
          userName: 'Wallet Recovery',
          themeColor: 'lime',
          type: 'initial',
          net: net,
          currency: {label: 'USD', symbol: '$'},
          contacts: [{userName: '', accountId: '', type: 'initial'}],
        });

        saveSettings({
          ...settings,
          userData: newUser,
          selectedUser: accountId,
        });
      }

      setLoading(false);
      if (!settings.userKeyInfo) {
        navigation.navigate('WalletPasswordScreen');
      } else {
        navigation.navigate('SuccessWalletScreen');
      }
    } catch (e: any) {
      setLoading(false);
      setValue('');
    }
  };

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`flex justify-between h-full`}>
          <View>
            <ScreenTitle
              title={t('Secret Phrase') || 'Secret Phrase'}
              onPress={() => {
                navigation.navigate('CreateWalletScreen');
              }}
            />
            <View style={tw`pt-10 flex flex-row justify-center w-full mb-4`}>
              <View
                style={tw`flex flex-row items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl`}>
                <KeySVG />
              </View>
            </View>

            <Text
              style={tw`text-grey-200 font-bold text-sm text-center mb-6 px-[40px]`}>
              {t(
                'Enter 12, 24 word secret recovery phrase or private key to import your existing wallet',
              )}
            </Text>

            <Web23TextArea
              value={value}
              placeholder={
                t('Enter Secret Phrase or Private Key') ||
                'Enter Secret Phrase or Private Key'
              }
              onChange={e => {
                setValue(e);
              }}
              rows={3}
            />
          </View>
          <View style={tw`pb-8`}>
            <Web23Button
              text={t('Proceed') || 'Proceed'}
              disabled={value ? false : true}
              onPress={handleProceed}
            />
          </View>
        </View>
        <TouchableOpacity
          style={tw`bg-grey-800 rounded-[100px] px-3 py-2 flex flex-row gap-2 items-center absolute top-[64px] right-2 active:bg-grey-700 hover:bg-grey-700  `}
          onPress={() => setShowNet(true)}>
          <Text style={tw`text-base font-bold text-white`}>
            {net ? 'Mainnet' : 'Testnet'}
          </Text>
          <ArrowDownSVG fill="#9E9E9E" />
        </TouchableOpacity>
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
                <Text style={tw`text-base text-grey-50 mb-[2px]`}>Mainnet</Text>
                <Text style={tw`text-xs text-grey-400`}>
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
              <Text style={tw`text-base text-grey-50 mb-[2px]`}>Testnet</Text>
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

export default RecoveryWalletScreen;
