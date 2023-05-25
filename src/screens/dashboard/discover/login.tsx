import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {Screen} from 'layouts';
import {useTranslation} from 'react-i18next';

import {
  Web23Button,
  Web23Input,
  Web23Popup,
  DashboardActionBar,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {API_SMART_ENDPOINT_URL} from 'config';
import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';
import apiHandler from 'utils/apiHandler';

import PageSVG from '../../../assets/icons/pages_sm.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';

const LoginSmartScreen: React.FC = () => {
  const {t} = useTranslation();
  const [web3, setWeb3] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {settings, saveSettings} = useContext(SettingContext);
  const [showDomainList, setShowDomainList] = useState<boolean>(false);
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser,
  );
  const [domainList, setDomainList] = useState<string[]>([]);
  const navigation = useWeb23Navigation();

  const loginSmartPage = async () => {
    setLoading(true);
    try {
      const data = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + 'auth/login',
        data: {
          domainName: web3,
          password: password,
          email: email,
        },
      });
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
    }
  };

  const getAllDomain = async () => {
    try {
      setLoading(true);
      const {web3Domain} = await apiHandler('get_tld', currentUser.token, {
        accountId: currentUser.accountId,
      });
      const web3List = await Promise.all(
        web3Domain.map((url: any) => axios(url)),
      );

      setDomainList(web3List.map((item: any) => item?.data?.name));

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDomain();
  }, []);

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`flex h-full justify-between`}>
          <Text
            style={tw`text-xl font-bold   text-grey-50 px-6 py-5 text-center`}>
            {t('Login Web23 SmartPage')}
          </Text>
          <View style={tw`mt-4`}>
            <View style={tw`flex flex-row justify-center mb-4`}>
              <View
                style={tw`w-[48px] h-[48px] rounded-full flex flex-row justify-center items-center`}>
                <PageSVG />
              </View>
            </View>
            <Text style={tw`mb-6 text-sm font-bold text-center text-grey-200`}>
              {t('Sign In with your Email, Web3 domain and password')}
            </Text>
            <View style={tw`flex flex-col gap-4 mb-8`}>
              <Web23Input
                placeholder={t('Email') || 'Email'}
                value={email}
                onChange={e => setEmail(e)}
              />
              <TouchableOpacity
                style={tw`flex flex-row justify-between px-3 py-4 border rounded-xl border-grey-800   active:bg-grey-70`}
                onPress={() => setShowDomainList(true)}>
                <Text style={tw`   text-sm font-bold text-grey-200`}>
                  {web3 || 'Choose your web3 domain'}
                </Text>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <ArrowDownSVG fill="#9E9E9E" />
                </View>
              </TouchableOpacity>
              <Web23Input
                placeholder={t('Login password')}
                value={password}
                type="password"
                onChange={e => setPassword(e)}
              />
              <Text
                style={tw`mb-6 text-xs font-bold text-center text-grey-200`}>
                {t('New to Web23 SmartPage?')}{' '}
                <Text
                  style={tw`underline   active:text-grey-40`}
                  onPress={() => navigation.navigate('DashboardCompassScreen')}>
                  {t('Create an Account')}
                </Text>
              </Text>
            </View>
          </View>
          <View style={tw`pb-8 w-full`}>
            <Web23Button
              text={t('Proceed') || 'Proceed'}
              onPress={async () => {
                const data = await loginSmartPage();

                if (data?.data?.data?.user.id) {
                  const newData = settings.userData.map(user => {
                    if (user.accountId === settings.selectedUser) {
                      return {...user, smartUid: data?.data?.data?.user.id};
                    }
                    return {...user};
                  });
                  saveSettings({...settings, userData: newData});
                  navigation.navigate('SmartSetupScreen');
                }
              }}
              disabled={web3.length === 0 || password.length === 0}
            />
          </View>
          <DashboardActionBar selected={4} />
        </View>
      </Screen>
      <Web23Popup
        title="Web3 Domains"
        show={showDomainList}
        setShow={setShowDomainList}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <Text style={tw`pt-[18px] pb-[2px] px-3 text-base font-bold`}>
            {t('Choose one of your web3 domains')}
          </Text>
          {domainList.map((item, index) => (
            <TouchableOpacity
              key={item + index}
              style={tw`px-3 py-[10px] border-b border-grey-800 active:bg-grey-80`}
              onPress={() => {
                setWeb3(item);
              }}>
              <View style={tw`flex flex-row items-center justify-between`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                    {item}
                  </Text>
                </View>
                <ArrowSVG fill="#9E9E9E" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Web23Popup>
    </>
  );
};

export default LoginSmartScreen;
