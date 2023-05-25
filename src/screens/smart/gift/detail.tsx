import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Screen} from 'layouts';

import {
  Web23Avatar,
  Web23Button,
  Web23Popup,
  Web23Input,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import SMHBarSVG from '../../../assets/icons/sm_hbar.svg';
import EditSVG from '../../../assets/icons/edit_fill.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';
import TokenSVG from '../../../assets/icons/token_sm.svg';
import LgHBarSVG from '../../../assets/icons/lg_hbar.svg';
import CheckCircleSVG from '../../../assets/icons/check_circle.svg';
import DoubleArrowSVG from '../../../assets/icons/double_arrow.svg';
import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';
import TokenMDSVG from '../../../assets/icons/token_md.svg';

const GiftSendDetailScreen: React.FC<{route: any}> = ({route}) => {
  const {
    accountId = '',
    userName = '',
    type = 'initial',
    name = '',
    value = '',
    amount = '',
    tokenId = '',
  } = route.params;
  const navigation = useWeb23Navigation();
  const [loading, setLoading] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const currentSendUser = currentUser.contacts.filter(
    item => item.accountId === accountId && accountId,
  )[0] || {accountId, userName, type};
  const [showEditContact, setShowEditContact] = useState<boolean>(false);
  const [sendAmount, setSendAmount] = useState<string>('');
  const [showReview, setShowReview] = useState<boolean>(false);
  const [walletName, setWalletName] = useState<string>(userName);
  const [editType, setEditType] = useState<'initial' | 'icon'>(type);
  const [memo, setMemo] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  return (
    <>
      <Screen loading={loading}>
        <ScreenTitle
          title="Gift tokens"
          onPress={() =>
            navigation.navigate('SendGiftScreen', {
              name,
              value,
              amount,
              tokenId,
            })
          }
        />
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
              <Text
                style={tw`flex flex-row text-base font-bold text-grey-50 mb-[2px]`}>
                {currentSendUser.userName}
              </Text>
              <Text style={tw`flex flex-row text-xs font-bold text-grey-400`}>
                {currentSendUser.accountId}
              </Text>
            </View>
          </View>
          <EditSVG fill="#9E9E9E" onPress={() => setShowEditContact(true)} />
        </View>
        <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
          <View style={tw`px-3 py-[10px] flex flex-row justify-between`}>
            <View style={tw`py-[6px] pl-[1px]`}>
              <Web23Input
                placeholder="Enter amount"
                value={sendAmount}
                onChange={e => setSendAmount(e)}
              />
            </View>
            <View
              style={tw`flex flex-row items-center gap-1 p-2 rounded-[100px] bg-grey-800 active:bg-grey-700`}>
              <View
                style={tw`flex flex-row items-center justify-center w-6 h-6 bg-indigo-500 rounded-full`}>
                <TokenSVG />
              </View>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Text
                  style={tw`flex flex-row text-base font-bold text-white uppercase`}>
                  {name}
                </Text>
                <ArrowSVG fill="#9E9E9E" />
              </View>
            </View>
          </View>
          <View style={tw`border-grey-800 w-full h-[1px]`} />
          <View
            style={tw`flex flex-row justify-between px-3 py-4 text-xs font-bold`}>
            <Text style={tw`flex flex-row text-green-500`}>MAX</Text>
            <Text style={tw`flex flex-row text-grey-400`}>
              Current Balance: {amount} HBAR
            </Text>
          </View>
        </View>
        <View
          style={tw`flex flex-row items-center justify-between px-3 py-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200`}>
          <Text style={tw`flex flex-row`}>Transaction Fees</Text>
          <View style={tw`flex flex-row items-center gap-4`}>
            <Text>ℏ0.5</Text>
            <ArrowSVG style={tw`rotate-180`} fill="#9E9E9E" />
          </View>
        </View>
        <Web23Button
          text="Review"
          disabled={sendAmount.length ? false : true}
          onPress={() => setShowReview(true)}
        />
      </Screen>
      <Web23Popup
        show={showEditContact}
        setShow={setShowEditContact}
        title="Edit Contact">
        <View style={tw`absolute top-[14px] right-6`}>
          <Web23Button
            text="Delete"
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
              navigation.navigate('SendGiftScreen');
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
            placeholder="Enter name"
            limit={32}
            value={walletName}
            onChange={e => {
              if (e.length > 31) setWalletName(e.slice(0, 32));
              else setWalletName(e);
            }}
          />
        </View>
        <View
          style={tw`bg-grey-900 px-3 py-[10px] rounded-xl flex flex-row justify-between items-center mb-4`}>
          <View style={tw`flex flex-row items-center gap-3`}>
            <LgHBarSVG />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
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
            Wallet Customization
          </Text>
          <View style={tw`flex flex-row justify-between px-6 py-[10px]`}>
            <TouchableOpacity
              style={tw.style(
                'flex flex-row items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent',
                editType === 'initial' && 'border-lime-500',
              )}
              onPress={() => setEditType('initial')}>
              <Web23Avatar name={walletName} color="red" type="initial" />
              <View style={tw`py-1`}>
                <Text style={tw`font-bold text-base text-grey-50 mb-[2px]`}>
                  Initial
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  Character
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'flex flex-row items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent',
                editType === 'icon' && 'border-lime-500',
              )}
              onPress={() => setEditType('icon')}>
              <Web23Avatar name={walletName} color="red" type="icon" />
              <View style={tw`py-1`}>
                <Text style={tw`font-bold text-base text-grey-50 mb-[2px]`}>
                  Icon
                </Text>
                <Text style={tw`text-xs font-bold text-grey-400`}>
                  Wallet Icon
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`border-grey-800 w-full h-[1px]`} />
          <View style={tw`p-1`}>
            <Web23Button
              text="Save changes"
              onPress={() => {
                const newUser = settings.userData.map(item => {
                  let contact = item.contacts;
                  if (item.accountId === currentUser.accountId)
                    contact = item.contacts.map(it => {
                      if (it.accountId === accountId)
                        return {
                          accountId,
                          userName: walletName,
                          type: editType,
                        };
                      else return it;
                    });
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
        title="Review Transaction"
        show={showReview}
        setShow={setShowReview}>
        <View
          style={tw`flex flex-row justify-between p-6 my-4 bg-grey-900 rounded-xl`}>
          <View>
            <View style={tw`flex flex-row justify-center`}>
              <View
                style={tw`w-[64px] h-[64px] bg-indigo-500 flex flex-row items-center justify-center rounded-full`}>
                <TokenMDSVG />
              </View>
            </View>
            <View style={tw`py-1 mt-3`}>
              <Text
                style={tw`text-base font-bold text-grey-50 mb-[2px] text-center`}>
                {amount} $DILIP
              </Text>
              <Text style={tw`text-xs font-bold text-center text-grey-400`}>
                {currentUser.currency.symbol}
                1500
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
          placeholder="Add Memo(optional)"
          value={memo}
          onChange={e => {
            setMemo(e);
          }}
        />
        <View
          style={tw`flex flex-row items-center justify-between px-3 py-4 my-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200`}>
          <Text>Transaction Fees</Text>
          <View style={tw`flex flex-row items-center gap-4`}>
            <Text>ℏ0.5</Text>
            <ArrowSVG style={tw`rotate-180`} fill="#9E9E9E" />
          </View>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text="Confirm transaction"
            onPress={() => {
              setShowReview(false);
              setShowSuccess(true);
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title="Transaction Initiated"
        show={showSuccess}
        setShow={setShowSuccess}>
        <View style={tw`flex flex-row justify-center mt-4 mb-3`}>
          <CompleteSVG />
        </View>
        <Text style={tw`mb-8 text-base font-medium text-center text-grey-200`}>
          Your transaction is initiated and will go through in a few minutes. We
          shall keep you updated.
        </Text>
      </Web23Popup>
    </>
  );
};

export default GiftSendDetailScreen;
