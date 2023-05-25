import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';

import axios from 'axios';

import {Screen} from 'layouts';

import {
  Web23Avatar,
  Web23Button,
  Web23SearchBox,
  Web23Popup,
  Web23Input,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

import SMHBarSVG from '../../../../assets/icons/sm_hbar.svg';
import MDHBarSVG from '../../../../assets/icons/md_hbar.svg';
import EditSVG from '../../../../assets/icons/edit_fill.svg';
import ArrowSVG from '../../../../assets/icons/arrow-down.svg';
import CheckCircleSVG from '../../../../assets/icons/check_circle.svg';
import LgHBarSVG from '../../../../assets/icons/lg_hbar.svg';
import DoubleArrowSVG from '../../../../assets/icons/double_arrow.svg';
import XlHBarSVG from '../../../../assets/icons/xl_hbar.svg';
import CompleteSVG from '../../../../assets/icons/complete.svg';

const SendDetailScreen: React.FC<{
  route: any;
}> = ({route}) => {
  const {accountId, userName, type} = route.params;
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [amount, setAmount] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [showChooseToken, setShowChooseToken] = useState<boolean>(false);
  const [showEditContact, setShowEditContact] = useState<boolean>(false);
  const [walletName, setWalletName] = useState<string>(userName);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [editType, setEditType] = useState<'initial' | 'icon'>(type);
  const currentSendUser = currentUser.contacts.filter(
    item => item.accountId === accountId && accountId,
  )[0] || {accountId, userName, type};
  const [hbarPrice, setHbarPrice] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const getHbarPrice = async () => {
    setLoading(true);
    const {data} = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=${currentUser.currency.label.toLowerCase()}&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`,
    );
    setHbarPrice(parseFloat(data[`${currentUser.currency.label}`]));
    setLoading(false);
  };

  useEffect(() => {
    getHbarPrice();
  }, [currentUser]);

  return (
    <>
      <Screen loading={false}>
        <View style={tw`flex justify-between h-full`}>
          <ScreenTitle
            title={t('Send') || 'Send'}
            onPress={() => navigation.navigate('SendHbarScreen')}
          />
          <View style={tw`flex justify-center w-full h-auto px-6`}>
            <View
              style={tw`my-4 bg-grey-900 px-3 py-[10px] flex flex-row justify-between items-center rounded-xl`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View style={tw`relative`}>
                  <Web23Avatar
                    name={currentSendUser.userName}
                    type={currentSendUser.type}
                    color="red"
                  />
                  <View>
                    <SMHBarSVG
                      style={tw`absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1`}
                    />
                  </View>
                </View>
                <View style={tw`py-1`}>
                  <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                    {currentSendUser.userName}
                  </Text>
                  <Text style={tw`text-xs font-bold text-grey-400`}>
                    {currentSendUser.accountId}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowEditContact(true)}>
                <EditSVG fill="#9E9E9E" />
              </TouchableOpacity>
            </View>
            <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
              <View style={tw`px-3 py-[10px] flex flex-row justify-between`}>
                <View style={tw`w-1/2 py-[6px] pl-[1px]`}>
                  <Web23Input
                    placeholder={t('Enter amount') || 'Enter amount'}
                    value={amount}
                    onChange={(e: any) => setAmount(e)}
                  />
                </View>
                <TouchableOpacity
                  style={tw`flex flex-row items-center gap-1 p-2 rounded-[100px] bg-grey-800 active:bg-grey-700`}
                  onPress={() => setShowChooseToken(true)}>
                  <MDHBarSVG />
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Text style={tw`text-base font-bold text-white uppercase `}>
                      hbar
                    </Text>
                    <ArrowSVG fill="#9E9E9E" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={tw`border-grey-800 border-b-[1px]`} />
              <View
                style={tw`flex flex-row justify-between px-3 py-4 text-xs font-bold`}>
                <Text style={tw`text-green-500`}>MAX</Text>
                <Text style={tw`text-grey-400`}>
                  {t('Current Balance') + ': 12,321 HBAR'}
                </Text>
              </View>
            </View>
            <View
              style={tw`flex flex-row items-center justify-between px-3 py-4 border border-grey-800 rounded-xl`}>
              <Text style={tw`text-sm font-bold text-grey-200`}>
                {t('Transaction Fees')}
              </Text>
              <View style={tw`flex flex-row items-center gap-4`}>
                <Text style={tw`text-sm font-bold text-grey-200`}>ℏ0.5</Text>
                <ArrowSVG fill="#9e9e9e" />
              </View>
            </View>
          </View>
          <View style={tw`px-3 pb-8`}>
            <Web23Button
              text={t('Review') || 'Review'}
              disabled={amount.length ? false : true}
              onPress={() => setShowReview(true)}
            />
          </View>
        </View>
      </Screen>
      <Web23Popup
        show={showChooseToken}
        setShow={setShowChooseToken}
        title={t('Choose token to send') || 'Choose token to send'}>
        <View style={tw`relative my-4`}>
          <Web23SearchBox
            placeholder="Search Currency"
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </View>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <View
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-t-xl active:bg-grey-800`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1`}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  HBAR
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
            <CheckCircleSVG fill="#D7FC51" />
          </View>
          <View style={tw`border-grey-800" border-b-[1px]`} />
          <View
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-b-xl active:bg-grey-800`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1`}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  HBARX
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Web23Popup>
      <Web23Popup
        show={showEditContact}
        setShow={setShowEditContact}
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
              navigation.navigate('SendHbarScreen');
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
            placeholder={t('Enter name')}
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
          <View style={tw`border-grey-800 border-b-[1px]`} />
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
                setShowEditContact(false);
              }}
            />
          </View>
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Review Transaction') || 'Review Transaction'}
        show={showReview}
        setShow={setShowReview}>
        <View
          style={tw`flex flex-row justify-between p-6 my-4 bg-grey-900 rounded-xl`}>
          <View>
            <View style={tw`flex flex-row justify-center`}>
              <XlHBarSVG />
            </View>
            <View style={tw`py-1 mt-3`}>
              <Text
                style={tw`  text-base font-bold text-grey-50 mb-[2px] text-center`}>
                {amount} HBAR
              </Text>
              <Text style={tw`text-xs font-bold text-center text-grey-400`}>
                {currentUser.currency.symbol}
                {(hbarPrice * parseFloat(amount)).toFixed(3)}
              </Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`animate-bounce`}>
              <DoubleArrowSVG />
            </View>
          </View>
          <View>
            <View style={tw`relative flex flex-row justify-center`}>
              <Web23Avatar
                color="red"
                name={currentSendUser.userName}
                size="md"
                type={currentSendUser.type}
              />
              <View style={tw`absolute right-0 -translate-x-1/3 top-[48px]`}>
                <MDHBarSVG />
              </View>
            </View>
            <View style={tw`py-1 mt-3 font-bold`}>
              <Text style={tw`mb-[2px] text-base text-grey-50 text-center`}>
                {currentSendUser.userName}
              </Text>
              <Text style={tw`text-xs text-center text-grey-400`}>
                {currentSendUser.accountId}
              </Text>
            </View>
          </View>
        </View>
        <Web23Input
          placeholder={t('Add Memo(optional)') || 'Add Memo(optional)'}
          value={memo}
          onChange={e => {
            setMemo(e);
          }}
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
                setShowReview(false);
                setLoading(true);
                const checksum = currentSendUser.accountId.slice(0, 4);
                let sendUserId = currentSendUser.accountId;
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
                await apiHandler('send_hbar', currentUser.token, {
                  accountId: currentUser.accountId,
                  sendAccountId: sendUserId,
                  amount: parseFloat(amount).toFixed(8).toString(),
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                });
                setLoading(false);
                setShowSuccess(true);
              } catch (e) {
                toast.show(t('Invalid operation') || '');
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

export default SendDetailScreen;
