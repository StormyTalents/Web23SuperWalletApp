import React, {useContext, useEffect} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';

import {Web23Logo} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

const WelcomeScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings, saveSettings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <TouchableOpacity
      onPress={() => {
        try {
          if (
            settings.userData.length > 1 &&
            settings.userData[settings.userData.length - 1].accountId === ''
          ) {
            const newUserData = settings.userData.slice(0, -1);
            saveSettings({...settings, userData: newUserData});
          }
          if (settings.userKeyInfo !== '' && currentUser.accountId !== '') {
            navigation.navigate('LoginScreen');
          } else {
            if (currentUser.accountId && !settings.userKeyInfo) {
              navigation.navigate('WalletPasswordScreen');
            }
            if (currentUser.accountId === '' && settings.userKeyInfo === '') {
              navigation.navigate('SplashScreen');
            }
          }
        } catch (e) {}
      }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`m-auto`}
        style={tw`w-full h-full bg-black`}>
        <View>
          <Web23Logo />
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;
