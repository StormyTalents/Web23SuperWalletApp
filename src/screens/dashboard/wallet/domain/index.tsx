import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Web23Avatar, Web23Button} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ArrowDownSVG from '../../../../assets/icons/arrow-down.svg';
import HbarSVG from '../../../../assets/icons/hbar.svg';
import BoltSVG from '../../../../assets/icons/bolt.svg';
import DomainSVG from '../../../../assets/icons/Domains.svg';
import SmileySVG from '../../../../assets/icons/SmileyBlank.svg';
import GoDaddySVG from '../../../../assets/icons/GoDaddy.svg';
import Web23SVG from '../../../../assets/icons/Web23.svg';
import DomainLogoSVG from '../../../../assets/icons/domain_logos.svg';
import ArrowForwardSVG from '../../../../assets/icons/arrow_forward.svg';
import ContentCopySVG from '../../../../assets/icons/content_copy_sm.svg';
import {ScrollView} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

const MODE_ALL = 0;
const MODE_WEB2 = 1;
const MODE_WEB3 = 2;

const DomainSectionScreen: React.FC<{
  extended: boolean;
  setLoading: (state: boolean) => void;
  setShowTokenMng: (state: boolean) => void;
  allDomain?: {
    web2?: {name: string; expired?: string}[];
    web3?: {name: string; expired?: string; url: string}[];
  };
  setAllDomain: (param: any) => void;
  balance: {hbar: string; amount: string};
}> = ({
  setLoading,
  setShowTokenMng,
  allDomain,
  setAllDomain,
  extended = false,
  balance,
}) => {
  const navigation = useWeb23Navigation();
  const [mode, setMode] = useState<number>(MODE_ALL);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const {t} = useTranslation();

  useEffect(() => {
    if (allDomain?.web2?.length && !allDomain?.web3?.length) setMode(MODE_WEB2);
    if (allDomain?.web3?.length && !allDomain?.web2?.length) setMode(MODE_WEB3);
  }, [allDomain]);

  return (
    <View>
      {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) < 2 && (
        <View style={tw`p-3 mb-4 bg-indigo-200 rounded-xl`}>
          <View style={tw`flex flex-row gap-[7px] mb-6`}>
            <View>
              <Text style={tw`mb-1 text-xl font-bold text- `}>
                {t('All your Domains here')}
              </Text>
              <Text style={tw`text-sm font-medium text-grey-900`}>
                {t('Manage & Track all your domains through your Web23 wallet')}
              </Text>
            </View>
            {/* <DomainLogoSVG /> */}
          </View>

          <TouchableOpacity
            style={tw`w-full py-[6px] bg-white border-2 border-grey-900 rounded-[32px] flex flex-row gap-1 justify-center items-center`}
            onPress={() => navigation.navigate('CreateWalletScreen')}>
            <Text style={tw`text-sm font-bold text-grey-900`}>
              {t('Get Started')}
            </Text>
            <ArrowForwardSVG />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={tw`bg-grey-900 w-full rounded-xl ${
          allDomain?.web2?.length || allDomain?.web3?.length
            ? 'min-h-[250px] mb-1'
            : 'min-h-[228px] mb-4'
        }`}>
        <View style={tw`flex flex-row items-center justify-between px-3 py-4`}>
          <Text style={tw`text-sm font-bold text-grey-200`}>
            {t('My Domains')}
          </Text>
          {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
            0 && (
            <View style={tw`text-xs font-bold text-white`}>
              <TouchableOpacity
                style={tw`px-3 py-1 rounded-[10px]   ${
                  mode === MODE_WEB2 ? 'bg-grey-800' : ''
                } ${!allDomain?.web2?.length ? 'hidden' : ''}`}
                onPress={() => setMode(MODE_WEB2)}>
                Web 2
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`px-3 py-1 rounded-[10px]   ${
                  mode === MODE_ALL ? 'bg-grey-800' : ''
                } ${
                  !allDomain?.web2?.length || !allDomain?.web3?.length
                    ? 'hidden'
                    : ''
                }`}
                onPress={() => setMode(MODE_ALL)}>
                {t('All')}
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`px-3 py-1 rounded-[10px]   ${
                  mode === MODE_WEB3 ? 'bg-grey-800' : ''
                } ${!allDomain?.web3?.length ? 'hidden' : ''}`}
                onPress={() => setMode(MODE_WEB3)}>
                Web 3
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={tw`max-h-[270px] flex justify-start`}>
          <View>
            {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
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
                                style={tw`border-b bg-grey-900 border-grey-800 active:bg-grey-80`}
                                onPress={() => {
                                  navigation.navigate('DomainDetailsScreen', {
                                    name: domain.name,
                                    expired: domain?.expired,
                                    back: 'wallet',
                                  });
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
                            style={tw`border-b -grey-900 border-grey-800 active:bg-grey-80`}
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
                              <View style={tw`py-[5px] flex flex-row gap-3`}>
                                <View style={tw`relative`}>
                                  <View style={tw`absolute z-[1] w-10 h-10`}>
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
                                <View style={tw`pl-[65px] font-bold pt-1 pb-2`}>
                                  <Text
                                    style={tw`  text-base text-grey-50 mb-[2px] w-[120px]`}>
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
              style={tw`py-4 -3 text-lime-500 rounded-b-xl bg-grey-900 active:bg-grey-80`}
              onPress={() => navigation.navigate('DashboardDomainScreen')}>
              <Text style={tw`text-base font-bold`}>{t('Manage Domains')}</Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`flex flex-row flex-col justify-center`}>
              <View style={tw`flex flex-row justify-center mb-2 mt-[10px]`}>
                <SmileySVG />
              </View>
              <Text
                style={tw`mb-1 text-base font-bold text-center text-white `}>
                {t('Nothing to see here')}
              </Text>
              <Text
                style={tw`mb-3 text-sm font-bold text-center px-14 text-grey-400`}>
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
      {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) > 0 && (
        <View style={tw`flex flex-row justify-center gap-2 py-3 mb-4`}>
          <TouchableOpacity
            style={tw`w-[6px] h-[6px] rounded-full   ${
              mode === MODE_WEB2 ? 'bg-white' : 'bg-grey-400'
            } ${!allDomain?.web2?.length ? 'hidden' : ''}`}
            onPress={() => setMode(MODE_WEB2)}
          />
          <TouchableOpacity
            style={tw`w-[6px] h-[6px] rounded-full   ${
              mode === MODE_ALL ? 'bg-white' : 'bg-grey-400'
            } ${
              !allDomain?.web3?.length || !allDomain?.web2?.length
                ? 'hidden'
                : ''
            }`}
            onPress={() => setMode(MODE_ALL)}
          />
          <TouchableOpacity
            style={tw`w-[6px] h-[6px] rounded-full   ${
              mode === MODE_WEB3 ? 'bg-white' : 'bg-grey-400'
            } ${!allDomain?.web3?.length ? 'hidden' : ''}`}
            onPress={() => setMode(MODE_WEB3)}
          />
        </View>
      )}

      {!extended && (
        <View style={tw`rounded-xl bg-[#8583EC] pt-4 pb-[10px] pl-4 pr-2 mb-4`}>
          <Text style={tw`mb-2 text-sm font-bold text-grey-900`}>
            {t('Your Hedera ID')}
          </Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type={currentUser.type}
                size="sm"
              />
              <Text style={tw`text-xl font-bold text-black`}>
                {currentUser.accountId}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`w-8 h-8 bg-[#B9B8F4] flex flex-row items-center justify-center rounded-full active:bg-[#a4a2ea]`}
              onPress={() => {
                Clipboard.setString(currentUser.accountId);
              }}>
              <View>
                <ContentCopySVG />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!extended && allDomain?.web2?.length && allDomain?.web3?.length && (
        <View style={tw`mb-4`}>
          <View
            style={tw`flex flex-row gap-[2px] p-1 bg-yellow-500 rounded-t-[4px] w-[250px]`}>
            <BoltSVG />
            <Text style={tw`text-xs font-bold text-black `}>
              {t('200+ extensions available')}
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 rounded-tl-none active:bg-lime-300 bg-lime-500 rounded-xl`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <DomainSVG
                fill="transparent"
                stroke="transparent"
                style={tw`text-black`}
              />
              <Text style={tw`text-base font-bold`}>{t('Get a Domain')}</Text>
            </View>
            <View>
              <ArrowDownSVG
                fill="black"
                style={{transform: [{rotate: '-90deg'}]}}
              />
            </View>
          </View>
        </View>
      )}

      {!extended && (
        <View style={tw`mb-[22px] bg-grey-900 rounded-xl`}>
          <View style={tw`px-3 pt-[18px] font-bold text-sm`}>
            <Text style={tw`text-grey-200`}>{t('Available Tokens')}</Text>
          </View>
          <View>
            <View style={tw`border-b border-grey-800 active:bg-grey-800`}>
              <View
                style={tw`px-3 py-[10px] flex flex-row justify-between items-center`}>
                <View style={tw`py-[5px] flex flex-row gap-3`}>
                  <HbarSVG />
                  <View style={tw`font-bold`}>
                    <Text
                      style={tw`  text-base text-grey-50 mb-[2px] uppercase`}>
                      hbar
                    </Text>
                    <Text style={tw`text-xs text-grey-400`}>
                      ℏ{parseFloat(balance.hbar).toFixed(4)}
                    </Text>
                  </View>
                </View>
                <View style={tw`flex flex-row items-center gap-3`}>
                  <View
                    style={tw`flex flex-row flex-col py-1 font-bold text-right`}>
                    <Text style={tw`text-sm text-grey-50 mb-[6px]`}>
                      {currentUser.currency.symbol}{' '}
                      {parseFloat(balance.amount).toFixed(2)}
                    </Text>
                    <Text style={tw`text-xs text-green-500`}>+1.09%</Text>
                  </View>
                  <View>
                    <ArrowDownSVG
                      fill="#9E9E9E"
                      style={{
                        transform: [{rotate: '-90deg'}],
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={tw`px-3 py-4 rounded-b-xl active:bg-grey-800`}
              onPress={() => setShowTokenMng(true)}>
              <Text style={tw`text-base font-bold text-lime-500`}>
                {t('Manage Tokens')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default DomainSectionScreen;
