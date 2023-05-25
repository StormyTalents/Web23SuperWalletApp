import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {
  ScreenTitle,
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import {API_SMART_ENDPOINT_URL, PINATA} from 'config';

import TitleSVG from '../../../assets/icons/title.svg';
import CheckSVG from '../../../assets/icons/check.svg';
import MoneySVG from '../../../assets/icons/attach_money_black.svg';
import TokenSVG from '../../../assets/icons/token_sm.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const progressBar = ['Choose Name', 'Set Supply & Value', 'Final Confirmation'];

const SocialTokenSetupProcessScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [tab, setTab] = useState<number>(0);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [tokenName, setTokenName] = useState<string>('');
  const [supply, setSupply] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`flex justify-between h-full`}>
          <View>
            <ScreenTitle
              title={t('Setup Social tokens') || 'Setup Social tokens'}
              onPress={() => navigation.navigate('SetupSocialTokenScreen')}
            />
            <View
              style={tw`flex flex-row justify-around py-2 mt-8 bg-grey-900`}>
              {progressBar.map((item, index) => (
                <View key={'progressBar_item_' + index}>
                  <View style={tw`flex flex-row justify-center`}>
                    <View
                      style={tw.style(
                        'relative flex flex-row items-center justify-center w-5 h-5 mb-2 rounded-full border',
                        index === tab
                          ? 'border-lime-500 bg-lime-500'
                          : index < tab
                          ? 'bg-transparent border-lime-500'
                          : 'bg-transparent border-grey-300',
                      )}>
                      <View
                        style={tw.style(
                          'after:h-[2px] after:left-[20px] after:w-[38px] after:absolute after:top-[8px] before:left-[-34px] before:h-[2px] before:w-[34px] before:absolute before:top-[8px]',
                          index === 0
                            ? 'first:before:content-none'
                            : "before:content-['']",
                          index === 2
                            ? 'last:after:content-none'
                            : "after:content-['']",
                          index <= tab
                            ? 'after:bg-lime-500 before:bg-lime-500 text-black'
                            : 'after:bg-[#686868] before:bg-[#686868] text-grey-300',
                        )}>
                        {index < tab ? (
                          <CheckSVG fill="#D7FC51" style={tw`pb-1`} />
                        ) : (
                          <Text style={tw`font-medium text-medium`}>
                            {index + 1}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text
                    style={tw`text-sm font-bold text-center text-white w-[90px]`}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row items-center justify-center mb-4`}>
              <View
                style={tw`flex flex-row items-center justify-center w-12 h-12 rounded-2xl bg-grey-900`}>
                {tab === 0 && <TitleSVG />}
                {tab === 1 && <MoneySVG />}
              </View>
            </View>
            <Text
              style={tw`mb-6 text-base font-bold text-center text-grey-200`}>
              {tab === 0 && 'Choose Token Name'}{' '}
              {tab === 1 && 'Set Supply and value for ' + tokenName}
            </Text>
            <View style={tw`px-8`}>
              {tab === 0 && (
                <>
                  <Web23Input
                    placeholder="Token Name"
                    value={tokenName}
                    onChange={e => setTokenName(e)}
                  />
                  <Text
                    style={tw`mt-4 text-sm font-bold text-center text-grey-400`}>
                    {t(
                      'Token name should use 4-6 characters and should be alphanumeric only',
                    )}
                  </Text>
                </>
              )}
              {tab === 1 && (
                <View>
                  <View style={tw`flex flex-col gap-4`}>
                    <Web23Input
                      placeholder={t('Supply') || 'Supply'}
                      value={supply}
                      onChange={e => setSupply(e)}
                    />
                    <Web23Input
                      placeholder={t('Value') || 'Value'}
                      value={value}
                      onChange={e => setValue(e)}
                    />
                  </View>
                  <Text
                    style={tw`mt-4 text-sm font-bold text-center text-grey-400`}>
                    Total value of your {tokenName} would be ${value || '0'} (~
                    {supply || '0'} HBAR)
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={tw`pb-8`}>
            <Web23Button
              text={t('Continue') || 'Continue'}
              onPress={() => setTab(prev => prev + 1)}
            />
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Review Transaction') || 'Review Transaction'}
        show={tab === 2}
        setShow={() => {}}>
        <View style={tw`mt-4 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200`}>
            {t('Creating')}
          </Text>
          <View
            style={tw`flex flex-row items-center gap-3 border-b border-grey-800 px-3 py-[10px] active:bg-grey-800`}>
            <View
              style={tw`flex flex-row items-center justify-center w-10 h-10 bg-indigo-500 rounded-full`}>
              <TokenSVG />
            </View>
            <View style={tw`py-[2px]`}>
              <Text
                style={tw`mb-1 text-base font-bold text-grey-50 w-[220px] overflow-hidden truncate`}>
                {supply} tokens of {tokenName}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {t('Total Value') + ' = $'}
                {supply}
              </Text>
            </View>
          </View>
          <View
            style={tw`flex flex-row items-center gap-3 rounded-b-xl px-3 py-[10px] active:bg-grey-800 mb-4`}>
            <Web23Avatar
              name={currentUser.userName}
              color={currentUser.themeColor}
              size="sm"
              type={currentUser.type}
            />
            <View style={tw`py-[2px]`}>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {currentUser.userName}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {currentUser.accountId}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw`flex flex-row justify-between px-3 py-4 my-4 border rounded-xl border-grey-800`}>
          <Text style={tw`  text-sm font-bold text-grey-200`}>
            {t('Transaction Fees')}
          </Text>
          <View style={tw`flex flex-row items-center gap-2`}>
            <Text style={tw`flex flex-row text-sm font-bold text-grey-200`}>
              ℏ0.5
            </Text>
            <ArrowDownSVG style={tw`-rotate-180`} fill="#9E9E9E" />
          </View>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text="Confirm transaction"
            onPress={async () => {
              try {
                setLoading(true);

                const config = {
                  method: 'post',
                  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                  headers: {
                    pinata_api_key: `${PINATA.key}`,
                    pinata_secret_api_key: `${PINATA.secret}`,
                    'Content-Type': 'application/json',
                  },
                  data: JSON.stringify({
                    name: tokenName,
                    img: 'ipfs/QmejFq6TRhDRmvUux7Kp7gGheNzJfbQUawGiUittcdEfg7',
                    symbol: 'FT',
                    description: 'web23 social token',
                    amount: supply,
                    chainName: 'Hedera',
                  }),
                };

                const hash = await axios(config);

                const {data} = await axios({
                  method: 'post',
                  url: API_SMART_ENDPOINT_URL + 'socialToken/create',
                  data: {
                    user_id: currentUser.smartUid,
                    metadataHash: hash.data.IpfsHash,
                    metadata: {
                      name: tokenName,
                      img: 'ipfs/QmejFq6TRhDRmvUux7Kp7gGheNzJfbQUawGiUittcdEfg7',
                      symbol: 'FT',
                      description: 'web23 social token',
                      amount: supply,
                      chainName: 'Hedera',
                    },
                  },
                });

                setLoading(false);

                if (data?.data?.tokenId) {
                  navigation.navigate('SuccessSocialTokenSetupScreen', {
                    tokenName: tokenName,
                    supply,
                    value,
                    name: currentUser.userName,
                  });
                }
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </View>
      </Web23Popup>
    </>
  );
};

export default SocialTokenSetupProcessScreen;
