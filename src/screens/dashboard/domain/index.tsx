import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, TouchableOpacity, Text, Image} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {
  Web23DomainTicker,
  Web23Input,
  Web23Popup,
  Web23Button,
  Web23Toggle,
  DashboardActionBar,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import apiHandler from 'utils/apiHandler';
import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import FavoriteSVG from '../../../assets/icons/favorite.svg';
import ShoppingSVG from '../../../assets/icons/shopping_cart.svg';
import SearchSVG from '../../../assets/icons/search.svg';
import SecuritySVG from '../../../assets/icons/security.svg';
import ManageSearchSVG from '../../../assets/icons/search_domain.svg';
import MoneySVG from '../../../assets/icons/attach_money.svg';
import TransitSVG from '../../../assets/icons/transit_enterexit.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import GoDaddySVG from '../../../assets/icons/GoDaddy.svg';
import Web23SVG from '../../../assets/icons/Web23.svg';
import SmileySVG from '../../../assets/icons/SmileyBlank.svg';
import ArrowForwardSVG from '../../../assets/icons/arrow_forward.svg';

const MODE_ALL = 0;
const MODE_WEB2 = 1;
const MODE_WEB3 = 2;

const DashboardDomainScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [searchDomain, setSearchDomain] = useState<string>('');
  const {settings} = useContext(SettingContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<{
    keyword: string;
    web2: any;
    web3: any;
  }>();
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser,
  );
  const [mode, setMode] = useState<number>(MODE_ALL);
  const [allDomain, setAllDomain] = useState<{
    web2?: {name: string; expired?: string}[];
    web3?: {name: string; expired?: string; url: string}[];
  }>();
  const getAllDomain = async () => {
    try {
      setLoading(true);
      const {web3Domain} = await apiHandler('get_tld', currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
      });
      const web3 = await Promise.all(web3Domain.map((url: any) => axios(url)));

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
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDomain();
  }, []);

  useEffect(() => {
    if (allDomain?.web2?.length && !allDomain?.web3?.length) {
      setMode(MODE_WEB2);
    }
    if (allDomain?.web3?.length && !allDomain?.web2?.length) {
      setMode(MODE_WEB3);
    }
  }, [allDomain]);

  const handleSearch = async () => {
    let domain: any = '';

    try {
      if (searchDomain !== '') {
        setLoading(true);
        domain = await apiHandler('search_domain', currentUser.token, {
          keyword: searchDomain,
          sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        });

        if (domain.web2?.domain) {
          setSearchResult({
            web2: domain?.web2,
            keyword: searchDomain,
            web3: '',
          });
        }

        if (
          domain.web3?.resData.filter((item: any) => item.price !== 'NaN')
            .length > 0
        ) {
          setSearchResult({
            web2: '',
            web3: domain.web3,
            keyword: searchDomain,
          });
        }
        setLoading(false);
        if (
          domain.web2?.domain ||
          domain.web3?.resData.filter((item: any) => item.price !== 'NaN')
            .length > 0
        ) {
          setShowSearchResult(true);
        }
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <Screen loading={loading}>
        <View
          style={tw`flex flex-row px-6 py-[18px] items-center justify-between bg-black`}>
          <Text style={tw`text-xl font-bold text-white`}>{t('Domains')}</Text>
          <View style={tw`flex flex-row items-center gap-4`}>
            <FavoriteSVG />
            <ShoppingSVG />
          </View>
        </View>
        <View style={tw`pt-6 pb-4 bg-[#ADD6FF]`}>
          <View style={tw`flex flex-row justify-center`}>
            <Web23DomainTicker />
          </View>
          <Text style={tw`px-6 mb-2 text-2xl font-bold text-black`}>
            {t('Find your place online')}
          </Text>
          <Text style={tw`px-6 mb-6 text-sm font-bold text-grey-900`}>
            {t('Get started with your idea from more than 200 domain endings')}
          </Text>
          <View style={tw`relative px-6 mb-8`}>
            <Web23Input
              placeholder={t('Search for your domain')}
              variant="secondary"
              value={searchDomain}
              onChange={e => setSearchDomain(e)}
            />
            <TouchableOpacity
              style={tw`absolute p-3 border rounded-full top-2 right-8 bg-lime-500 border-grey-900 active:bg-green-500`}
              onPress={handleSearch}>
              <SearchSVG fill="#000000" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row gap-4 px-6 mb-4`}>
            <View style={tw`w-[92px] flex flex-col items-center`}>
              <ManageSearchSVG />
              <Text style={tw`text-xs font-bold text-center text-grey-900`}>
                {t('Transparent Pricing')}
              </Text>
            </View>
            <View style={tw`w-[92px] flex flex-col items-center`}>
              <SecuritySVG />
              <Text style={tw`text-xs font-bold text-center text-grey-900`}>
                {t('Industry top security')}
              </Text>
            </View>
            <View style={tw`w-[92px] flex flex-col items-center`}>
              <MoneySVG />
              <Text
                style={tw`px-4 text-xs font-bold text-center text-grey-900`}>
                {t('Starting at') + ' $4'}
              </Text>
            </View>
          </View>
          <Text
            style={tw`text-sm font-bold text-center text-black pb-[1px] underline`}>
            {t('More reasons to buy a Domain on Web23')}
          </Text>
        </View>
        <View style={tw`px-6`}>
          <View
            style={tw`flex flex-row items-center gap-3 px-3 py-4 mt-6 mb-4 bg-grey-900 rounded-xl`}>
            <View>
              <TransitSVG />
            </View>
            <Text style={tw`text-base font-bold text-grey-50`}>
              {t('Transfer a Domain you own')}
            </Text>
          </View>
          <View
            style={tw.style(
              'bg-grey-900 w-full rounded-xl',
              allDomain?.web2?.length || allDomain?.web3?.length
                ? 'min-h-[250px] mb-1'
                : 'min-h-[228px] mb-4',
            )}>
            <View
              style={tw`flex flex-row items-center justify-between px-3 py-4`}>
              <Text style={tw`  text-sm font-bold text-grey-200`}>
                {t('My Domains')}
              </Text>
              {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
                0 && (
                <View style={tw`flex flex-row text-xs font-bold text-white`}>
                  <Text
                    style={tw.style(
                      'px-3 py-1 rounded-[10px]  ',
                      mode === MODE_WEB2 && 'bg-grey-800',
                      !allDomain?.web2?.length && 'hidden',
                    )}
                    onPress={() => setMode(MODE_WEB2)}>
                    Web 2
                  </Text>
                  <Text
                    style={tw.style(
                      'px-3 py-1 rounded-[10px]  ',
                      mode === MODE_ALL && 'bg-grey-800',
                      (!allDomain?.web2?.length || !allDomain?.web3?.length) &&
                        'hidden',
                    )}
                    onPress={() => setMode(MODE_ALL)}>
                    {t('All')}
                  </Text>
                  <Text
                    style={tw.style(
                      'px-3 py-1 rounded-[10px]  ',
                      mode === MODE_WEB3 && 'bg-grey-800',
                      !allDomain?.web3?.length && 'hidden',
                    )}
                    onPress={() => setMode(MODE_WEB3)}>
                    Web 3
                  </Text>
                </View>
              )}
            </View>
            <View style={tw`max-h-[270px] flex flex-col justify-start`}>
              <View>
                {(allDomain?.web2?.length || 0) +
                  (allDomain?.web3?.length || 0) >
                  0 && (
                  <View style={tw`scene`}>
                    <View
                      style={tw`cube ${
                        mode === MODE_ALL
                          ? 'show-all'
                          : mode === MODE_WEB2
                          ? 'show-web2'
                          : 'show-web3'
                      }`}>
                      <View style={tw`cube__face cube__face--web2`}>
                        <ScrollView contentContainerStyle={tw`max-h-[210px]`}>
                          {(mode === MODE_WEB2 || mode === MODE_ALL) &&
                            allDomain?.web2?.map((domain, index) => (
                              <View key={index}>
                                {new Date().valueOf() <
                                  new Date(domain?.expired || 1).valueOf() && (
                                  <TouchableOpacity
                                    style={tw`bg-grey-900 border-b border-grey-800 active:bg-grey-80`}
                                    onPress={() => {
                                      navigation.navigate(
                                        'DomainDetailsScreen',
                                        {
                                          name: domain.name,
                                          expired: domain?.expired,
                                          back: 'wallet',
                                        },
                                      );
                                    }}>
                                    <View
                                      style={tw`px-3 py-[10px] flex flex-row justify-between items-center`}>
                                      <View
                                        style={tw`py-[5px] flex flex-row gap-3`}>
                                        <View style={tw`relative`}>
                                          <View style={tw`absolute z-[1]`}>
                                            <GoDaddySVG />
                                          </View>
                                          <View
                                            style={tw`absolute z-0 w-10 h-10 top-0 left-[30px]`}>
                                            <Web23SVG />
                                          </View>
                                        </View>
                                        <View style={tw`pl-[65px]`}>
                                          <Text
                                            style={tw`  text-base text-grey-50 mb-[2px] w-[120px] overflow-x-auto truncate`}>
                                            {domain.name}
                                          </Text>
                                          <Text
                                            style={tw`  text-xs text-grey-400 ${
                                              new Date(
                                                domain?.expired || 1,
                                              ).valueOf() -
                                                new Date().valueOf() <=
                                              604800000
                                                ? 'text-red-500'
                                                : ''
                                            }`}>
                                            {new Date(
                                              domain?.expired || 1,
                                            ).valueOf() -
                                              new Date().valueOf() >
                                            604800000
                                              ? t('Valid until') +
                                                ' ' +
                                                new Date(
                                                  domain?.expired || 1,
                                                ).toLocaleDateString()
                                              : t('Expiring in') +
                                                ' ' +
                                                Math.floor(
                                                  (new Date(
                                                    domain?.expired || 1,
                                                  ).valueOf() -
                                                    new Date().valueOf()) /
                                                    3600000 /
                                                    24,
                                                ).toString() +
                                                ' ' +
                                                t('days')}
                                          </Text>
                                        </View>
                                      </View>
                                      <View>
                                        <ArrowDownSVG
                                          fill="#F4F4F4"
                                          style={{
                                            transform: [{rotate: '-90deg'}],
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            ))}
                          {(mode === MODE_WEB3 || mode === MODE_ALL) &&
                            allDomain?.web3?.map((domain, index) => (
                              <TouchableOpacity
                                key={index}
                                style={tw`-grey-900 border-b border-grey-800 active:bg-grey-80`}
                                onPress={() =>
                                  navigation.navigate('DomainDetailsScreen', {
                                    name: domain.name,
                                    expired: domain?.expired,
                                    img: domain.url,
                                    back: 'wallet',
                                  })
                                }>
                                <View
                                  style={tw`px-3 py-[10px] flex flex-row justify-between items-center`}>
                                  <View
                                    style={tw`py-[5px] flex flex-row gap-3`}>
                                    <View style={tw`relative`}>
                                      <View
                                        style={tw`absolute z-[1] w-10 h-10`}>
                                        <Image
                                          source={{uri: domain.url}}
                                          style={tw`unded-ful`}
                                          alt="web3 domain"
                                        />
                                      </View>
                                      <View
                                        style={tw`absolute z-[0] top-0 left-[30px]`}>
                                        <Web23SVG />
                                      </View>
                                    </View>
                                    <View
                                      style={tw`pl-[65px] font-bold pt-1 pb-2`}>
                                      <Text
                                        style={tw`text-base text-grey-50 mb-[2px] w-[120px]`}>
                                        {domain.name}
                                      </Text>
                                      <Text style={tw`text-xs text-grey-400`}>
                                        {domain?.expired}
                                      </Text>
                                    </View>
                                  </View>
                                  <View>
                                    <ArrowDownSVG
                                      fill="#F4F4F4"
                                      style={{
                                        transform: [{rotate: '-90deg'}],
                                      }}
                                    />
                                  </View>
                                </View>
                              </TouchableOpacity>
                            ))}
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
              0 ? (
                <TouchableOpacity
                  style={tw`px-3 py-4 text-lime-500 rounded-b-xl bg-grey-900 active:bg-grey-800`}
                  onPress={() => navigation.navigate('DashboardDomainScreen')}>
                  <Text style={tw`text-base font-bold`}>
                    {t('Manage Domains')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={tw`flex flex-col justify-center`}>
                  <View style={tw`flex flex-row justify-center mb-2 mt-[10px]`}>
                    <SmileySVG />
                  </View>
                  <Text
                    style={tw`  mb-1 text-base font-bold text-center text-white`}>
                    {t('Nothing to see here')}
                  </Text>
                  <Text
                    style={tw`  mb-3 text-sm font-bold text-center px-14 text-grey-400`}>
                    {t('Add / Transfer / Get your new Domain today')}
                  </Text>
                  <View style={tw`px-3 mb-[10px]`}>
                    <Web23Button
                      text={t('Get your Domain') || 'Get your Domain'}
                      size="sm"
                      icon={<ArrowForwardSVG />}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
            0 && (
            <View style={tw`flex flex-row justify-center gap-2 py-3 mb-4`}>
              <TouchableOpacity
                style={tw.style(
                  'w-[6px] h-[6px] rounded-full  ',
                  mode === MODE_WEB2 ? 'bg-white' : 'bg-grey-400',
                  !allDomain?.web2?.length && 'hidden',
                )}
                onPress={() => setMode(MODE_WEB2)}
              />
              <TouchableOpacity
                style={tw.style(
                  'w-[6px] h-[6px] rounded-full  ',
                  mode === MODE_ALL ? 'bg-white' : 'bg-grey-400',
                  (!allDomain?.web3?.length || !allDomain?.web2?.length) &&
                    'hidden',
                )}
                onPress={() => setMode(MODE_ALL)}
              />
              <TouchableOpacity
                style={tw.style(
                  'w-[6px] h-[6px] rounded-full  ',
                  mode === MODE_WEB3 ? 'bg-white' : 'bg-grey-400',
                  !allDomain?.web3?.length && 'hidden',
                )}
                onPress={() => setMode(MODE_WEB3)}
              />
            </View>
          )}
          <View style={tw`mb-5 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200`}>
              {t('Connected Accounts')}
            </Text>
            <View
              style={tw`flex flex-row items-center justify-between px-3 active:bg-grey-800`}>
              <View style={tw`flex flex-row items-center gap-2 py-[10px]`}>
                <View>
                  <GoDaddySVG />
                </View>
                <View style={tw`py-1`}>
                  <Text style={tw`text-base font-bold text-grey-50 mb-[2px]`}>
                    GoDaddy
                  </Text>
                  <Text
                    style={tw`text-xs font-bold truncate text-grey-400 max-w-[120px] overflow-hidden`}>
                    {settings.godaddyInfo.gkey} : {settings.godaddyInfo.gsecret}
                  </Text>
                </View>
              </View>
              <View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#F4F4F4"
                />
              </View>
            </View>
            <View style={tw`border-grey-800 w-full h-[1px]`} />
            <Text
              style={tw`px-3 py-4 text-base font-bold active:bg-grey-800 rounded-b-xl text-lime-500`}
              onPress={() => navigation.navigate('CreateWalletScreen')}>
              {t('Manage Accounts')}
            </Text>
          </View>
        </View>
        <DashboardActionBar selected={1} />
      </Screen>
      <Web23Popup
        title={t('Domain Search Result') || 'Domain Search Result'}
        show={showSearchResult}
        setShow={setShowSearchResult}>
        {searchResult?.web2?.domain && (
          <View style={tw`mt-4 last:mb-8 mb-0 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-50`}>
              {'Web2 ' + t('Domains')}
            </Text>
            <ScrollView contentContainerStyle={tw`max-h-[180px]`}>
              <View
                style={tw`flex flex-row justify-between px-3 py-4 border-b border-b-grey-800`}>
                <Text style={tw`text-sm font-bold text-grey-50`}>
                  {t('Name')}
                </Text>
                <Text style={tw`text-sm font-bold text-grey-50`}>
                  {searchResult?.web2.domain}
                </Text>
              </View>
              <View
                style={tw`items-center flex flex-row justify-between px-3 py-4 text-sm font-bold text-grey-50`}>
                <Text>{t('Available')}</Text>
                <View>
                  {searchResult?.web2.available ? (
                    <Web23Toggle checked={true} setChecked={() => {}} />
                  ) : (
                    <Web23Toggle checked={false} setChecked={() => {}} />
                  )}
                </View>
              </View>
              {searchResult?.web2?.available && (
                <View
                  style={tw`flex flex-row justify-between px-3 py-4 border-b last:border-none border-b-grey-800`}>
                  <Text style={tw`text-grey-50 text-sm font-bold`}>
                    {t('Price')}
                  </Text>
                  <Text style={tw`text-grey-50 text-sm font-bold`}>
                    {searchResult?.web2.price / 100000.0 +
                      ' ' +
                      searchResult?.web2.currency}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        {searchResult?.web3?.resData?.length && (
          <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-50`}>
              {'Web3 ' + t('Domains')}
            </Text>
            <ScrollView contentContainerStyle={tw`max-h-[180px]`}>
              {searchResult?.web3?.resData.map((item: any, idx: number) => (
                <View
                  key={idx}
                  style={tw`py-4 last:border-none border-b border-b-grey-800`}>
                  <View style={tw`flex flex-row justify-between px-3`}>
                    <Text style={tw`text-xs font-medium text-grey-50`}>
                      {t('Name')}
                    </Text>
                    <Text style={tw`text-xs font-medium text-grey-50`}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row justify-between px-3`}>
                    <Text style={tw`text-xs font-medium text-grey-50`}>
                      {t('Price')}
                    </Text>
                    <Text style={tw`text-xs font-medium text-grey-50`}>
                      {item.price + ' ℏ'}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Web23Popup>
    </>
  );
};

export default DashboardDomainScreen;
