import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {useWeb23Navigation} from 'navigation';

import WalletSVG from '../../assets/icons/Wallet.svg';
import DomainSVG from '../../assets/icons/Domains.svg';
import NFTSVG from '../../assets/icons/NFTs.svg';
import HistorySVG from '../../assets/icons/History.svg';
import CompassSVG from '../../assets/icons/Compass.svg';

import tw from 'utils/tailwind';

const WALLET = 0;
const DOMAIN = 1;
const NFT = 2;
const HISTORY = 3;
const COMPASS = 4;

const DashboardActionBar: React.FC<{selected?: number}> = ({selected = 0}) => {
  const navigation = useWeb23Navigation();
  return (
    <View style={tw`flex flex-row items-center justify-between bg-grey-900`}>
      <TouchableOpacity
        style={tw.style(
          'p-5   active:bg-grey-50 border-t border-transparent',
          selected === WALLET && 'border-lime-500',
        )}
        onPress={() => navigation.navigate('DashboardWalletScreen')}>
        {selected === WALLET ? (
          <WalletSVG stroke="#D7FC51" fill="transparent" />
        ) : (
          <WalletSVG stroke="#B8B8B8" fill="transparent" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          'p-5   active:bg-grey-50 border-t border-transparent',
          selected === DOMAIN && 'border-lime-500',
        )}
        onPress={() => navigation.navigate('DashboardDomainScreen')}>
        {selected === DOMAIN ? (
          <DomainSVG stroke="#D7FC51" fill="transparent" />
        ) : (
          <DomainSVG stroke="#B8B8B8" fill="transparent" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          'p-5   active:bg-grey-50 border-t border-transparent',
          selected === NFT && 'border-lime-500',
        )}
        onPress={() => navigation.navigate('DashboardNFTScreen')}>
        {selected === NFT ? (
          <NFTSVG stroke="#D7FC51" fill="transparent" />
        ) : (
          <NFTSVG stroke="#B8B8B8" fill="transparent" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          'p-5   active:bg-grey-50 border-t border-transparent',
          selected === HISTORY && 'border-lime-500',
        )}
        onPress={() => navigation.navigate('DashboardHistoryScreen')}>
        {selected === HISTORY ? (
          <HistorySVG stroke="#D7FC51" fill="transparent" />
        ) : (
          <HistorySVG stroke="#B8B8B8" fill="transparent" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          'p-5   active:bg-grey-50 border-t border-transparent',
          selected === COMPASS && 'border-lime-500',
        )}
        onPress={() => navigation.navigate('LoginSmartScreen')}>
        {selected === COMPASS ? (
          <CompassSVG stroke="#D7FC51" fill="transparent" />
        ) : (
          <CompassSVG stroke="#B8B8B8" fill="transparent" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DashboardActionBar;
