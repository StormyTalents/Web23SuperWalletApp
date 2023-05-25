import React, {useState, useContext} from 'react';
import {View, Text, Image} from 'react-native';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import MoneySVG from '../../../assets/icons/attach_money_black.svg';

const GiftTokenScreen: React.FC<{route: any}> = ({route}) => {
  const {name = '', value = 0, amount = 0, tokenId = ''} = route.params;
  const navigation = useWeb23Navigation();
  const [supply, setSupply] = useState<string>('');
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <Screen>
      <ScreenTitle
        title="Gift tokens"
        onPress={() => navigation.navigate('SmartSetupScreen', {initialTab: 2})}
      />
      <View style={tw`flex items-center justify-center my-4`}>
        <View
          style={tw`flex items-center justify-center w-12 h-12 rounded-2xl bg-grey-900`}>
          <MoneySVG />
        </View>
      </View>
      <Text style={tw`mb-6 text-base font-bold text-center text-grey-200`}>
        How much do you want to top-up?
      </Text>
      <View style={tw`flex justify-center mb-[42px]`}>
        <View style={tw`flex flex-col gap-4 w-[288px]`}>
          <Web23Input
            placeholder="Supply"
            value={supply}
            onChange={e => setSupply(e)}
          />
        </View>
      </View>
      <View
        style={tw`relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl`}>
        <View style={tw`flex items-end justify-between mb-2`}>
          <Text style={tw`text-sm font-bold text-white opacity-70`}>
            {name}
          </Text>
          <View>
            <Image
              source={require('../../../assets/png/perks.png')}
              alt="perks"
            />
          </View>
        </View>
        <View style={tw`flex items-center justify-between`}>
          <View>
            <Text style={tw`font-black text-white text-[48px]`}>{amount}</Text>
            <Text style={tw`mb-4 text-base font-bold text-white`}>Tokens</Text>
            <Text style={tw`text-xs font-bold text-white opacity-50`}>
              Per token: ${value}
            </Text>
          </View>
          <Text
            style={tw`text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]`}>
            {currentUser.userName}
          </Text>
        </View>
        <Text
          style={tw`absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]`}>
          {name}
        </Text>
      </View>
      <Web23Button
        text="Continue to Review"
        onPress={() =>
          navigation.navigate('SendGiftScreen', {name, value, amount, tokenId})
        }
      />
    </Screen>
  );
};

export default GiftTokenScreen;
