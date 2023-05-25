import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {ScreenTitle, Web23Button, Web23Input} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import tw from 'utils/tailwind';

import GodaddySVG from '../../assets/icons/GoDaddy.svg';
import NameCheapSVG from '../../assets/icons/NameCheap_md.svg';
import DynadotSVG from '../../assets/icons/Dynadot_md.svg';

const Web2ConfigScreen: React.FC<{route: any}> = ({route}) => {
  const navigation = useWeb23Navigation();
  const [secret, setSecret] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const {settings, saveSettings} = useContext(SettingContext);
  const {t} = useTranslation();
  const {type} = route.params;
  return (
    <Screen>
      <View style={tw`flex justify-between h-full`}>
        <View>
          <ScreenTitle
            title={
              type === 'godaddy'
                ? t('Continue using') + ' GoDaddy'
                : type === 'namecheap'
                ? t('Continue using') + ' Namecheap'
                : type === 'dynadot'
                ? t('Continue using') + ' Dynadot'
                : t('Continue using') + ' GoDaddy'
            }
            onPress={() => navigation.navigate('CreateWalletScreen')}
          />
          <View style={tw`flex flex-row justify-center my-4`}>
            {type === 'godaddy' && <GodaddySVG />}
            {type === 'namecheap' && <NameCheapSVG />}
            {type === 'dynadot' && <DynadotSVG />}
          </View>
          <Text style={tw`mb-3 text-base font-bold text-center text-grey-200`}>
            {t('Copy the Keys to proceed')}
          </Text>
          <Text style={tw`mb-6 text-xs font-medium text-center text-grey-400`}>
            {t(
              'To finish connecting your account, please click on “Copy and Continue” button.',
            )}
          </Text>
          <View style={tw`mb-3`}>
            <Web23Input
              placeholder={t('Key')}
              type="password"
              value={keyword}
              onChange={e => setKeyword(e)}
            />
          </View>
          <View style={tw`mb-3`}>
            <Web23Input
              placeholder={t('Secret')}
              type="password"
              value={secret}
              onChange={e => setSecret(e)}
            />
          </View>
        </View>
        <View style={tw`pb-8`}>
          <Web23Button
            text={t('Copy and Continue') || 'Copy and Continue'}
            onPress={() => {
              if (keyword.length > 0 && secret.length > 0) {
                saveSettings({
                  ...settings,
                  godaddyInfo: {gkey: keyword, gsecret: secret},
                });
                if (settings.userKeyInfo.length > 0) {
                  if (settings.selectedUser === '') {
                    navigation.navigate('CreateMnemonicScreen');
                  } else {
                    navigation.navigate('SuccessWalletScreen');
                  }
                } else {
                  navigation.navigate('WalletPasswordScreen', {back: 'web2'});
                }
              }
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default Web2ConfigScreen;
