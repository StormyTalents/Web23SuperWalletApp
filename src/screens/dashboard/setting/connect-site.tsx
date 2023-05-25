import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {Web23Button, Web23Popup, Web23Avatar, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import WalletConnectSVG from '../../../assets/icons/WalletConnect.svg';
import SiteAvatarSVG from '../../../assets/icons/connect_avatar.svg';
import WalletSVG from '../../../assets/icons/Wallet.svg';
import VerifiedSVG from '../../../assets/icons/verified.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import CircleCheckSVG from '../../../assets/icons/check_circle.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';

//logo assets/icons/logo_md.png

const ConnectSiteScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [showSwitchWallet, setShowSwitchWallet] = useState<boolean>(false);
  const [showConnecting, setShowConnecting] = useState<boolean>(false);
  const [successConnect, setSuccessConnect] = useState<boolean>(false);
  const [connectedSites, setConnectedSites] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const {t} = useTranslation();

  return (
    <>
      <Screen>
        <View style={tw`h-full flex justify-between`}>
          <ScreenTitle onPress={() => navigation.navigate('SettingScreen')} />
          <View style={tw`px-3 flex justify-center w-full`}>
            <Text style={tw`mb-3 text-2xl font-bold text-center text-white`}>
              {t('Connected Sites')}
            </Text>
            <Text
              style={tw`  px-10 mb-6 text-base font-medium text-center text-grey-200`}>
              {t('Connect your wallet to dApps to get started')}
            </Text>
            <View style={tw`bg-grey-900 rounded-xl`}>
              {connectedSites ? (
                <>
                  <Text
                    style={tw`font-bold text-sm text-grey-200 pt-[18px] pl-3 pb-[2px]`}>
                    {'1' + t('Connected Site')}
                  </Text>
                  <TouchableOpacity
                    style={tw`flex flex-row items-center justify-between px-3 py-[10px] rounded-b-xl active:bg-grey-800`}
                    onPress={() =>
                      navigation.navigate('ConnectionDetailScreen')
                    }>
                    <View style={tw`flex flex-row items-center gap-3`}>
                      <View
                        style={tw`flex flex-row items-center justify-center w-10 h-10 font-bold bg-white rounded-full`}>
                        SR
                      </View>
                      <View style={tw`py-1`}>
                        <Text
                          style={tw`  font-bold text-base text-grey-50 mb-[2px]`}>
                          Superrare
                        </Text>
                        <Text style={tw`  text-xs font-bold text-grey-400`}>
                          superrare.com
                        </Text>
                      </View>
                    </View>
                    <ArrowDownSVG
                      style={{transform: [{rotate: '-90deg'}]}}
                      fill="#9E9E9E"
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={tw`flex flex-row justify-center pt-6 pb-2`}>
                    <WalletConnectSVG />
                  </View>
                  <Text
                    style={tw`  mb-1 text-base font-bold text-center text-white`}>
                    {t('No sites connected')}
                  </Text>
                  <Text
                    style={tw`  pb-6 text-sm font-bold text-center text-grey-400`}>
                    {t('Wallet 1 isn’t connected to any sites')}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={tw`pb-8 px-3 `}>
            <Web23Button
              text={t('Manually Connect') || 'Manually Connect'}
              onPress={() => setShowConnect(true)}
            />
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Connect with Web23') || 'Connect with Web23'}
        show={showConnect}
        setShow={setShowConnect}>
        <View style={tw`mt-4 mb-8`}>
          <View style={tw`flex flex-row items-center justify-center mb-3`}>
            <SiteAvatarSVG />
          </View>
          <Text style={tw`  mb-2 text-xl font-bold text-center text-white`}>
            https://superrare.com
          </Text>
          <Text style={tw`  mb-4 text-xs font-bold text-center text-grey-400`}>
            {t('wants to connect with your wallet')}
          </Text>
          <View style={tw`p-4 mb-4 border border-grey-800 rounded-xl`}>
            <Text style={tw`  mb-1 text-sm font-bold text-grey-200`}>
              {'Superrare ' + t('will be able to')}
            </Text>
            <View style={tw`flex flex-row items-center gap-3 px-2 py-1`}>
              <WalletSVG style={tw`text-grey-400`} fill="#9e9e9e" />
              <Text style={tw`text-xs font-bold text-grey-50`}>
                {t('Access your wallet address, activity and balance')}
              </Text>
            </View>
            <View style={tw`flex flex-row items-center gap-3 px-2 py-1`}>
              <VerifiedSVG />
              <Text style={tw`text-xs font-bold text-grey-50`}>
                {t('Request approval for transactions')}
              </Text>
            </View>
          </View>
          <View style={tw`bg-grey-900 rounded-xl pt-[18px] mb-4`}>
            <Text style={tw`  px-3 pb-3 text-sm font-bold text-grey-200 `}>
              {t('Connecting to this wallet')}
            </Text>
            <TouchableOpacity
              style={tw`px-3 pb-[12px] rounded-b-xl flex flex-row justify-between items-center active:bg-grey-800`}
              onPress={() => setShowSwitchWallet(true)}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <Web23Avatar
                  type={currentUser.type}
                  color={currentUser.themeColor}
                  name={currentUser.userName}
                />
                <View style={tw`py-1`}>
                  <Text style={tw`  font-bold text-base text-grey-50 mb-[2px]`}>
                    {currentUser.userName}
                  </Text>
                  <Text style={tw`  text-xs font-bold text-grey-400`}>
                    {currentUser.accountId}
                  </Text>
                </View>
              </View>
              <ArrowDownSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
          <Web23Button
            text={t('Connect') || 'Connect'}
            onPress={() => {
              setSuccessConnect(false);
              setShowConnect(false);
              setShowConnecting(true);
              setTimeout(() => {
                setSuccessConnect(true);
                setConnectedSites(true);
              }, 3000);
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Switch Wallet') || 'Switch Wallet'}
        show={showSwitchWallet}
        setShow={setShowSwitchWallet}>
        <Text style={tw`py-4 text-sm font-bold text-grey-200`}>
          {t('Choose the wallet to connect with Superrare')}
        </Text>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200  `}>
            {t('My wallets')}
          </Text>
          {settings.userData.map((item, index) => (
            <TouchableOpacity
              key={`${item.accountId}_${index}`}
              style={tw`pl-3 pr-6 py-[10px] active:bg-grey-800 border-b border-grey-800 flex flex-row justify-between items-center ${
                index === settings.userData.length - 1
                  ? 'border-b-0 rounded-b-xl'
                  : ''
              }`}
              onPress={() => {
                saveSettings({...settings, selectedUser: item.accountId});
                setTimeout(() => {
                  setShowSwitchWallet(false);
                }, 300);
              }}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <Web23Avatar
                  name={item.userName}
                  type={item.type}
                  color={item.themeColor}
                />
                <View style={tw`py-1`}>
                  <Text style={tw`font-bold text-grey-50 text-base mb-[2px]`}>
                    {item.userName}
                  </Text>
                  <Text style={tw`  text-xs font-bold text-grey-400`}>
                    {item.accountId}
                  </Text>
                </View>
              </View>
              {item.accountId === settings.selectedUser && (
                <CircleCheckSVG fill="#D7FC51" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Connect with Web23') || 'Connect with Web23'}
        show={showConnecting}
        setShow={setShowConnecting}>
        <View style={tw`flex flex-row items-center justify-center`}>
          {!successConnect ? (
            <>
              <SiteAvatarSVG />
              <View style={tw`w-[90px]`}>
                <View
                  style={tw`h-[1px] border-t-2 border-dashed animate-connecting`}
                />
              </View>
              <View>
                <Image
                  source={require('../../../assets/icons/logo_md.png')}
                  alt="logo"
                />
              </View>
            </>
          ) : (
            <CompleteSVG />
          )}
        </View>
        <Text
          style={tw`mt-3 mb-8 font-medium text-base text-center text-grey-200 ${
            !successConnect ? 'after:content-["."] after:animate-dots' : ''
          }`}>
          {!successConnect ? t('Connecting') : t('Connection successful')}
        </Text>
      </Web23Popup>
    </>
  );
};

export default ConnectSiteScreen;
