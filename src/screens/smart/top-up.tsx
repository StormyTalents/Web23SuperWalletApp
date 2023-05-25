import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23Avatar,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import MoneySVG from '../../assets/icons/attach_money_black.svg';
import TokenSVG from '../../assets/icons/token_sm.svg';
import ArrowDownSVG from '../../assets/icons/arrow-down.svg';
import CompleteSVG from '../../assets/icons/complete.svg';

const TopUpBalanceScreen: React.FC<{route: any}> = ({route}) => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const {name = '', value = '', amount = '', tokenId = ''} = route.params;
  const [supply, setSupply] = useState<string>('');
  const [tokenValue, setTokenValue] = useState<string>('');
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <>
      <Screen>
        <View style={tw`flex justify-between h-full`}>
          <View>
            <ScreenTitle
              title={t('Top-up balance') || 'Top-up balance'}
              onPress={() =>
                navigation.navigate('SmartSetupScreen', {initialTab: 2})
              }
            />
            <View style={tw`flex flex-row items-center justify-center my-4`}>
              <View
                style={tw`flex flex-row items-center justify-center w-12 h-12 rounded-2xl bg-grey-900`}>
                <MoneySVG />
              </View>
            </View>
            <Text
              style={tw`mb-6 text-base font-bold text-center text-grey-200`}>
              {t('How much do you want to top-up?')}
            </Text>
            <View style={tw`flex flex-row justify-center`}>
              <View style={tw`flex flex-col gap-4 w-[288px]`}>
                <Web23Input
                  placeholder={t('Supply')}
                  value={supply}
                  onChange={e => setSupply(e)}
                />
                <Web23Input
                  placeholder={t('Value')}
                  value={tokenValue}
                  onChange={e => setTokenValue(e)}
                />
                <Text style={tw`text-sm font-bold text-center text-grey-400`}>
                  {`Top-up value of your ${name} would be ${value} (~${amount} HBAR)`}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`px-6 pb-8`}>
            <Web23Button
              text={t('Continue to Review') || 'Continue to Review'}
              size="sm"
              onPress={() => setShowReview(true)}
            />
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Review Transaction') || 'Review Transaction'}
        show={showReview}
        setShow={setShowReview}>
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
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {amount} tokens of {name}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {t('Total Value = $')} {value}
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
            <Text style={tw`  text-sm font-bold text-grey-200`}>ℏ0.5</Text>
            <ArrowDownSVG style={tw`-rotate-180`} fill="#9E9E9E" />
          </View>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text={t('Confirm transaction') || 'Confirm transaction'}
            onPress={() => {
              setShowSuccess(true);
              setShowReview(false);
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
    </>
  );
};

export default TopUpBalanceScreen;
