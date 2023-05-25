import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {Web23Button, Web23DomainTicker} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import Web23LogoSVG from '../../assets/icons/logo_title.svg';
import GodaddySVG from '../../assets/icons/GoDaddyLG.svg';
import DynadotSVG from '../../assets/icons/Dynadot.svg';
import NameCheapSVG from '../../assets/icons/NameCheap.svg';
import DomainSVG from '../../assets/icons/Domain_md.svg';
import Web3DomainSVG from '../../assets/icons/DomainWeb3_md.svg';
import NFTsMDSVG from '../../assets/icons/NFTs_MD.svg';
import WebSVG from '../../assets/icons/web.svg';
import AirSVG from '../../assets/icons/air.svg';
import MoneySVG from '../../assets/icons/attach_money_md.svg';

const SPLASH_0 = 0;
const SPLASH_1 = 1;
const SPLASH_2 = 2;

const SplashScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const [nextSplash, setNextSplash] = useState<number>(SPLASH_0);
  const {t} = useTranslation();

  return (
    <Screen>
      <View>
        <View style={tw`px-8 pt-6`}>
          <Web23LogoSVG />
        </View>
        {nextSplash === SPLASH_0 && (
          <View style={tw`mt-[72px] mb-12 flex flex-row mx-auto`}>
            <Web23DomainTicker />
          </View>
        )}
        {nextSplash === SPLASH_0 && (
          <View style={tw`flex flex-row items-center justify-center mb-[96px]`}>
            <GodaddySVG />
            <DynadotSVG />
            <NameCheapSVG />
          </View>
        )}
        {nextSplash === SPLASH_1 && (
          <View style={tw`mt-[30px] mb-9`}>
            <View style={tw`flex flex-row justify-center`}>
              <Image source={require('../../assets/icons/nft.png')} alt="nft" />
            </View>
            <View style={tw`flex flex-row justify-center mt-6`}>
              <Image
                source={require('../../assets/icons/nft_footer.png')}
                alt="nft footer"
              />
            </View>
          </View>
        )}
        {nextSplash === SPLASH_2 && (
          <View style={tw`mt-[68px] mb-[110px]`}>
            <View style={tw`flex flex-row justify-center`}>
              <View>
                <Image
                  source={require('../../assets/icons/website_1.png')}
                  alt="website1"
                />
              </View>
            </View>
          </View>
        )}
        <View style={tw`pb-8 bg-grey-900 rounded-2xl px-4`}>
          <View style={tw`pt-6`}>
            <View style={tw`flex flex-row items-center gap-2 py-2`}>
              <View>
                {nextSplash === SPLASH_0 && <DomainSVG />}
                {nextSplash === SPLASH_1 && <NFTsMDSVG />}
                {nextSplash === SPLASH_2 && <WebSVG />}
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {nextSplash === SPLASH_0 &&
                  t('Integrate your Domains from leading providers')}
                {nextSplash === SPLASH_1 &&
                  t('Mint NFTs at costs starting at $1.00 (paid in HBAR)')}
                {nextSplash === SPLASH_2 &&
                  t('Create beautiful websites with  Smart Pages')}
              </Text>
            </View>
          </View>
          <View style={tw`pt-3`}>
            <View style={tw`flex flex-row items-center gap-2 py-2`}>
              <View>
                {nextSplash === SPLASH_0 && <Web3DomainSVG />}
                {nextSplash === SPLASH_1 && <AirSVG />}
                {nextSplash === SPLASH_2 && <MoneySVG />}
              </View>
              <Text style={{...tw`text-base font-bold text-grey-50`}}>
                {nextSplash === SPLASH_0 &&
                  t('Get access to premium Web3 Domains from Web23')}
                {nextSplash === SPLASH_1 &&
                  t('Lowest Carbon Footprint in the entire ecosystem')}
                {nextSplash === SPLASH_2 &&
                  t('Build & grow a community and reward them with your token')}
              </Text>
            </View>
          </View>
          <View style={tw`mt-8`}>
            <Web23Button
              text={t('Continue') || 'Continue'}
              variant="secondary"
              size="sm"
              onPress={() => {
                if (nextSplash < SPLASH_2) {
                  setNextSplash(prev => (prev += 1));
                } else {
                  navigation.navigate('CreateWalletScreen');
                }
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SplashScreen;
