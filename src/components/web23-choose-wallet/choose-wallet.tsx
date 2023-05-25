import React, {useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, TouchableOpacity} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Web23Popup,
  Web23Input,
  Web23Avatar,
  Web23Button,
  Web23ColorPicker,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {getBorderColorSchema} from 'utils/colorSchema';
import {initialSettings, SettingContext, UserData} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import CircleCheckSVG from '../../assets/icons/check_circle.svg';
import EditSVG from '../../assets/icons/edit.svg';
import AddSVG from '../../assets/icons/add_circle.svg';
import DownloadSVG from '../../assets/icons/download.svg';
import ContentCopySVG from '../../assets/icons/content_copy.svg';
import DeleteSVG from '../../assets/icons/delete.svg';

type IWeb23ChooseWallet = {
  showWalletList: boolean;
  setShowWalletList: (param: boolean) => void;
  showEditWallet: boolean;
  setShowEditWallet: (param: boolean) => void;
  showNetType: boolean;
  setShowNetType: (param: boolean) => void;
  extraOpt?: () => void;
};

const Web23ChooseWallet: React.FC<IWeb23ChooseWallet> = ({
  showWalletList,
  setShowWalletList,
  showEditWallet,
  setShowEditWallet,
  showNetType,
  setShowNetType,
  extraOpt = () => {},
}) => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const [currentUser, setCurrentUser] = useState<UserData>({
    ...initialSettings.userData[0],
  });
  const [walletName, setWalletName] = useState<string>('');
  const [color, setColor] = useState<string>('lime');
  const [type, setType] = useState<'initial' | 'icon'>('initial');
  const {t} = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setCurrentUser(getSelectedUser(settings?.userData, settings.selectedUser));
  }, [settings]);

  return (
    <>
      <Web23Popup
        show={showWalletList}
        setShow={setShowWalletList}
        title={t('Wallets') || 'Wallets'}>
        <View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <View style={tw`px-3 pt-[18px]`}>
              <Text style={tw`text-sm font-bold text-grey-200`}>
                {t('Your wallets')}
              </Text>
            </View>
            <View style={tw`max-h-[210px]`}>
              {settings?.userData?.map((item, index) => (
                <TouchableOpacity
                  key={`${item.userName}_${index}`}
                  style={tw.style(
                    'active:bg-grey-800 rounded-b-xl',
                    index < (settings?.userData?.length || 1) - 1 &&
                      'border-b border-b-grey-800 rounded-b-none',
                  )}
                  onPress={() => {
                    saveSettings({
                      ...settings,
                      selectedUser: item.accountId,
                    });
                  }}>
                  <View
                    style={tw`pl-3 py-[10px] pr-6 justify-between flex flex-row items-center`}>
                    <View style={tw`flex flex-row items-center gap-6`}>
                      <Web23Avatar
                        name={item.userName}
                        type={item.type}
                        color={item.themeColor}
                      />
                      <View
                        style={tw`w-[96px] flex flex-col gap-[2px] font-bold py-1`}>
                        <Text
                          style={tw`overflow-hidden text-base truncate whitespace-nowrap text-grey-50`}>
                          {item.userName}
                        </Text>
                        <Text
                          style={tw`overflow-hidden text-xs truncate whitespace-nowrap text-grey-400`}>
                          {item.accountId}
                        </Text>
                      </View>
                    </View>
                    <View style={tw`flex flex-row items-center gap-4`}>
                      {currentUser.accountId === item.accountId && (
                        //ele.net === selected.net
                        <CircleCheckSVG stroke="transparent" fill="#D7FC51" />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          setShowWalletList(false);
                          setShowNetType(true);
                          setWalletName(settings.userData![index].userName);
                          setColor(settings.userData![index].themeColor);
                          setType(settings.userData![index].type);
                          saveSettings({
                            ...settings,
                            selectedUser: item.accountId,
                          });
                        }}>
                        <EditSVG fill="#9e9e9e" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
            <TouchableOpacity
              style={tw`active:bg-grey-800 rounded-t-xl`}
              onPress={() => {
                saveSettings({
                  ...settings,
                  selectedUser: settings.selectedUser,
                });
                navigation.navigate('CreateMnemonicScreen');
              }}>
              <View
                style={tw`flex flex-row items-center gap-3 px-3 py-4 border-b border-b-grey-800`}>
                <AddSVG fill="#9E9E9E" />
                <Text style={tw`text-base font-bold text-grey-50`}>
                  {t('Create new wallet')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw` active:bg-grey-800 rounded-b-xl`}
              onPress={() => navigation.navigate('RecoveryWalletScreen')}>
              <View style={tw`flex flex-row items-center gap-3 px-3 py-4`}>
                <DownloadSVG fill="#9E9E9E" />
                <Text style={tw`text-base font-bold text-grey-50`}>
                  {t('Import an existing wallet')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Edit Wallet') || 'Edit Wallet'}
        show={showEditWallet}
        setShow={setShowEditWallet}>
        <View style={tw`relative pb-6`}>
          <View style={tw`bg-grey-900 rounded-xl pt-4 pb-[10px] mb-4`}>
            <View style={tw`flex flex-row justify-center mb-3`}>
              <Web23Avatar
                name={walletName}
                color={color}
                size="lg"
                type={type}
              />
            </View>
            <View style={tw`flex flex-row justify-center mb-5`}>
              <TouchableOpacity
                style={tw`flex flex-row px-3 py-2 bg-grey-800 gap-1 items-center w-[134px] rounded-3xl active:bg-grey-700`}
                onPress={() => {
                  toast.show(t('Copied to clipboard') || '');
                  Clipboard.setString(currentUser.accountId);
                }}>
                <Text
                  style={tw`overflow-hidden text-sm font-bold truncate text-grey-50 whitespace-nowrap`}>
                  {currentUser.accountId}
                </Text>
                <ContentCopySVG fill="#F4F4F4" />
              </TouchableOpacity>
            </View>
            <View style={tw`px-3`}>
              <Web23Input
                placeholder={t('Wallet name')}
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
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text style={tw`font-bold text-sm text-grey-200 pt-[18px] pl-3`}>
              {t('Wallet Customization')}
            </Text>
            <View style={tw`px-6 py-[10px] flex flex-row justify-between`}>
              <TouchableOpacity
                style={tw.style(
                  'flex flex-row gap-2 items-center px-2 py-1 border-2 rounded-xl active:bg-grey-800',
                  type === 'initial'
                    ? getBorderColorSchema(color)
                    : 'border-transparent',
                )}
                onPress={() => {
                  setType('initial');
                }}>
                <Web23Avatar
                  name={walletName || 'Wallet'}
                  color={color || 'lime'}
                  type="initial"
                />
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-grey-50 text-base mb-[2px]`}>
                    {t('Initial')}
                  </Text>
                  <Text style={tw`text-xs text-grey-400`}>
                    {t('Character')}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw.style(
                  'flex flex-row gap-2 items-center px-2 py-1 border-2 rounded-xl active:bg-grey-800',
                  type === 'icon'
                    ? getBorderColorSchema(color)
                    : 'border-transparent',
                )}
                onPress={() => setType('icon')}>
                <Web23Avatar
                  name={currentUser.userName}
                  color={color}
                  type="icon"
                />
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-grey-50 text-base mb-[2px]`}>
                    {t('Icon')}
                  </Text>
                  <Text style={tw`text-xs text-grey-400 whitespace-nowrap`}>
                    {t('Wallet Icon')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={tw`border-grey-800`} />
            <View style={tw`pl-[14px] pr-[26px] py-[10px]`}>
              <Web23ColorPicker
                value={color || 'lime'}
                setValue={newColor => setColor(newColor)}
              />
            </View>
          </View>
          <Web23Button
            text={t('Save changes') || 'Save changes'}
            onPress={() => {
              toast.show(t('Successfully saved') || '');
              setTimeout(() => {
                const updateUser = settings.userData?.map(item => {
                  const res = item;
                  if (item.accountId === settings.selectedUser) {
                    res.userName = walletName;
                    res.themeColor = color;
                    res.type = type;
                  }
                  return res;
                });

                saveSettings({...settings, userData: updateUser});
                setShowEditWallet(false);
              }, 1000);
            }}
          />
          <View style={tw`absolute top-[14px] z-10 right-2`}>
            <DeleteSVG
              fill="#9E9E9E"
              onPress={() => {
                const updatedUser = settings.userData;
                if (updatedUser?.length && updatedUser.length > 0) {
                  if (updatedUser?.length === 1) {
                    saveSettings({
                      ...settings,
                      userData: initialSettings.userData,
                      selectedUser: '',
                    });
                    navigation.navigate('CreateWalletScreen');
                  } else
                    saveSettings({
                      ...settings,
                      userData: updatedUser?.filter(
                        item => item.accountId !== settings.selectedUser,
                      ),
                      selectedUser: updatedUser?.filter(
                        item => item.accountId !== settings.selectedUser,
                      )[0].accountId,
                    });
                  toast.show(t('Successfully deleted') || '');
                }

                setTimeout(() => {
                  setShowEditWallet(false);
                }, 300);
              }}
            />
          </View>
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
              extraOpt();
              setTimeout(() => {
                setShowNetType(false);
                setShowEditWallet(true);
              }, 300);
            }}>
            <View
              style={tw`flex flex-row items-center justify-between px-3 pr-6`}>
              <View style={tw`py-1 font-bold`}>
                <Text style={tw`  text-base text-grey-50 mb-[2px]`}>
                  Mainnet
                </Text>
                <Text style={tw`text-xs text-grey-400`}>
                  {t('All your real transactions here')}
                </Text>
              </View>
              {settings?.userData?.filter(
                item => item.accountId === settings.selectedUser,
              )[0].net && <CircleCheckSVG fill="#D7FC51" />}
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
                extraOpt();
                setShowNetType(false);
                setShowEditWallet(true);
              }, 300);
            }}>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`  text-base text-grey-50 mb-[2px]`}>Testnet</Text>
              <Text style={tw`text-xs text-grey-400`}>
                {t('Used for testing only')}
              </Text>
            </View>
            {!settings?.userData?.filter(
              item => item.accountId === settings.selectedUser,
            )[0].net && <CircleCheckSVG fill="#D7FC51" />}
          </TouchableOpacity>
        </View>
      </Web23Popup>
    </>
  );
};

export default Web23ChooseWallet;
