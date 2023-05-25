import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {
  Web23Popup,
  Web23SearchBox,
  Web23ComingSoon,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import LaunchSVG from '../../../assets/icons/launch.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import TranslateSVG from '../../../assets/icons/translate.svg';
import EuroSVG from '../../../assets/icons/euro.svg';
import PublicSVG from '../../../assets/icons/public.svg';
import DarkSVG from '../../../assets/icons/dark_mode.svg';
import KeySVG from '../../../assets/icons/golden_key.svg';
import LockSVG from '../../../assets/icons/lock.svg';
import GPPSVG from '../../../assets/icons/gpp_good.svg';
import SupportSVG from '../../../assets/icons/support.svg';
import USDSVG from '../../../assets/icons/setting_attach_money.svg';
import CheckCircleSVG from '../../../assets/icons/check_circle.svg';
import PoundSVG from '../../../assets/icons/currency_pound.svg';
import RupeeSVG from '../../../assets/icons/currency_rupee.svg';
import AusUSDSVG from '../../../assets/icons/attach_money_aus.svg';
import CANDSVG from '../../../assets/icons/attach_money_can.svg';
import ChinaYuanSVG from '../../../assets/icons/currency_yuan.svg';
import SecurityUpdateSVG from '../../../assets/icons/system_security_update_good.svg';
import LightModeSVG from '../../../assets/icons/light_mode.svg';
import DarkModeSVG from '../../../assets/icons/dark_mode_grey.svg';
import LinkSVG from '../../../assets/icons/link.svg';
import NoteAddSVG from '../../../assets/icons/note_add.svg';
import UpdateSMSVG from '../../../assets/icons/update_sm.svg';

const currency = [
  {
    icon: <USDSVG />,
    text: 'United States Dollar',
    value: 'USD',
    symbol: '$',
  },
  {
    icon: <EuroSVG />,
    text: 'Euro',
    value: 'EUR',
    symbol: '€',
  },
  {
    icon: <PoundSVG />,
    text: 'British Pound',
    value: 'GBP',
    symbol: '£',
  },
  {
    icon: <RupeeSVG />,
    text: 'Indian Rupee',
    value: 'INR',
    symbol: '₹',
  },
  {
    icon: <AusUSDSVG />,
    text: 'Australia Dollar',
    value: 'AUD',
    symbol: '$',
  },
  {
    icon: <CANDSVG />,
    text: 'Canada Dollar',
    value: 'CAD',
    symbol: '$',
  },
  {
    icon: <ChinaYuanSVG />,
    text: 'Chinese Yuan',
    value: 'CNY',
    symbol: '¥',
  },
  {
    icon: <PoundSVG />,
    text: 'Turkish Lira',
    value: 'TRY',
    symbol: '₺',
  },
];

const languageArray = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: 'Español',
    value: 'es',
  },
  {
    title: 'Italiano',
    value: 'italian',
  },
  {
    title: 'Polski',
    value: 'polish',
  },
  {
    title: 'Deutsch',
    value: 'de',
  },
  {
    title: 'Français',
    value: 'french',
  },
  {
    title: 'हिंदी',
    value: 'hindi',
  },
  {
    title: 'عربي',
    value: 'arabic',
  },
  {
    title: 'Mandarin',
    value: 'mandarin',
  },
  {
    title: '日本',
    value: 'jp',
  },
];

const SettingScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showTheme, setShowTheme] = useState<boolean>(false);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const {t, i18n} = useTranslation();

  return (
    <>
      <Screen>
        <ScreenTitle
          title="Settings"
          onPress={() => navigation.navigate('DashboardWalletScreen')}
        />
        <View style={tw`px-3 flex justify-center w-full`}>
          <View style={tw`mb-6 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`  px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold`}>
              {t('General')}
            </Text>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() =>
                navigation.navigate('DashboardWalletScreen', {extended: true})
              }>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <Text style={tw`  text-base font-bold text-grey-50`}>
                  {t('Expand View')}
                </Text>
                <LaunchSVG />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700 rounded-b-xl`}
              onPress={() => navigation.navigate('ManageContactScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Manage Contacts')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`mb-6 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`  px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold`}>
              {t('Preferences')}
            </Text>
            <View>
              <TouchableOpacity
                style={tw`active:bg-grey-700`}
                onPress={() => setShowNetType(true)}>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <PublicSVG />
                    <Text style={tw`  text-base font-bold text-grey-50`}>
                      {t('Network')}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Text style={tw`  text-sm font-bold text-grey-50`}>
                      {currentUser.net ? 'Main net' : 'Test net'}
                    </Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9E9E9E"
                    />
                  </View>
                </View>
                <View style={tw`border-grey-800 border-b-[1px]`} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`active:bg-grey-700`}
                onPress={() => setShowLanguage(true)}>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <TranslateSVG />
                    <Text style={tw`  text-base font-bold text-grey-50`}>
                      {t('Language')}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Text style={tw`  text-sm font-bold text-grey-50`}>
                      {
                        languageArray.find(
                          item => item.value === settings.language,
                        )?.title
                      }
                    </Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9E9E9E"
                    />
                  </View>
                </View>
                <View style={tw`border-grey-800 border-b-[1px]`} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`active:bg-grey-700`}
                onPress={() => setShowCurrency(true)}>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <EuroSVG />
                    <Text style={tw`  text-base font-bold text-grey-50`}>
                      {t('Currency')}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Text style={tw`  text-sm font-bold text-grey-50`}>
                      {currentUser.currency.label}
                    </Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9E9E9E"
                    />
                  </View>
                </View>
                <View style={tw`border-grey-800 border-b-[1px]`} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`active:bg-grey-700 rounded-b-xl`}
                onPress={() => setShowTheme(true)}>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <DarkSVG />
                    <Text style={tw`  text-base font-bold text-grey-50`}>
                      {t('Theme')}
                    </Text>
                  </View>
                  <Web23ComingSoon />
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Text style={tw`  text-sm font-bold text-grey-50`}>
                      {t('Dark')}
                    </Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9E9E9E"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mb-6 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`  px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold`}>
              {t('Protection')}
            </Text>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() => navigation.navigate('PrivateKeyScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <NoteAddSVG />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Private Key')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() => navigation.navigate('SecretPhraseScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <KeySVG />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Secret Phrase')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() => navigation.navigate('ConnectSiteScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <LinkSVG fill="#0A84FF" />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Connected Sites')}
                  </Text>
                </View>
                <Web23ComingSoon />
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700 rounded-b-xl`}
              onPress={() => navigation.navigate('LoginScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <LockSVG />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Lock Wallet')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-6 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`  px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold`}>
              {t('About Web23')}
            </Text>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() => navigation.navigate('TermPrivacyScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <GPPSVG />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Terms and Privacy')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700`}
              onPress={() => navigation.navigate('ContactSupportScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <SupportSVG />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('Contact Support')}
                  </Text>
                </View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`active:bg-grey-700 rounded-b-xl`}
              onPress={() => navigation.navigate('ContactSupportScreen')}>
              <View
                style={tw`flex flex-row items-center justify-between px-3 py-4`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <UpdateSMSVG fill="#B558E4" />
                  <Text style={tw`  text-base font-bold text-grey-50`}>
                    {t('App Version')}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <Text style={tw`  text-sm font-bold text-grey-50`}>
                    v1.1.01
                  </Text>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Currency') || 'Currency'}
        show={showCurrency}
        setShow={setShowCurrency}>
        <Web23SearchBox
          placeholder={t('Search Currency')}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          {currency.map(item => (
            <TouchableOpacity
              key={item.value}
              style={tw`flex flex-row justify-between py-4 pl-3 pr-6 border-b active:bg-grey-800 rounded-t-xl border-grey-800`}
              onPress={() => {
                const newUser = settings.userData.map(user => {
                  if (user.accountId === currentUser.accountId) {
                    user.currency.label = item.value;
                    user.currency.symbol = item.symbol;
                  }
                  return user;
                });
                saveSettings({...settings, userData: newUser});
                setShowCurrency(false);
              }}>
              <View style={tw`flex flex-row gap-3`}>
                {item.icon}
                <Text style={tw`  text-base font-bold text-grey-50`}>
                  {item.text}
                </Text>
              </View>
              {item.value === currentUser.currency.label && (
                <CheckCircleSVG fill="#D7FC51" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Language') || 'Language'}
        show={showLanguage}
        setShow={setShowLanguage}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          {languageArray.map((item, index) => (
            <TouchableOpacity
              key={item.value + index}
              style={tw`flex flex-row justify-between py-4 pl-3 pr-6 last:border-b-0 border-b active:bg-grey-800 rounded-none first:rounded-t-xl last:rounded-b-xl border-grey-800`}
              onPress={() => {
                saveSettings({...settings, language: item.value});
                i18n.changeLanguage(item.value);
                setTimeout(() => {
                  setShowLanguage(false);
                }, 300);
              }}>
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {item.title}
              </Text>
              {settings.language === item.value && (
                <CheckCircleSVG fill="#D7FC51" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Network') || 'Network'}
        show={showNetType}
        setShow={setShowNetType}>
        <View style={tw`mb-8 rounded-xl bg-grey-900`}>
          <TouchableOpacity
            style={tw`py-[10px] border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl`}
            onPress={() => {
              saveSettings({
                ...settings,
                userData: settings.userData?.map(item => {
                  const res = item;
                  if (item.accountId === settings.selectedUser) {
                    res.net = true;
                  }
                  return res;
                }),
              });
              setTimeout(() => {
                setShowNetType(false);
              }, 300);
            }}>
            <View
              style={tw`flex flex-row items-center justify-between px-3 pr-6`}>
              <View style={tw`py-1 font-bold`}>
                <Text style={tw`  text-base text-grey-50 mb-[2px]`}>
                  Mainnet
                </Text>
                <Text style={tw`  text-xs text-grey-400`}>
                  {t('All your real transactions here')}
                </Text>
              </View>
              {settings?.userData?.filter(
                item => item.accountId === settings.selectedUser,
              )[0].net && <CheckCircleSVG fill="#D7FC51" />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`py-[10px] px-3 pr-6 flex flex-row justify-between items-center active:bg-grey-800 rounded-b-xl`}
            onPress={() => {
              setTimeout(() => {
                saveSettings({
                  ...settings,
                  userData: settings.userData?.map(item => {
                    const res = item;
                    if (item.accountId === settings.selectedUser) {
                      res.net = false;
                    }
                    return res;
                  }),
                });
                setShowNetType(false);
              }, 300);
            }}>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`  text-base text-grey-50 mb-[2px]`}>Testnet</Text>
              <Text style={tw`  text-xs text-grey-400`}>
                {t('Used for testing only')}
              </Text>
            </View>
            {!settings?.userData?.filter(
              item => item.accountId === settings.selectedUser,
            )[0].net && <CheckCircleSVG fill="#D7FC51" />}
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Theme') || 'Theme'}
        show={showTheme}
        setShow={setShowTheme}>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <View
            style={tw`flex flex-row gap-3 px-3 py-4 pr-6 border-b active:bg-grey-800 rounded-t-xl border-grey-800`}>
            <SecurityUpdateSVG />
            <Text style={tw`  text-base font-bold text-grey-50`}>
              {t('System')}
            </Text>
          </View>
          <View
            style={tw`flex flex-row justify-between px-3 py-4 pr-6 border-b active:bg-grey-800 border-grey-800`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <LightModeSVG />
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {t('Light')}
              </Text>
            </View>
            <Web23ComingSoon />
          </View>
          <View
            style={tw`flex flex-row justify-between px-3 py-4 pr-6 active:bg-grey-800 rounded-b-xl`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <DarkModeSVG />
              <Text style={tw`  text-base font-bold text-grey-50`}>
                {t('Dark')}
              </Text>
            </View>
            <CheckCircleSVG fill="#D7FC51" />
          </View>
        </View>
      </Web23Popup>
    </>
  );
};

export default SettingScreen;
