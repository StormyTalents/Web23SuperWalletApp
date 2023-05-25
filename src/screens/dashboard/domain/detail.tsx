import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';
import {useWeb23Navigation} from 'navigation';
import apiHandler from 'utils/apiHandler';

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23Toggle,
} from 'components';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ArrowBackSVG from '../../../assets/icons/arrow_back.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import RenewSVG from '../../../assets/icons/Send.svg';
import TransferSVG from '../../../assets/icons/Purchase.svg';
import ShareSVG from '../../../assets/icons/QR.svg';
import HeartSVG from '../../../assets/icons/monitor_heart.svg';
import ImageSVG from '../../../assets/icons/image.svg';
import GoDaddySVG from '../../../assets/icons/GoDaddy.svg';
import GoDaddyLGSVG from '../../../assets/icons/GoDaddyLG.svg';

const tabHeaders = [
  {
    icon: <RenewSVG stroke="#F4F4F4" fill="transparent" />,
    title: 'Renew',
  },
  {
    icon: <TransferSVG stroke="#F4F4F4" fill="transparent" />,
    title: 'Transfer',
  },
  {
    icon: <ShareSVG stroke="#F4F4F4" fill="transparent" />,
    title: 'Share',
  },
];

const RENEW = 0;
const TRANSFER = 1;
const SHARE = 2;

