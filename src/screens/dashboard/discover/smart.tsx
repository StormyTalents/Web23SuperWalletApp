import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, Web23Popup, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {API_SMART_ENDPOINT_URL} from 'config';

import apiHandler from 'utils/apiHandler';
import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import PageSVG from '../../../assets/icons/pages_sm.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';
import FacebookSVG from '../../../assets/icons/Facebook.svg';
import GoogleSVG from '../../../assets/icons/Google.svg';
import TwitterSVG from '../../../assets/icons/Twitter_md.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import ArrowBackSVG from '../../../assets/icons/arrow_back.svg';

const CreateSmartScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [web3, setWeb3] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [showContinue, setShowContinue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDomainList, setShowDomainList] = useState<boolean>(false);
  const {t} = useTranslation();
  const [domainList, setDomainList] = useState<string[]>([]);

  const createSmartAccount = async () => {
    setLoading(true);
    try {
      const {data} = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + 'auth',
        data: {
          displayName: name,
          email: email,
          domainName: web3,
          password: password,
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

      setDomainList(web3List.map(item => item.data.name));

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
        <ScreenTitle
          title={t('Create Smart Page') || 'Create Smart Page'}
          onPress={() => {
            navigation.navigate('DashboardCompassScreen');
          }}
        />
        <View style={tw`px-3 flex flex-row justify-center items-center h-auto`}>
          <View style={tw`w-full`}>
            <View style={tw`mt-4`}>
              <View style={tw`flex flex-row justify-center mb-4`}>
                <View
                  style={tw`w-[48px] h-[48px] rounded-full bg-grey-900 flex flex-row justify-center items-center`}>
                  <PageSVG />
                </View>
              </View>
              <Text
                style={tw`mb-6 text-base font-bold text-center text-grey-200`}>
                {t('Let’s setup some basic details')}
              </Text>
            </View>
            <View style={tw`flex flex-col gap-4 mb-8`}>
              <Web23Input
                placeholder={t('Display name')}
                value={name}
                onChange={e => setName(e)}
              />
              <Web23Input
                placeholder={t('Email address')}
                value={email}
                onChange={e => setEmail(e)}
              />
              <TouchableOpacity
                style={tw`flex flex-row justify-between px-3 py-4 border rounded-xl border-grey-800   active:bg-grey-70`}
                onPress={() => setShowDomainList(true)}>
                <Text style={tw`  text-sm font-bold text-grey-200`}>
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
              <Web23Input
                placeholder={t('Confirm password')}
                value={confirm}
                type="password"
                onChange={e => setConfirm(e)}
              />
            </View>
            <TouchableOpacity
              style={tw`bg-grey-900 rounded-xl px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-800 mb-[64px`}
              onPress={() => {
                setShowContinue(true);
              }}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                  {t('or continue with')}
                </Text>
                <View>
                  <Image
                    source={require('../../../assets/png/socials.png')}
                    alt="social"
                  />
                </View>
              </View>
              <ArrowSVG fill="#9E9E9E" />
            </TouchableOpacity>
            <View style={tw`mb-8`}>
              <Web23Button
                text={t('Proceed') || 'Proceed'}
                onPress={async () => {
                  const data = await createSmartAccount();
                  if (data?.id) {
                    navigation.navigate('VerificationScreen', {
                      uid: data?.id,
                      email: email,
                      name: name,
                      password: password,
                      web3: web3,
                    });
                  }
                }}
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  password !== confirm
                }
              />
            </View>
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Continue with') || 'Continue with'}
        show={showContinue}
        setShow={setShowContinue}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 text-base font-bold`}>
            {t('Choose one of the options')}
          </Text>
          <TouchableOpacity
            style={tw`px-3 py-[10px] border-b border-grey-800 active:bg-grey-80`}
            onPress={() => {
              navigation.navigate('VerificationScreen');
            }}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <GoogleSVG />
                <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                  Google
                </Text>
              </View>
              <ArrowSVG
                fill="#9E9E9E"
                style={{transform: [{rotate: '-90deg'}]}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-[10px] border-b border-grey-800 active:bg-grey-80`}
            onPress={() => {
              navigation.navigate('VerificationScreen');
            }}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <FacebookSVG />
                <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                  Facebook
                </Text>
              </View>
              <ArrowSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-[10px] rounded-b-xl active:bg-grey-80`}
            onPress={() => {
              navigation.navigate('VerificationScreen');
            }}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <TwitterSVG />
                <Text style={tw`py-1 text-base font-bold text-grey-50`}>
                  Twitter
                </Text>
              </View>
              <ArrowSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </View>
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup
        title="Web3 Domains"
        show={showDomainList}
        setShow={setShowDomainList}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 text-base font-bold`}>
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
                <ArrowSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Web23Popup>
    </>
  );
};

export default CreateSmartScreen;
