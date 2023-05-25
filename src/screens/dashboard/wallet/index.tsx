import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

import {Screen} from 'layouts';

import DomainSectionScreen from './domain';

import {
  Web23Popup,
  Web23Avatar,
  Web23Input,
  Web23Toggle,
  Web23ChooseWallet,
  DashboardActionBar,
  Web23Button,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';
import apiHandler from 'utils/apiHandler';

import OnlineSVG from '../../../assets/icons/Online.svg';
import GearSVG from '../../../assets/icons/Gear.svg';
import SendSVG from '../../../assets/icons/Send.svg';
import PurchaseSVG from '../../../assets/icons/Purchase.svg';
import QRSVG from '../../../assets/icons/QR.svg';
import SwapSVG from '../../../assets/icons/Swap.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import ContentCopySVG from '../../../assets/icons/content_copy.svg';
import HbarSVG from '../../../assets/icons/hbar.svg';
import TransakLogoSVG from '../../../assets/icons/TransakLogo.svg';

// import BanxaLogo from "src/assets/icons/BanxaLogo.png";
// import MoonpayLogo from "src/assets/icons/MoonpayLogo.png";
const SEND = 0;
const PURCHASE = 1;
const RECEIVE = 2;
const SWAP = 3;

type Toggle = {
  name: string;
  address: string;
  checked: boolean;
  amount: string;
  image?: string;
};

type IKey = {key: string; _type: string};

type IPopularToken = {
  admin_key: IKey;
  auto_renew_account: string;
  auto_renew_period: string;
  created_timestamp: string;
  custom_fees: {fixed_fees: string[]; fractional_fees: string[]};
  decimals: string;
  deleted: boolean;
  freeze_key: IKey;
  initial_supply: string;
  max_supply: string;
  memo: string;
  name: string;
  pause_status: string;
  supply_key: IKey;
  supply_type: string;
  symbol: string;
  token_id: string;
  treasury_account_id: string;
  type: string;
  image?: string;
};

const DashboardWalletScreen: React.FC<{extended?: boolean}> = ({
  extended = false,
}) => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showTokenMng, setShowTokenMng] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const [showReceive, setShowReceive] = useState<boolean>(false);
  const [showDeposit, setShowDeposit] = useState<boolean>(false);
  const [tab, setTab] = useState(PURCHASE);
  const [hbarPrice, setHbarPrice] = useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>('');
  const [toggles, setToggles] = useState<Toggle[]>();
  const [showAsset, setShowAsset] = useState<boolean>(false);
  const [balance, setBalance] = useState<{
    hbar: string;
    amount: string;
  }>({hbar: '0.0', amount: '0.0'});
  const [allDomain, setAllDomain] = useState<{
    web2?: {name: string; expired?: string}[];
    web3?: {name: string; expired?: string; url: string}[];
  }>();
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser,
  );
  const [popularTokens, setPopularTokens] = useState<IPopularToken[]>([]);
  const [associate, setAssociate] = useState<{
    name: string;
    address: string;
    checked: boolean;
  }>({name: '', address: '', checked: false});
  const [showAssociate, setShowAssociate] = useState<boolean>(false);
  const tabHeaders = [
    {
      icon: <SendSVG stroke="#9E9E9E" fill="transparent" />,
      title: t('Send'),
    },
    {
      icon: <PurchaseSVG stroke="#9E9E9E" fill="transparent" />,
      title: t('Purchase'),
    },
    {
      icon: <QRSVG stroke="#9E9E9E" fill="transparent" />,
      title: t('Receive'),
    },
    {
      icon: <SwapSVG stroke="#9E9E9E" fill="transparent" />,
      title: t('Swap'),
    },
  ];
  const toast = useToast();

  const asyncOperations = async () => {
    setLoading(true);
    try {
      await getAllDomain();
      await getBalance();
      await getHbarPrice();
      await getTokens();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const getAllDomain = async () => {
    try {
      const {web3Domain} = await apiHandler('get_tld', currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: '0.0.1680808',
      });

      const web3 = await Promise.all(
        web3Domain.map((url: any) => axios.get(url)),
      );

      let domain = null;
      if (settings.godaddyInfo.gkey && settings.godaddyInfo.gsecret) {
        domain = await apiHandler('get_domain', currentUser.token, {
          sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        });
      }

      setAllDomain({
        web2: domain?.domain.map((item: {domain: string; expires: string}) => ({
          name: item.domain,
          expired: item.expires,
        })),
        web3: web3.map(item => ({
          name: item.data.name,
          url: 'https://ipfs.io/ipfs/' + item.data.image.slice(7),
        })),
      });
    } catch (e) {
      setLoading(false);
    }
  };

  const getBalance = async () => {
    const {hbar, amount} = await apiHandler('get_balance', currentUser.token, {
      accountId: currentUser.accountId,
      net: currentUser.net,
      currency: currentUser.currency.label,
    });

    setBalance({hbar, amount});
  };

  const getTokens = async () => {
    const {popularToken} = await apiHandler(
      'get_tokenInfo',
      currentUser.token,
      {
        tokenId: '',
        accountId: currentUser.accountId,
        net: currentUser.net,
      },
    );
    setPopularTokens(popularToken);
  };

  const getHbarPrice = async () => {
    const {data} = await axios(
      'https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=usd&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8',
    );
    setHbarPrice(parseFloat(data.USD));
  };

  useEffect(() => {
    asyncOperations();
  }, [currentUser]);

  const changeAssociation = (changeToken: Toggle) => {
    setTimeout(() => {
      setAssociate({
        name: changeToken.name,
        address: changeToken.address,
        checked: changeToken.checked,
      });
      setShowAssociate(true);
    }, 300);
  };

  useEffect(() => {
    const states = [];
    for (const item of popularTokens) {
      states.push({
        name: item.name || 'unknown',
        address: item.token_id,
        checked: false,
        amount: '0',
        image: item.image,
      });
    }
    setToggles(states);
  }, [popularTokens]);

  return (
    <>
      <Screen loading={loading}>
        <View
          style={tw`flex flex-row justify-center px-6 py-3 ${
            currentUser.net ? 'mb-6' : ''
          }`}>
          <View style={tw`w-[184px]`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center w-full gap-3 p-2 pr-3 bg-grey-900 active:bg-grey-800 rounded-3xl`}
              onPress={() => {
                setShowWalletList(true);
                setShowTokenMng(false);
                setShowNetType(false);
                setShowEditWallet(false);
              }}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Web23Avatar
                  name={currentUser.userName}
                  color={currentUser.themeColor}
                  type={currentUser.type}
                />
                <Text
                  style={tw`  overflow-hidden whitespace-nowrap truncate w-[96px] font-bold text-base text-grey-50 py-1`}>
                  {currentUser.userName}
                </Text>
              </View>
              <ArrowDownSVG fill="#9E9E9E" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={tw`flex flex-row gap-6 p-3 mt-1 ml-8`}>
            <OnlineSVG />
            <GearSVG
              fill="transparent"
              stroke="#9E9E9E"
              onPress={() => navigation.navigate('SettingScreen')}
            />
          </TouchableOpacity>
        </View>
        {!currentUser.net && (
          <Text
            style={tw`bg-[#FF9F0A] py-2 font-bold text-sm text-black text-center mb-4`}>
            {t('You are on Testnet')}
          </Text>
        )}
        <View>
          <Text
            style={tw`uppercase font-bold text-sm tracking-[0.1em] text-grey-400 text-center mb-2`}>
            {t('WALLET VALUE')}
          </Text>
          <View
            style={tw`flex flex-row items-center justify-center gap-2 mb-2`}>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text
                style={tw`text-3xl leading-[48px] text-grey-400 font-black`}>
                ℏ
              </Text>
              <Text style={tw`text-2xl leading-[48px] text-white font-black`}>
                {balance.amount}
              </Text>
            </View>
            <HbarSVG />
          </View>
        </View>
        <View style={tw`flex flex-row justify-center w-full px-3 px-6 mt-4`}>
          <View style={tw`flex flex-row justify-center gap-3 mb-6`}>
            {tabHeaders.map((tabInf, index) => (
              <View
                key={`${tabInf.title}_${index}`}
                style={tw`flex flex-row flex-col items-center px-1 pt-2`}>
                <TouchableOpacity
                  style={tw`active:bg-green-500 active:text-black text-white bg-grey-900 rounded-full flex flex-row justify-center items-center w-[48px] h-[48px] mb-2`}
                  onPress={() => {
                    setTab(index);
                    switch (index) {
                      case RECEIVE:
                        setShowReceive(true);
                        break;
                      case PURCHASE:
                        setShowAsset(true);
                        break;
                      case SEND:
                        navigation.navigate('SendHbarScreen');
                        break;
                      case SWAP:
                        navigation.navigate('SwapTabScreen');
                        break;
                      default:
                        break;
                    }
                  }}>
                  {tabInf.icon}
                </TouchableOpacity>
                <Text style={tw`text-sm font-bold text-center text-grey-200`}>
                  {tabInf.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <DomainSectionScreen
          extended={extended}
          setLoading={setLoading}
          setShowTokenMng={setShowTokenMng}
          allDomain={allDomain}
          setAllDomain={setAllDomain}
          balance={balance}
        />

        <View style={tw`px-0 pb-0`}>
          <DashboardActionBar selected={0} />
        </View>
      </Screen>

      <Web23Popup
        show={showTokenMng}
        setShow={setShowTokenMng}
        title={t('Manage Tokens') || 'Manage Tokens'}>
        <>
          <View style={tw`relative mb-4`}>
            <Web23Input
              placeholder={t('Search by name or address')}
              className="pr-[62px]"
              value={searchKey}
              onChange={e => setSearchKey(e as string)}
            />
            <Text
              style={tw`absolute top-4 right-[20px] font-medium text-sm text-lime-500`}
              onPress={async () => {
                const text = await Clipboard.getString();
                setSearchKey(text);
              }}>
              {t('PASTE')}
            </Text>
          </View>
          <View
            style={tw`bg-grey-900 rounded-xl px-3 pt-[18px] pb-[10px] mb-4`}>
            <Text style={tw`  font-bold text-sm text-grey-200 mb-[10px]`}>
              {t('Enabled Tokens')}
            </Text>
            <View style={tw`  max-h-[100px]`}>
              <View style={tw`flex flex-row items-center justify-between`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <View style={tw`w-10 h-10 bg-white rounded-full`} />
                  <View style={tw`py-1 text-base font-bold`}>
                    <Text style={tw`  mb-[2px] text-grey-50`}>HBAR</Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      ℏ {balance.hbar}
                    </Text>
                  </View>
                </View>
              </View>
              {toggles
                ?.filter(toggle => toggle.checked)
                ?.map((item, index) => (
                  <View
                    style={tw`flex flex-row items-center justify-between`}
                    key={`${item.name}_${index}`}>
                    <View style={tw`flex flex-row items-center gap-3`}>
                      <View style={tw`w-10 h-10 bg-white rounded-full`}>
                        {item.image && (
                          <Image source={{uri: item.image}} alt="nft" />
                        )}
                      </View>
                      <View style={tw`py-1 text-base font-bold`}>
                        <Text style={tw`  mb-[2px] text-grey-50`}>
                          {item.name}
                        </Text>
                        <Text style={tw`text-xs text-grey-400`}>
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                    <Web23Toggle
                      // variant="secondary"
                      checked={item.checked}
                      setChecked={() => {
                        changeAssociation(item);
                      }}
                    />
                  </View>
                ))}
            </View>
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <View style={tw`px-3 pt-4 pb-2`}>
              <Text style={tw`text-sm font-bold text-grey-200`}>
                {t('Available Tokens')}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {t('Associating a token with your wallet costs $0.05')}
              </Text>
            </View>
            <View style={tw`max-h-[150px] rounded-b-xl`}>
              {toggles?.filter(
                toggle =>
                  !toggle.checked &&
                  (toggle.name
                    .toLocaleLowerCase()
                    .includes(searchKey.toLowerCase()) ||
                    toggle.address
                      .toLowerCase()
                      .includes(searchKey.toLowerCase())),
              ).length
                ? toggles
                    ?.filter(
                      toggle =>
                        !toggle.checked &&
                        (toggle.name
                          .toLocaleLowerCase()
                          .includes(searchKey.toLowerCase()) ||
                          toggle.address
                            .toLowerCase()
                            .includes(searchKey.toLowerCase())),
                    )
                    ?.map((item, index) => (
                      <View
                        style={tw`flex flex-row items-center justify-between ${
                          index !== toggles.length - 1
                            ? 'border-b border-b-grey-800'
                            : ''
                        }`}
                        key={`${item.name}_${index}`}>
                        <View
                          style={tw`flex flex-row gap-3 py-[10px] px-3 items-center`}>
                          <View style={tw`w-10 h-10 bg-white rounded-full`} />
                          <View style={tw`py-1`}>
                            <Text
                              style={tw`pb-[2px] font-bold text-base text-grey-50`}>
                              {item.name}
                            </Text>
                            <Text style={tw`text-xs font-bold text-grey-400`}>
                              {item.address}
                            </Text>
                          </View>
                        </View>
                        <View style={tw`pr-3`}>
                          <Web23Toggle
                            // variant="secondary"
                            checked={item.checked}
                            setChecked={() => {
                              changeAssociation(item);
                            }}
                          />
                        </View>
                      </View>
                    ))
                : searchKey !== '' && (
                    <View>
                      <View
                        style={tw`flex flex-row items-center justify-between`}
                        key={'unknown'}>
                        <View
                          style={tw`flex flex-row gap-3 py-[10px] px-3 items-center`}>
                          <View style={tw`w-10 h-10 bg-white rounded-full`} />
                          <View style={tw`py-1`}>
                            <Text
                              style={tw`pb-[2px] font-bold text-base text-grey-50`}>
                              {t('unknown')}
                            </Text>
                            <Text style={tw`text-xs font-bold text-grey-400`}>
                              {searchKey}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={tw`pr-3 text-lime-500 `}
                          onPress={async () => {
                            let data: any;
                            if (currentUser.net) {
                              data = await axios(
                                `https://mainnet-public.mirrornode.hedera.com/v1/tokens/${searchKey}`,
                              );
                            } else {
                              data = await axios(
                                `https://testnet.mirrornode.hedera.com/api/v1/tokens/${searchKey}`,
                              );
                            }
                            if (data.data) {
                              setToggles(prev =>
                                prev?.concat({
                                  address: searchKey,
                                  amount: '0',
                                  checked: false,
                                  name: data?.data.name,
                                }),
                              );
                            }
                          }}>
                          {t('Add')}
                        </Text>
                      </View>
                    </View>
                  )}
            </View>
          </View>
        </>
      </Web23Popup>

      <Web23Popup
        title={t('Your QR Code') || 'Your QR Code'}
        show={showReceive && tab === RECEIVE}
        setShow={() => setShowReceive(false)}>
        <View style={tw`mt-4`}>
          <View style={tw`flex flex-row justify-center`}>
            <View
              style={tw`w-[240px] h-[240px] rounded-[32px] bg-white mb-4 flex flex-row justify-center items-center`}>
              <QRCode size={208} value={currentUser.accountId} />
            </View>
          </View>
          <Text style={tw`mb-2 text-xl font-bold text-center text-white`}>
            {currentUser.userName}
          </Text>
          <View style={tw`flex flex-row justify-center`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-1 px-3 py-2 mb-6 bg-grey-800 rounded-3xl active:bg-grey-700`}
              onPress={() => {
                Clipboard.setString(currentUser.accountId);
                toast.show(t('Copied to clipboard') || '');
              }}>
              <Text style={tw`text-sm font-bold text-center text-grey-50`}>
                {currentUser.accountId}
              </Text>
              <ContentCopySVG fill="#D7FC51" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 mb-8 bg-grey-900 rounded-xl active:bg-grey-800`}
            onPress={() => {
              setShowReceive(false);
              setShowDeposit(true);
            }}>
            <View style={tw`flex flex-row items-center gap-3 py-2`}>
              <HbarSVG />
              <Text style={tw`py-2 text-base font-bold text-grey-50`}>
                Deposit HBAR
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Deposit HBAR') || 'Deposit HBAR'}
        show={showDeposit}
        setShow={setShowDeposit}>
        <Text style={tw`my-4 text-sm font-bold text-grey-200`}>
          {t('Buy HBAR using Transak')}
        </Text>
        <View
          style={tw`flex flex-row items-center justify-between mb-8 px-3 py-[10px] bg-grey-900 rounded-xl active:bg-grey-800`}>
          <View
            style={tw`flex flex-row items-center gap-3 text-base font-bold text-grey-50`}>
            <TransakLogoSVG />
            <Text>Transak</Text>
          </View>
          <ArrowDownSVG
            style={{transform: [{rotate: '-90deg'}]}}
            fill="#9E9E9E"
          />
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Buy Assets') || 'Buy Assets'}
        show={showAsset}
        setShow={setShowAsset}>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] text-sm font-bold text-grey-200`}>
            {t('Buy using Banxa or Moonpay')}
          </Text>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-[10px] active:bg-grey-800`}
            onPress={() => navigation.navigate('DomainSectionDetailScreen')}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <View>
                <Image
                  source={require('../../../assets/icons/BanxaLogo.png')}
                  alt="Banxa logo"
                />
              </View>
              <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                Banxa
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-[10px] rounded-b-xl active:bg-grey-800`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <View>
                <Image
                  source={require('../../../assets/icons/BanxaLogo.png')}
                  alt="Banxa logo"
                />
              </View>
              <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                Moonpay
              </Text>
            </View>
            <ArrowDownSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </View>
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Associate Token') || 'Associate Token'}
        show={showAssociate}
        setShow={setShowAssociate}>
        <Text style={tw`my-4 text-base font-bold text-grey-200`}>
          {t(
            'Associating or Dissociating with your wallet costs $0.05. Do you want to continue?',
          )}
        </Text>
        <Web23Button
          text={t('Confirm') || 'Confirm'}
          onPress={async () => {
            try {
              setLoading(true);
              setShowAssociate(false);
              setShowTokenMng(false);
              await apiHandler('change_association', currentUser.token, {
                tokenId: associate.address,
                net: currentUser.net,
                type: associate.checked,
                accountId: currentUser.accountId,
                priv: currentUser.privKey,
              });

              setToggles(toggles => {
                const newState = toggles?.map(item =>
                  item.address === associate.address
                    ? {...item, checked: !item.checked}
                    : item,
                );
                return newState;
              });

              setLoading(false);
              toast.show(t('Association or Dissociation is succeeded.') || '');
            } catch (e) {
              setLoading(false);
              toast.show(t('Association or Dissociation is failed.') || '');
            }
          }}
        />
        <Text
          style={tw`p-4 mt-4 mb-8 text-sm font-bold text-center underline text-lime-500 active:text-green-500`}
          onPress={() => {
            setAssociate({name: '', address: '', checked: false});
            setShowAssociate(false);
          }}>
          Cancel
        </Text>
      </Web23Popup>

      <Web23ChooseWallet
        extraOpt={asyncOperations}
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

export default DashboardWalletScreen;