const DomainDetailScreen: React.FC<{
  route: any;
}> = ({route}) => {
  const {name = '', expired = '', img = '', back = 'wallet'} = route;
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState(RENEW);
  const [renewChecked, setRenewChecked] = useState(false);
  const [lockChecked, setLockChecked] = useState(false);
  const [domainChecked, setDomainChecked] = useState(false);
  const [showWhoIs, setShowWhoIs] = useState<boolean>(false);
  const [contact, setContact] = useState<string>('');
  const [info, setInfo] = useState<any>();

  const asyncOperation = async () => {
    try {
      setLoading(true);
      const domainInfo = await apiHandler('domain_info', currentUser.token, {
        sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        domain: name,
      });
      if (domainInfo?.info) {
        setInfo(domainInfo?.info);
        setRenewChecked(domainInfo?.info.renewable);
        setLockChecked(domainInfo?.info.locked);
        setDomainChecked(domainInfo?.info.transferProtected);
        setContact(domainInfo?.info?.contactAdmin.email);
      }
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    asyncOperation();
  }, []);

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`px-3 h-full flex flex-row justify-center h-auto px-0`}>
          <View style={tw`w-full`}>
            <View
              style={tw`bg-[linear-gradient(180deg,_#212121_0%,_rgba(33,_33,_33,_0)_100%)]`}>
              <TouchableOpacity style={tw`px-4 py-6`}>
                <ArrowBackSVG
                  fill="#D6D6D6"
                  onPress={() =>
                    back === 'wallet'
                      ? navigation.navigate('DashboardWalletScreen')
                      : navigation.navigate('DashboardDomainScreen')
                  }
                />
              </TouchableOpacity>
              <View style={tw`flex flex-row justify-center mb-3`}>
                {img ? (
                  <Image
                    source={{uri: img}}
                    style={tw`rounded-ful w-[72px] h-[72px]`}
                    alt="web3 domain"
                  />
                ) : (
                  <GoDaddyLGSVG />
                )}
              </View>
              <Text style={tw`mb-2 text-2xl font-bold text-center text-white`}>
                {name}
              </Text>
              <Text
                style={tw`px-10 mb-6 text-xs font-bold text-center text-grey-400`}>
                <Text>
                  {t('Auto Renews') + ' '}{' '}
                  {new Date(expired).toLocaleDateString()}
                </Text>
                <Text> • </Text>
                <Text>
                  {t('Added via') + ' '} {img ? 'Web23' : 'Godaddy'}{' '}
                </Text>
              </Text>
            </View>
            <View style={tw`flex flex-row justify-center gap-3 px-3 mb-4`}>
              {tabHeaders.map((tabInf, index) => (
                <View
                  key={`${tabInf.title}_${index}`}
                  style={tw`flex flex-col items-center px-3 pt-2`}>
                  <TouchableOpacity
                    style={tw`active:bg-green-500 text-white bg-grey-900 rounded-full flex flex-row justify-center items-center w-[48px] h-[48px] mb-2 ${
                      tab === index ? 'bg-lime-500 text-black' : ''
                    } `}
                    onPress={() => setTab(index)}>
                    {tabInf.icon}
                  </TouchableOpacity>
                  <Text
                    style={tw`  text-sm font-bold text-center   text-grey-200`}>
                    {tabInf.title}
                  </Text>
                </View>
              ))}
            </View>
            <View style={tw`px-6`}>
              <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200`}>
                  {t('Preferences')}
                </Text>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold active:bg-grey-800 text-grey-50`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <HeartSVG />
                    <Text style={tw`text-grey-50`}>{t('Status')}</Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2 uppercase`}>
                    <Text style={tw`text-grey-50`}>{info?.status}</Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9e9e9e"
                    />
                  </View>
                </View>
                <View style={tw`border-b border-grey-800" `} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold active:bg-grey-800 text-grey-50 rounded-b-xl`}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <ImageSVG />
                    <Text style={tw`text-grey-50`}>{t('Thumbnail')}</Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap-2 uppercase`}>
                    <Text style={tw`text-grey-50`}>{t('Added')}</Text>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9e9e9e"
                    />
                  </View>
                </View>
              </View>
              <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200`}>
                  {t('Settings')}
                </Text>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800`}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                      {t('Redirect Domain')}
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Update where the domain redirects to')}
                    </Text>
                  </View>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </View>
                <View style={tw`border-b border-grey-800" border-b-[1px]`} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800`}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>DNS</Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Update DNS settings')}
                    </Text>
                  </View>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </View>
                <View style={tw`border-b border-grey-800" border-b-[1px]`} />
                <TouchableOpacity
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-80`}
                  onPress={() => setShowWhoIs(true)}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                      {t('Whois')}
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Update contact info')}
                    </Text>
                  </View>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </TouchableOpacity>
                <View style={tw`border-b border-grey-800 border-b-[1px]`} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800`}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                      {t('Auto Renews')}
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Renew automatically when expiring')}
                    </Text>
                  </View>
                  <Web23Toggle
                    checked={renewChecked}
                    setChecked={() => setRenewChecked(!renewChecked)}
                  />
                </View>
                <View style={tw`border-b border-grey-800 border-b-[1px]`} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800`}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                      {t('Transfer Lock')}
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Lock domain from being transferred')}
                    </Text>
                  </View>
                  <Web23Toggle
                    checked={lockChecked}
                    setChecked={() => setLockChecked(!lockChecked)}
                  />
                </View>
                <View style={tw`border-b border-grey-800 border-b-[1px]`} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800 rounded-b-xl`}>
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                      {t('Domain Privacy')}
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      {t('Protect your contact information')}
                    </Text>
                  </View>
                  <Web23Toggle
                    checked={domainChecked}
                    setChecked={() => setDomainChecked(!domainChecked)}
                  />
                </View>
              </View>
              <View style={tw`bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
                  {t('Shared with')}
                </Text>
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] active:bg-grey-800`}>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Web23Avatar
                      color="blue"
                      type="icon"
                      name="Wayne"
                      walletColor="white"
                    />
                    <View style={tw`py-1 font-bold`}>
                      <Text style={tw`text-base text-grey-50`}>
                        Wayne x Rooney
                      </Text>
                      <Text style={tw`text-sm text-grey-400`}>
                        hedera...m23p9
                      </Text>
                    </View>
                  </View>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9e9e9e"
                  />
                </View>
                <View style={tw`border-grey-800 border-b border-b-[1px]`} />
                <View
                  style={tw`flex flex-row items-center justify-between px-3 py-[10px] active:bg-grey-800`}>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Web23Avatar
                      color="indigo"
                      type="icon"
                      name="Wayne"
                      walletColor="white"
                    />
                    <View style={tw`py-1 font-bold`}>
                      <Text style={tw`text-base text-grey-50`}>
                        Mini x Momosa
                      </Text>
                      <Text style={tw`text-sm text-grey-400`}>
                        hedera...po2b9a
                      </Text>
                    </View>
                  </View>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9e9e9e"
                  />
                </View>
                <View style={tw`border-grey-800 border-b border-b-[1px]`}>
                  <Text
                    style={tw`px-3 py-4 mb-4 font-bold text-lime-500 active:bg-grey-800 rounded-b-xl`}>
                    {t('Manage Permissions')}
                  </Text>
                </View>
                <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
                  <Text style={tw`px-3 pt-4 text-sm font-bold text-grey-200`}>
                    {t('Connected Account')}
                  </Text>
                  <View
                    style={tw`flex flex-row items-center justify-between px-3 py-[10px] active:bg-grey-800 rounded-b-xl`}>
                    <View style={tw`flex flex-row items-center gap-2`}>
                      <GoDaddySVG />
                      <View style={tw`py-1 font-bold`}>
                        <Text style={tw`text-base text-grey-50`}>GoDaddy</Text>
                        <Text style={tw`text-sm text-grey-400`}>
                          User ID: 32120921
                        </Text>
                      </View>
                    </View>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9e9e9e"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('WhoIs') || 'WhoIs'}
        show={showWhoIs}
        setShow={setShowWhoIs}>
        <View style={tw`py-4`}>
          <Web23Input
            placeholder={t('Update Contact Info') || 'Update Contact Info'}
            value={contact}
            onChange={(e: any) => setContact(e)}
          />
        </View>
        <TouchableOpacity style={tw`mb-8`}>
          <Web23Button
            text={t('Update') || 'Update'}
            size="sm"
            onPress={() => setShowWhoIs(false)}
          />
        </TouchableOpacity>
      </Web23Popup>
    </>
  );
};

export default DomainDetailScreen;
