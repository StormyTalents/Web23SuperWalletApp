import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Avatar, Web23ChooseWallet, DashboardActionBar} from 'components';

import {useWeb23Navigation} from 'navigation';

import apiHandler from 'utils/apiHandler';
import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import LgHBarSVG from '../../../assets/icons/lg_hbar.svg';
import ArrowReceiveSVG from '../../../assets/icons/arrow_receive.svg';
import ArrowSentSVG from '../../../assets/icons/arrow_sent.svg';
import WarningSVG from '../../../assets/icons/warning.svg';

type ITransactionValue = {
  accountId: string;
  amount: number;
  date: Date;
};

type ITransaction = {
  date: string;
  value: ITransactionValue[];
};

type IContact = {
  userName: string;
  accountId: string;
  type: 'initial' | 'icon';
};

const DashboardHistoryScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hbarPrice, setHbarPrice] = useState<number>(0);
  const [currentContact, setCurrentContact] = useState<IContact[]>();
  const today =
    new Date().toLocaleString('default', {month: 'long'}) +
    ' ' +
    new Date().getDay().toString();
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const {t} = useTranslation();
  const getHistory = async () => {
    const {transactions} = await apiHandler('get_history', currentUser.token, {
      accountId: currentUser.accountId,
      net: currentUser.net,
    });

    const dateArray = [];

    for (let item of transactions) {
      const date = new Date(parseInt(item?.consensus_timestamp) * 1000);
      const ret =
        date.toLocaleString('default', {month: 'long'}) +
        ' ' +
        date.getDay().toString();
      if (!dateArray.find(it => ret === it)?.length) {
        dateArray.push(ret);
      }
    }

    setTransaction(
      dateArray.map(date => {
        const bin = transactions.filter((item: any) => {
          const transDate = new Date(
            parseInt(item?.consensus_timestamp) * 1000,
          );
          const transDateStr =
            transDate.toLocaleString('default', {month: 'long'}) +
            ' ' +
            transDate.getDay().toString();
          return transDateStr === date;
        });

        return {
          date,
          value: bin?.map((txData: any) => {
            let element: ITransactionValue = {
              accountId: '',
              amount: 0,
              date: new Date(0),
            };
            if (txData?.transfers[2]?.account === currentUser.accountId) {
              element.accountId = txData?.transfers[3]?.account;
              element.amount = txData?.transfers[3]?.amount;
            } else {
              element.accountId = txData?.transfers[2]?.account;
              element.amount = txData?.transfers[2]?.amount;
            }
            return element;
          }),
        };
      }),
    );
  };

  const getHbarPrice = async () => {
    const {data} = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=${currentUser.currency.label.toLowerCase()}&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`,
    );
    setHbarPrice(parseFloat(data[`${currentUser.currency.label}`]));
  };

  const getCurrentContact = async () => {
    const resContact: IContact[] = [];
    for (let conItem of currentUser.contacts) {
      if (conItem.accountId !== '' && conItem.userName !== '') {
        const checksum = conItem.accountId.slice(0, 4);
        let binId = conItem.accountId;
        if (checksum !== '0.0.') {
          try {
            const {accountId} = await apiHandler(
              'resolve_domain',
              currentUser.token,
              {
                resolveId: binId,
              },
            );
            binId = accountId[0]?.ownerAddress;
          } catch (e) {}
        }
        resContact.push({
          userName: conItem.userName,
          accountId: binId,
          type: 'icon',
        });
      }
    }
    setCurrentContact(resContact);
  };

  const asyncOperation = async () => {
    setLoading(true);
    try {
      await getHbarPrice();
      await getHistory();
      await getCurrentContact();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncOperation();
  }, [currentUser]);

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`w-full h-full flex justify-between`}>
          <View style={tw`w-full flex flex-row justify-between`}>
            <View
              style={tw`px-3 py-[10px] flex flex-row items-center justify-between mb-[18px]`}>
              <Text style={tw`text-xl font-bold text-white`}>
                {t('Activity')}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-2 p-2 bg-grey-900 rounded-3xl active:bg-grey-800`}
              onPress={() => setShowWalletList(true)}>
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type="initial"
              />
              <ArrowDownSVG fill="#F4F4F4" />
            </TouchableOpacity>
          </View>
          <View>
            <View style={tw`max-h-[440px]`}>
              {transaction.map((txData, indexId) => (
                <View
                  key={txData.date + indexId}
                  style={tw`mb-4 bg-grey-900 rounded-xl`}>
                  <Text
                    style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200`}>
                    {today === txData.date ? 'Today' : txData.date}
                  </Text>
                  {txData.value.map((item, index) => (
                    <View
                      key={item.accountId + index.toString()}
                      style={tw`active:bg-grey-800 flex flex-row justify-between items-center ${
                        index === txData.value.length - 1
                          ? 'rounded-b-xl'
                          : 'border-b border-b-grey-800'
                      }`}>
                      <View
                        style={tw`px-3 py-[10px] flex flex-row gap-3 items-center`}>
                        <View
                          style={tw`relative ${
                            item.accountId === undefined ? 'opacity-50' : ''
                          }`}>
                          <LgHBarSVG />
                          <View style={tw`absolute bottom-0 -right-1`}>
                            {item.amount < 0 ? (
                              <ArrowReceiveSVG />
                            ) : (
                              <ArrowSentSVG />
                            )}
                          </View>
                        </View>
                        <View style={tw`py-[2px]`}>
                          <Text
                            style={tw`mb-1 text-base font-bold text-grey-50 ${
                              item.amount === undefined ? 'opacity-50' : ''
                            }`}>
                            {item.amount < 0 ? 'Received HBAR' : 'Sent HBAR'}
                          </Text>
                          <Text
                            style={tw`text-xs font-bold text-grey-400 ${
                              item.accountId === undefined ? 'opacity-50' : ''
                            }`}>
                            {item.accountId === undefined
                              ? 'invalid'
                              : item.amount < 0
                              ? 'from '
                              : 'to '}
                            {(item.accountId !== undefined &&
                              currentContact?.find(conItem => {
                                return conItem.accountId === item.accountId;
                              })?.userName) ||
                              item.accountId}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={tw`px-3 py-[10px] flex flex-row gap-3 items-center`}>
                        <View style={tw`py-1 text-right`}>
                          <Text
                            style={tw`mb-[6px] font-bold text-sm ${
                              item.amount < 0
                                ? 'text-green-600'
                                : 'text-[#FF3D50]'
                            } ${
                              item.amount === undefined ? 'opacity-50' : ''
                            }`}>
                            {item.amount === undefined
                              ? ''
                              : item.amount < 0
                              ? '+'
                              : '-'}
                            {item.amount === undefined
                              ? 'invalid'
                              : currentUser.currency.symbol +
                                Math.abs((item.amount / 100000000) * hbarPrice)
                                  .toFixed(2)
                                  .toString()}
                          </Text>
                          <View
                            style={tw`text-xs font-bold ${
                              item.amount === undefined
                                ? 'text-[#FF3D50]'
                                : 'text-grey-400  '
                            }`}>
                            {item.amount === undefined ? (
                              <View
                                style={tw`flex flex-row items-center gap-[2px]`}>
                                <View>
                                  <WarningSVG />
                                </View>
                                <Text>Failed</Text>
                              </View>
                            ) : (
                              Math.floor((item.amount * -1) / 100000000) +
                              'HBAR'
                            )}
                          </View>
                        </View>
                        <ArrowDownSVG
                          style={{transform: [{rotate: '-90deg'}]}}
                          fill="#9e9e9e"
                        />
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
            <View style={tw`px-0 pb-0`}>
              <DashboardActionBar selected={3} />
            </View>
          </View>
        </View>
      </Screen>

      <Web23ChooseWallet
        extraOpt={asyncOperation}
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />
    </>
  );
};

export default DashboardHistoryScreen;
