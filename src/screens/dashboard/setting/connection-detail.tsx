import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {Web23Avatar, Web23Modal, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import SiteAvatarSVG from '../../../assets/icons/connect_avatar.svg';
import WalletSVG from '../../../assets/icons/Wallet.svg';
import VerifiedSVG from '../../../assets/icons/verified.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const ConnectionDetailScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <>
      <Screen>
        <ScreenTitle
          title={t('Connection Details') || 'Connection Details'}
          onPress={() => navigation.navigate('ConnectSiteScreen')}
        />
        <View style={tw`px-3 flex justify-center`}>
          <View
            style={tw`mb-3 flex flex-row justify-center items-center mt-[18px]`}>
            <SiteAvatarSVG />
          </View>
          <Text style={tw`  mb-2 text-xl font-bold text-center text-white`}>
            https://superrare.com
          </Text>
          <Text style={tw`  mb-4 text-xs font-bold text-center text-grey-400`}>
            {t('is connected to your wallet')}
          </Text>
          <View style={tw`p-4 mb-4 border border-grey-800 rounded-xl`}>
            <Text style={tw`  mb-1 text-sm font-bold text-grey-200`}>
              {'Superrare' + t('will be able to')}
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
            <View
              style={tw`px-3 pb-[12px] rounded-b-xl flex flex-row justify-between items-center active:bg-grey-800`}>
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
            </View>
          </View>
          <View style={tw`py-1`}>
            <Text
              style={tw`text-sm font-bold text-center text-red-500 underline`}
              onPress={() => setShowConfirm(true)}>
              {t('Remove Connection')}
            </Text>
          </View>
        </View>
      </Screen>
      {
        <Web23Modal show={showConfirm}>
          <View style={tw`w-[300px]`}>
            <Text style={tw`mb-3 text-base font-bold text-center text-white`}>
              {t('Remove Connection?')}
            </Text>
            <Text style={tw`mb-4 text-sm font-bold text-grey-400`}>
              {t('Are you sure you want to remove connection with') +
                ' Superrare?'}
            </Text>
            <View style={tw`mb-4 border-grey-800 border-b-[1px]`} />
            <View style={tw`flex flex-row gap-4`}>
              <TouchableOpacity
                style={tw`  w-full py-2 text-base font-bold text-center bg-white text-grey-900 rounded-[32px]`}
                onPress={() => setShowConfirm(false)}>
                {t('Cancel')}
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`  w-full py-2 text-base font-bold text-center bg-red-500 text-white rounded-[32px]`}
                onPress={() => setShowConfirm(false)}>
                {t('Remove')}
              </TouchableOpacity>
            </View>
          </View>
        </Web23Modal>
      }
    </>
  );
};

export default ConnectionDetailScreen;
