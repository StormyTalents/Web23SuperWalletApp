import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';
import {useToast} from 'react-native-toast-notifications';

import {
  Web23Input,
  Web23Avatar,
  Web23Popup,
  Web23Button,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ClearSVG from '../../../assets/icons/clear.svg';
import SMHBarSVG from '../../../assets/icons/sm_hbar.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import LgHBarSVG from '../../../assets/icons/lg_hbar.svg';
import CheckCircleSVG from '../../../assets/icons/check_circle.svg';

const PASTE = 0;
const COPY = 1;

const ManageContactScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const {t} = useTranslation();
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [searchKey, setSearchKey] = useState<string>('');
  const [copyState, setCopyState] = useState<number>(PASTE);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  // const {showToast, ToasterBox} = useToast();
  const [walletName, setWalletName] = useState<string>('New Contact');
  const [editType, setEditType] = useState<'initial' | 'icon'>('initial');
  const [accountId, setAccountId] = useState<string>('');
  const toast = useToast();
  
  return (
    <>
      <Screen>
        <ScreenTitle
          title={t('Manage Contacts') || 'Manage Contacts'}
          onPress={() => navigation.navigate('SettingScreen')}
        />
        <View style={tw`flex justify-center w-full h-auto px-3`}>
          <View style={tw`relative my-4`}>
            <Web23Input
              placeholder={
                t('Search by name or address') || 'Search by name or address'
              }
              value={searchKey}
              className="pr-[60px]"
              onChange={e => {
                setSearchKey(e);
                if ((e as string).length > 0) {
                  setCopyState(COPY);
                } else {
                  setCopyState(PASTE);
                }
              }}
            />
            {/* <Text
              style={tw`"absolute text-sm font-medium text-lime-500 active:font-bold top-4 right-5`}
              onPress={async () => {
                switch (copyState) {
                  case COPY:
                    setShowEdit(true);
                    break;
                  case PASTE:
                    const value = ''; //await navigator.clipboard.readText();
                    setSearchKey(value);
                    if (
                      currentUser.contacts.findIndex(
                        item => item.accountId === value,
                      ) === -1
                    ) {
                      setCopyState(COPY);
                    } else {
                      setCopyState(PASTE);
                    }
                    // showToast('Pasted Wallet Address');
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
            </Text> */}
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`text-sm font-bold text-grey-200 pt-[18px] pb-[2px] px-3`}>
              {t('Frequently interacted with')}
            </Text>
            {currentUser.contacts.map(
              (item, index) =>
                item.accountId !== '' && (
                  <View key={`${index}_${item.accountId}`}>
                    <TouchableOpacity
                      style={tw`px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-800 ${
                        index === settings.userData.length - 1
                          ? 'rounded-b-xl'
                          : ''
                      }`}
                      onPress={() => {
                        setAccountId(item.accountId);
                        setEditType(item.type);
                        setWalletName(item.userName);
                        setShowEdit(true);
                      }}>
                      <View style={tw`flex flex-row items-center gap-3`}>
                        <View style={tw`relative`}>
                          <Web23Avatar
                            type={item.type}
                            name={item.userName}
                            color="red"
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
                      <ArrowDownSVG
                        style={{transform: [{rotate: '-90deg'}]}}
                        fill="#9E9E9E"
                      />
                    </TouchableOpacity>
                  </View>
                ),
            )}
          </View>
          <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
            <Text style={tw`px-3 pt-4 pb-2 text-sm font-bold text-grey-200`}>
              {searchKey.length > 0
                ? `${t('Search results in wallets for')} "${searchKey}"`
                : t('All Contacts')}
            </Text>
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
                          setAccountId(item.accountId);
                          setEditType(item.type);
                          setWalletName(item.userName);
                          setShowEdit(true);
                        }}>
                        <View style={tw`relative flex flex-row justify-center`}>
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
          </View>
        </View>
        {/* {ToasterBox} */}
      </Screen>
      <Web23Popup
        show={showEdit}
        setShow={setShowEdit}
        title={t('Edit Contact') || 'Edit Contact'}>
        <View style={tw`absolute top-[14px] right-6`}>
          <Web23Button
            text={t('Delete') || 'Delete'}
            className="px-6 py-3"
            variant="danger"
            onPress={() => {
              const newUser = settings.userData.map(item => {
                if (item.accountId === currentUser.accountId) {
                  const cons = item.contacts.filter(
                    contact => contact.accountId !== accountId,
                  );
                  item.contacts = cons;
                }
                return item;
              });
              saveSettings({...settings, userData: newUser});
              setShowEdit(false);
            }}
          />
        </View>
        <View style={tw`px-3 pt-4 pb-[14px] bg-grey-900 rounded-xl mb-4`}>
          <View style={tw`flex flex-row justify-center mb-4`}>
            <Web23Avatar
              name={walletName}
              color="red"
              size="lg"
              type={editType}
            />
          </View>
          <Web23Input
            placeholder={t('Enter name') || 'Enter name'}
            limit={32}
            value={walletName}
            onChange={e => {
              if (e.length > 31) {
                setWalletName(e.slice(0, 32));
              } else {
                setWalletName(e);
              }
            }}
          />
        </View>
        <View
          style={tw`bg-grey-900 px-3 py-[10px] rounded-xl flex flex-row justify-between items-center mb-4`}>
          <View style={tw`flex flex-row items-center gap-3`}>
            <LgHBarSVG />
            <View style={tw`py-1`}>
              <Text style={tw`  text-base font-bold text-grey-50 mb-[2px]`}>
                Hedera
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {accountId}
              </Text>
            </View>
          </View>
          <CheckCircleSVG fill="#D7FC51" />
        </View>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200`}>
            {t('Wallet Customization')}
          </Text>
          <View style={tw`flex flex-row justify-between px-6 py-[10px]`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                editType === 'initial' ? 'border-lime-500' : ''
              }`}
              onPress={() => setEditType('initial')}>
              <Web23Avatar name={walletName} color="red" type="initial" />
              <View style={tw`py-1`}>
                <Text style={tw`  font-bold text-base text-grey-50 mb-[2px]`}>
                  {t('Initial')}
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  {t('Character')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                editType === 'icon' ? 'border-lime-500' : ''
              }`}
              onPress={() => setEditType('icon')}>
              <Web23Avatar name={walletName} color="red" type="icon" />
              <View style={tw`py-1`}>
                <Text style={tw`  font-bold text-base text-grey-50 mb-[2px]`}>
                  {t('Icon')}
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  {t('Wallet Icon')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`w-full h-[1px] border-grey-800`} />
          <View style={tw`p-1`}>
            <Web23Button
              text={t('Save changes') || 'Save changes'}
              onPress={() => {
                const newUser = settings.userData.map(item => {
                  let contact = item.contacts;
                  if (item.accountId === currentUser.accountId) {
                    contact = item.contacts.map(it => {
                      if (it.accountId === accountId) {
                        return {
                          accountId,
                          userName: walletName,
                          type: editType,
                        };
                      } else {
                        return it;
                      }
                    });
                  }
                  return {...item, contacts: contact};
                });
                saveSettings({...settings, userData: newUser});
                setShowEdit(false);
              }}
            />
          </View>
        </View>
      </Web23Popup>
    </>
  );
};

export default ManageContactScreen;
