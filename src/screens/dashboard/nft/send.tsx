import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {
  ScreenTitle,
  Web23Input,
  Web23Avatar,
  Web23Popup,
  Web23Button,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import apiHandler from 'utils/apiHandler';
import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ClearSVG from '../../../assets/icons/clear.svg';
import CircleCheckSVG from '../../../assets/icons/check_circle.svg';
import SMHBarSVG from '../../../assets/icons/sm_hbar.svg';
import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import LgHBarSVG from '../../../assets/icons/lg_hbar.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';

const PASTE = 0;
const COPY = 1;
const CLEAR = 2;

const SendNFTScreen: React.FC<{
  name: string;
  description: string;
  category: string;
  photo: string;
  token: string;
  attribute: string[];
  collection: string;
  external_link: string;
  alternate_text: string;
}> = ({
  name,
  description,
  category,
  photo,
  token,
  attribute,
  collection,
  external_link,
  alternate_text,
}) => {
  const navigation = useWeb23Navigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const {settings, saveSettings} = useContext(SettingContext);
  const [copyState, setCopyState] = useState<number>(PASTE);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  // const {showToast, ToasterBox} = useToast();
  const [showTransaction, setShowTransaction] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [sendAccountInfo, setSendAccountInfo] = useState<{
    userName: string;
    accountId: string;
    type: 'initial' | 'icon';
  }>({userName: '', accountId: '', type: 'initial'});
  const [memo, setMemo] = useState<string>('');
  const {t} = useTranslation();
  const toast = useToast();

  return (
    <>
      <Screen loading={loading}>
        <ScreenTitle
          title={t('Send') + ' NFT'}
          onPress={() =>
            navigation.navigate('DetailNFTGalleryScreen', {
              name,
              description,
              category,
              photo,
              token,
              attribute,
              collection,
              external_link,
              alternate_text,
            })
          }
        />
        <View style={tw`flex justify-center w-full h-auto h-full px-3`}>
          <View style={tw`w-full mt-4 mb-8 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] px-3 pb-[2px] font-bold text-grey-200 text-sm`}>
              {t('Send') + ' NFT'}
            </Text>
            <View style={tw`px-3 py-[10px] flex flex-row gap-3 items-center`}>
              <View>
                <Image source={{uri: photo}} alt="nft" />
              </View>
              <View style={tw`py-[2px]`}>
                <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                  {name}
                </Text>
                <Text style={tw`text-grey-400`}>{token}</Text>
              </View>
            </View>
          </View>
          <View style={tw`relative w-full mb-4`}>
            <Web23Input
              placeholder={
                t('Search by name or address') || 'Search by name or address'
              }
              value={searchKey}
              className="pr-[60px]"
              onChange={e => {
                setSearchKey(e);
                if ((e as string).length > 0) {
                  setCopyState(CLEAR);
                } else {
                  setCopyState(PASTE);
                }
              }}
            />
            <Text
              style={tw`absolute text-sm font-medium text-lime-500 active:font-bold top-4 right-5`}
              onPress={async () => {
                switch (copyState) {
                  case PASTE:
                    const value = await Clipboard.getString();
                    setSearchKey(value);
                    setCopyState(CLEAR);
                    toast.show(t('Copied to clipboard') || '');
                    break;
                  case CLEAR:
                    setSearchKey('');
                    setCopyState(PASTE);
                    break;
                  default:
                    break;
                }
              }}>
              {copyState === COPY ? (
                t('SAVE')
              ) : copyState === PASTE ? (
                t('PASTE')
              ) : (
                <ClearSVG />
              )}
            </Text>
          </View>
          <View style={tw`w-full mb-4 bg-grey-900 rounded-xl max-h-[252px]  `}>
            <Text
              style={tw`text-sm font-bold text-grey-200 pt-[18px] pb-[2px] px-3`}>
              {t('My wallets')}
            </Text>
            {settings.userData.map((item, index) => (
              <View key={`${index}_${item.accountId}`}>
                <TouchableOpacity
                  style={tw`px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-800 ${
                    index === settings.userData.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                  onPress={() => {
                    saveSettings({...settings, selectedUser: item.accountId});
                  }}>
                  <View style={tw`flex flex-row items-center gap-3`}>
                    <View style={tw`relative`}>
                      <Web23Avatar
                        type={item.type}
                        name={item.userName}
                        color={item.themeColor}
                      />
                      <SMHBarSVG
                        style={tw`absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1`}
                      />
                    </View>
                    <View style={tw`py-1 font-bold`}>
                      <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                        {item.userName}
                      </Text>
                      <Text style={tw`text-xs text-grey-400`}>
                        {item.accountId}
                      </Text>
                    </View>
                  </View>
                  {currentUser.accountId === item.accountId && (
                    <CircleCheckSVG fill="#D7FC51" />
                  )}
                </TouchableOpacity>
                {index !== settings.userData.length - 1 && (
                  <View style={tw`border-grey-800 border-b-[1px]`} />
                )}
              </View>
            ))}
          </View>
          <View style={tw`w-full mb-8 bg-grey-900 rounded-xl`}>
            <Text style={tw`px-3 pt-4 pb-2 text-sm font-bold text-grey-200`}>
              {searchKey.length > 0
                ? `${t('Search results in wallets for')} "${searchKey}"`
                : t('Contacts')}
            </Text>
            {searchKey.length === 0 ||
            currentUser.contacts.filter(
              item =>
                item.accountId.includes(searchKey) ||
                item.userName.toLowerCase().includes(searchKey.toLowerCase()),
            ).length > 0 ? (
              <View style={tw`px-6 pt-2 pb-4 -cols-3`}>
                {currentUser?.contacts
                  ?.filter(
                    contact =>
                      searchKey === '' ||
                      contact.accountId.includes(searchKey) ||
                      contact.userName
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()),
                  )
                  .map(
                    item =>
                      item.accountId !== '' && (
                        <TouchableOpacity
                          key={item.accountId}
                          style={tw`py-2 border border-transparent hover:bg-grey-800 hover:border-grey-50 active:bg-grey-800 active:border-grey-50 rounded-xl`}
                          onPress={() => {
                            setSendAccountInfo(item);
                            setShowTransaction(true);
                          }}>
                          <View
                            style={tw`relative flex flex-row justify-center`}>
                            <Web23Avatar
                              color="red"
                              name={item.userName}
                              type={item.type}
                              size="md"
                            />
                            <View
                              style={tw`absolute right-0 translate-y-1/4 translate-x-1/5 bottom-1`}>
                              <MDHBarSVG />
                            </View>
                          </View>

                          <Text
                            style={tw`mt-3 mb-[2px] font-bold text-sm text-grey-50 text-center w-full overflow-hidden truncate`}>
                            {item.userName}
                          </Text>
                          <Text
                            style={tw`text-xs font-medium text-center text-grey-400`}>
                            {item.accountId}
                          </Text>
                        </TouchableOpacity>
                      ),
                  )}
              </View>
            ) : (
              <TouchableOpacity
                style={tw`px-3 py-[10px] rounded-b-xl flex flex-row items-center justify-between active:bg-grey-800`}
                onPress={() => {
                  setSendAccountInfo({
                    userName: 'Unknown',
                    accountId: searchKey,
                    type: 'initial',
                  });
                  setShowTransaction(true);
                }}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <LgHBarSVG />
                  <View style={tw`py-1`}>
                    <Text style={tw`text-base font-bold text-grey-50`}>
                      {searchKey}
                    </Text>
                    <Text style={tw`text-xs font-bold text-grey-400`}>
                      Hedera chain
                    </Text>
                  </View>
                </View>
                <CircleCheckSVG fill="#D7FC51" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Screen>

      <Web23Popup
        title={t('Review Transaction') || 'Review Transaction'}
        show={showTransaction}
        setShow={setShowTransaction}>
        <View style={tw`mt-4 mb-4 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`pt-[18px] px-3 pb-[2px] font-bold text-sm text-grey-200`}>
            {t('Sending')}
          </Text>
          <View
            style={tw`px-3 py-[10px] border-b border-b-grey-800 flex flex-row gap-3 items-center`}>
            <View>
              <Image source={{uri: photo}} alt="nft" />
            </View>
            <View style={tw`py-[2px]`}>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {name}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>{token}</Text>
            </View>
          </View>
          <View style={tw`px-3 py-[10px] flex flex-row items-center gap-3`}>
            <View style={tw`relative`}>
              <Web23Avatar
                type={sendAccountInfo.type}
                name={sendAccountInfo.userName}
                color="red"
                size="sm"
              />
              <SMHBarSVG
                style={tw`absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1`}
              />
            </View>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                {sendAccountInfo.userName}
              </Text>
              <Text style={tw`text-xs text-grey-400`}>
                {sendAccountInfo.accountId}
              </Text>
            </View>
          </View>
        </View>
        <Web23Input
          placeholder={t('Add Memo (optional)')}
          value={memo}
          onChange={e => setMemo(e)}
        />
        <View
          style={tw`flex flex-row items-center justify-between px-3 py-4 my-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200`}>
          <Text>{t('Transaction Fees')}</Text>
          <View style={tw`flex flex-row items-center gap-4`}>
            <Text>ℏ0.5</Text>
            <ArrowSVG style={tw`rotate-180`} fill="#9e9e9e" />
          </View>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text={t('Confirm transaction') || 'Confirm transaction'}
            onPress={async () => {
              try {
                setShowTransaction(false);
                setLoading(true);
                const checksum = sendAccountInfo.accountId.slice(0, 4);
                let sendUserId = sendAccountInfo.accountId;
                if (checksum !== '0.0.') {
                  const {accountId} = await apiHandler(
                    'resolve_domain',
                    currentUser.token,
                    {
                      resolveId: sendUserId,
                    },
                  );
                  sendUserId = accountId[0]?.ownerAddress;
                }
                await apiHandler('send_nft', currentUser.token, {
                  accountId: currentUser.accountId,
                  sendAccountId: sendUserId,
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                  token,
                });
                setShowSuccess(true);
                setLoading(false);
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Transaction Initiated') || 'Transaction Initiated'}
        show={showSuccess}
        setShow={setShowSuccess}>
        <View style={tw`flex flex-row justify-center mt-4 mb-3`}>
          <CompleteSVG />
        </View>
        <Text style={tw`mb-8 text-base font-medium text-center text-grey-200`}>
          {t(
            'Your transaction is initiated and will go through in a few minutes. We shall keep you updated.',
          )}
        </Text>
      </Web23Popup>

      {/* {ToasterBox} */}
    </>
  );
};

export default SendNFTScreen;
