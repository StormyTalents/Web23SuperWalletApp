import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {ScreenTitle, Web23Button, Web23Input, Web23Popup} from 'components';

import {useWeb23Navigation} from 'navigation';

// import {SettingContext} from 'utils/context';
// import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ArrowDownSVG from '../../../../assets/icons/arrow-down.svg';
import MDHBarSVG from '../../../../assets/icons/md_hbar.svg';
import VisaMasterSVG from '../../../../assets/icons/visa_master.svg';
import ArrowSVG from '../../../../assets/icons/arrow-down.svg';
import CompleteSVG from '../../../../assets/icons/complete.svg';

// import Banxa from "src/assets/icons/banxa_md.png";
// import Web23Logo from "src/assets/icons/logo_md.png";
// import BanxaImg from "src/assets/icons/Banxa LogoFull.png";

const DomainSectionDetailScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [amount, setAmount] = useState<string>('');
  const [receive, setReceive] = useState<string>('');
  const [progress, setProgress] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <>
      {progress && (
        <View style={tw`fixed top-0 left-0 w-full h-full z-[1]`}>
          <View style={tw`w-full h-full bg-black opacity-90`} />
          <View style={tw`absolute px-6 -translate-y-1/2 top-1/2`}>
            <View style={tw`flex flex-row items-center mb-3 px-[30px]`}>
              <View>
                <Image
                  source={require('../../../../assets/icons/banxa_md.png')}
                  alt="banxa"
                />
              </View>
              <View style={tw`w-[90px]`}>
                <View style={tw`h-[1px] border-t-2 border-dashed`} />
              </View>
              <View>
                <Image
                  source={require('../../../../assets/icons/logo_md.png')}
                  alt="web23"
                />
              </View>
            </View>
            <View style={tw`flex flex-row items-center h-full`}>
              <Text style={tw`text-base font-medium text-center text-grey-200`}>
                {t('Kindly complete the transaction in Banxa window')}
              </Text>
            </View>
          </View>
        </View>
      )}
      <Screen>
        <ScreenTitle
          onPress={() => navigation.navigate('DashboardWalletScreen')}
        />
        <View style={tw`px-3 flex justify-center w-full`}>
          <View
            style={tw`px-3 pt-[18px] pb-[10px] bg-grey-900 rounded-xl mt-5 mb-4`}>
            <Text style={tw`text-sm font-bold text-grey-200 mb-[2px]`}>
              Pay using
            </Text>
            <View style={tw`flex flex-row items-center justify-between mb-4`}>
              <View style={tw`w-1/2`}>
                <Web23Input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e: any) => setAmount(e)}
                />
              </View>
              <View
                style={tw`p-2 rounded-[32px] flex flex-row gap-2 items-center bg-grey-800`}>
                <Text style={tw`  text-base font-bold text-white`}>
                  US Dollar
                </Text>
                <ArrowDownSVG fill="#9e9e9e" />
              </View>
            </View>
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`text-sm font-bold text-grey-200 px-3 pt-[18px] pb-[2px]`}>
              You'll receive
            </Text>
            <View
              style={tw`flex flex-row items-center justify-between mb-4 px-3 py-[10px]`}>
              <View style={tw`w-1/2`}>
                <Web23Input
                  placeholder="0"
                  value={receive}
                  onChange={(e: any) => setReceive(e)}
                />
              </View>
              <View
                style={tw`p-2 rounded-[32px] flex flex-row gap-2 items-center bg-grey-800`}>
                <View style={tw`flex flex-row items-center gap-1`}>
                  <MDHBarSVG fill="#9e9e9e" />
                  <Text style={tw`  text-base font-bold text-white`}>HBAR</Text>
                </View>
                <ArrowDownSVG fill="#9e9e9e" />
              </View>
            </View>
            <View style={tw`border border-grey-800 border-b-[1px]`} />
            <Text
              style={tw`flex flex-row justify-end px-3 py-4 text-xs font-bold text-grey-400`}>
              {t('Current Balance') + ': ℏ212,321 HBAR'}
            </Text>
          </View>
          <View
            style={tw`px-3 py-[10px] bg-grey-900 flex flex-row gap-3 rounded-xl items-center mb-4`}>
            <VisaMasterSVG />
            <Text style={tw`  text-base font-bold text-grey-50`}>
              Visa / Mastercard
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 my-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200`}>
            <Text>{t('Transaction Fees')}</Text>
            <View style={tw`flex flex-row items-center gap-4`}>
              <Text>$0.06</Text>
              <ArrowSVG style={tw`rotate-180`} fill="#9e9e9e" />
            </View>
          </View>
          <Web23Button
            text={t('Continue') || 'Continue'}
            onPress={() => {
              setProgress(true);
              setTimeout(() => {
                setProgress(false);
                setShowSuccess(true);
              }, 3000);
            }}
          />
        </View>
      </Screen>
      <Web23Popup
        title="Order Initiated"
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
      <TouchableOpacity
        style={tw`absolute z-10 -translate-x-1/3 top-5 left-1/2`}
        onPress={() => navigation.navigate('DashboardWalletScreen')}>
        <Image
          source={require('../../../../assets/icons/Banxa LogoFull.png')}
          alt="banxa"
        />
      </TouchableOpacity>
    </>
  );
};

export default DomainSectionDetailScreen;
