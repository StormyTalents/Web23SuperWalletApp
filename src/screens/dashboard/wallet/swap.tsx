import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';

import {View, TouchableOpacity, Text} from 'react-native';

import {Screen} from 'layouts';

import {
  ScreenTitle,
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23SearchBox,
} from 'components';

import {useWeb23Navigation} from 'navigation';

// import {SettingContext} from 'utils/context';
// import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';
import CircleCheckSVG from '../../../assets/icons/check_circle.svg';
import ArrowDropDownSVG from '../../../assets/icons/arrow_drop_down.svg';
import SwapSVG from '../../../assets/icons/swap_con.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import DoubleArrowSVG from '../../../assets/icons/double_arrow.svg';
import XlHBarSVG from '../../../assets/icons/xl_hbar.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';

const SwapTabScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [amount, setAmount] = useState<string>('');
  const [showChooseToken, setShowChooseToken] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [showChooseToToken, setShowChooseToToken] = useState<boolean>(false);
  const [swapto, setSwapto] = useState<string>('');
  const [showMax, setShowMax] = useState<boolean>(false);
  const [confirmPage, setConfirmPage] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [amountSwapto, setAmountSwapto] = useState<string>('');
  const {t} = useTranslation();

  return (
    <>
      <Screen>
        <ScreenTitle
          title={t('Swap Tokens') || 'Swap Tokens'}
          onPress={() => navigation.navigate('DashboardWalletScreen')}
        />
        <View style={tw`px-3 flex justify-center w-full h-auto`}>
          {!confirmPage ? (
            <>
              <View style={tw`my-4 bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
                  {t('Swap from')}
                </Text>
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
                      <Text
                        style={tw`  text-base font-bold text-white uppercase`}>
                        hbar
                      </Text>
                      <ArrowSVG fill="#9E9E9E" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={tw`border-grey-800 border-b-[1px]`} />
                <View
                  style={tw`flex flex-row justify-between px-3 py-4 font-bold rounded-b-xl`}>
                  <Text style={tw`  text-xs text-green-500`}>
                    {t('SWAP ALL')}
                  </Text>
                  <Text style={tw`  text-xs text-grey-400`}>
                    {t('Balance') + ': ℏ212,321 HBAR'}
                  </Text>
                </View>
              </View>
              <View style={tw`relative mb-4 bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
                  {t('Swap to')}
                </Text>
                {swapto === '' ? (
                  <View style={tw`flex flex-row justify-center py-4`}>
                    <TouchableOpacity
                      style={tw`flex flex-row items-center px-6 py-1 bg-white border-none   rounded-[32px]`}
                      onPress={() => setShowChooseToToken(true)}>
                      <Text style={tw`  text-base font-bold text-grey-900`}>
                        {t('Choose Token')}
                      </Text>
                      <ArrowDropDownSVG fill="#212121" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View
                      style={tw`px-3 py-[10px] flex flex-row justify-between`}>
                      <View style={tw`py-[6px] pl-[1px]`}>
                        <input
                          style={tw`text-xl font-bold bg-transparent   text-grey-400 w-[126px]`}
                          placeholder="0"
                          value={amountSwapto}
                          onChange={(e: any) => setAmountSwapto(e)}
                        />
                      </View>
                      <TouchableOpacity
                        style={tw`flex flex-row items-center gap-1 p-2 rounded-[100px] bg-grey-800 active:bg-grey-700`}
                        onPress={() => setShowChooseToToken(true)}>
                        <MDHBarSVG />
                        <View style={tw`flex flex-row items-center gap-2`}>
                          <Text
                            style={tw`  text-base font-bold text-white uppercase`}>
                            {swapto}
                          </Text>
                          <ArrowSVG fill="#9E9E9E" />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={tw`border-grey-800 border-b-[1px]`} />
                    <View
                      style={tw`flex flex-row justify-end px-3 py-4 text-xs font-bold text-grey-400`}>
                      <Text>{t('Current Balance')}: ℏ321 HBARX</Text>
                    </View>
                  </>
                )}
                <View
                  style={tw`absolute top-0 -translate-x-1/2 -translate-y-8 left-1/2`}>
                  <SwapSVG />
                </View>
              </View>
              <TouchableOpacity
                style={tw`flex flex-row justify-between px-3 py-4 mb-4 bg-grey-900 rounded-xl`}
                onPress={() => setShowMax(true)}>
                <Text style={tw`  text-base font-bold text-grey-50`}>
                  {t('Max Slippage')}
                </Text>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <Text style={tw`  text-sm font-bold text-grey-50`}>3%</Text>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </View>
              </TouchableOpacity>
              <View
                style={tw`flex flex-row justify-between px-3 py-4 mb-6 border rounded-xl border-grey-800`}>
                <Text style={tw`  text-sm font-bold text-grey-200`}>
                  {t('Transaction Fees')}
                </Text>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <Text style={tw`  text-sm font-bold text-grey-200`}>
                    ℏ9.02
                  </Text>
                  <ArrowDownSVG style={tw`-rotate-180`} fill="#9e9e9e" />
                </View>
              </View>
              <View style={tw`mb-8`}>
                <Web23Button
                  text={t('Review Swap') || 'Review Swap'}
                  disabled={amount.length === 0 || amountSwapto.length === 0}
                  onPress={() => setConfirmPage(true)}
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={tw`flex flex-row justify-between px-3 py-6 my-4 bg-grey-900 rounded-xl`}>
                <View>
                  <View style={tw`flex flex-row justify-center`}>
                    <XlHBarSVG />
                  </View>
                  <View style={tw`py-1 mt-3`}>
                    <Text
                      style={tw`  text-base font-bold text-grey-50 mb-[2px] text-center`}>
                      120,300 HBAR
                    </Text>
                    <Text
                      style={tw`  text-xs font-bold text-center text-grey-400`}>
                      $30,136
                    </Text>
                  </View>
                </View>
                <View style={tw`flex flex-row items-center`}>
                  <View style={tw`animate-bounce`}>
                    <DoubleArrowSVG />
                  </View>
                </View>
                <View style={tw`relative`}>
                  <View style={tw`flex flex-row justify-center`}>
                    <View style={tw`w-16 h-16 bg-white rounded-full" `} />
                  </View>
                  <View style={tw`py-1 mt-3 font-bold`}>
                    <Text
                      style={tw`mb-[2px] text-base text-grey-50 text-center`}>
                      120,300 HBARX
                    </Text>
                    <Text style={tw`  text-xs text-center text-grey-400`}>
                      ~$30,074
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={tw`flex flex-row justify-between px-3 py-4 mb-4 bg-grey-900 rounded-xl`}>
                <Text style={tw`  text-base font-bold text-grey-50`}>
                  {t('Max Slippage')}
                </Text>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <Text style={tw`text-sm font-bold text-grey-50`}>3%</Text>
                  <ArrowDownSVG
                    style={{transform: [{rotate: '-90deg'}]}}
                    fill="#9E9E9E"
                  />
                </View>
              </View>

              <View
                style={tw`flex flex-row justify-between px-3 py-4 mb-[114px] border rounded-xl border-grey-800`}>
                <Text style={tw`  text-sm font-bold text-grey-200`}>
                  {t('Transaction Fees')}
                </Text>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <Text style={tw`  text-sm font-bold text-grey-200`}>
                    ℏ9.02
                  </Text>
                  <ArrowDownSVG style={tw`-rotate-180`} fill="#9e9e9e" />
                </View>
              </View>

              <Web23Button
                text="Confirm Swap"
                onPress={() => setShowSuccess(true)}
              />
            </>
          )}
        </View>
      </Screen>
      <Web23Popup
        show={showChooseToken}
        setShow={setShowChooseToken}
        title={t('Swap from') || 'Swap from'}>
        <View style={tw`relative my-4`}>
          <Web23SearchBox
            placeholder={t('Search Currency') || 'Search Currency'}
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
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
            <CircleCheckSVG fill="#D7FC51" />
          </View>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <View
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-b-xl active:bg-grey-800`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1`}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  HBARX
                </Text>
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Web23Popup>
      <Web23Popup
        show={showChooseToToken}
        setShow={setShowChooseToToken}
        title={t('Swap to') || 'Swap to'}>
        <View style={tw`relative my-4`}>
          <Web23SearchBox
            placeholder={t('Search Currency') || 'Search Currency'}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </View>
        <View style={tw`mb-8 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-t-xl active:bg-grey-800`}
            onPress={() => {
              setSwapto('HBAR');
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1 `}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  HBAR
                </Text>
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-80 `}
            onPress={() => {
              setSwapto('BAMBOO');
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1`}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  BAMBOO
                </Text>
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-80`}
            onPress={() => {
              setSwapto('BYZ');
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1`}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  BYZ
                </Text>
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-b-xl active:bg-grey-80`}
            onPress={() => {
              setSwapto('DOV');
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <MDHBarSVG />
              <View style={tw`py-1 `}>
                <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                  DOV
                </Text>
                <Text style={tw`  text-xs font-bold text-grey-400`}>
                  ℏ291,469.62
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup title="Max Slippage" show={showMax} setShow={setShowMax}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <Text style={tw`px-3 pt-4 text-sm font-bold text-grey-200 `}>
            {t(
              'Your transaction will not go through if the price changes more than this percentage',
            )}
          </Text>
          <View
            style={tw`flex flex-row justify-between px-3 py-4 active:bg-grey-800`}>
            <Text style={tw`justify-between font-bold text-grey-50 font-base `}>
              1%
            </Text>
          </View>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <View
            style={tw`flex flex-row justify-between px-3 py-4 active:bg-grey-800`}>
            <Text style={tw`justify-between font-bold text-grey-50 font-base `}>
              2%
            </Text>
          </View>
          <View style={tw`border-grey-800 border-b-[1px] `} />
          <View
            style={tw`flex flex-row justify-between px-3 py-4 active:bg-grey-800`}>
            <Text style={tw`justify-between font-bold text-grey-50 font-base `}>
              3%
            </Text>
            <CircleCheckSVG fill="#D7FC51" />
          </View>
          <View style={tw`border-grey-800 border-b-[1px]`} />
          <View
            style={tw`flex flex-row justify-between px-3 py-4 rounded-b-xl active:bg-grey-800 `}>
            <Text style={tw`justify-between font-bold text-grey-50 font-base `}>
              4%
            </Text>
          </View>
        </View>
        <View style={tw`mb-8 `}>
          <Web23Button
            text={t('Proceed') || 'Proceed'}
            onPress={() => {
              setTimeout(() => {
                setShowMax(false);
              }, 500);
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Swap Initiated') || 'Swap Initiated'}
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
    </>
  );
};

export default SwapTabScreen;
