import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {
  WelcomeScreen,
  SplashScreen,
  LoginScreen,
  CreateMnemonicScreen,
  CreateWalletScreen,
  WalletPasswordScreen,
  RecoveryWalletScreen,
  SuccessWalletScreen,
  Web2ConfigScreen,
  ConfirmScreen,
  DashboardCompassScreen,
  LoginSmartScreen,
  CreateSmartScreen,
  VerificationScreen,
  DomainDetailScreen,
  DashboardDomainScreen,
  DashboardHistoryScreen,
  CreateNFTScreen,
  DashboardNFTScreen,
  ConnectSiteScreen,
  ConnectionDetailScreen,
  ContactSupportScreen,
  ManageContactScreen,
  PrivateKeyScreen,
  SecretPhraseScreen,
  SettingScreen,
  TermPrivacyScreen,
  DomainSectionDetailScreen,
  DashboardWalletScreen,
  SwapTabScreen,
  GiftSendDetailScreen,
  GiftTokenScreen,
  SendGiftScreen,
  CommentScreen,
  DetailPostViewDesktopScreen,
  DetailPostViewScreen,
  CreatePostNFTScreen,
  PostNFTScreen,
  PostMediaScreen,
  SocialTokenSetupProcessScreen,
  SetupSocialTokenScreen,
  SuccessSocialTokenSetupScreen,
  LoadNFTScreen,
  SmartSetupScreen,
  TopUpBalanceScreen,
  SendHbarScreen,
  SendDetailScreen,
} from 'screens';

const Stack = createStackNavigator();

export type ScreenNames = [
  'WelcomeScreen',
  'LoginScreen',
  'SplashScreen',
  'CreateMnemonicScreen',
  'CreateWalletScreen',
  'WalletPasswordScreen',
  'RecoveryWalletScreen',
  'SuccessWalletScreen',
  'Web2ConfigScreen',
  'ConfirmScreen',
  'DashboardCompassScreen',
  'LoginSmartScreen',
  'CreateSmartScreen',
  'VerificationScreen',
  'DomainDetailScreen',
  'DashboardDomainScreen',
  'DashboardHistoryScreen',
  'CreateNFTScreen',
  'DashboardNFTScreen',
  'ConnectSiteScreen',
  'ConnectionDetailScreen',
  'ContactSupportScreen',
  'ManageContactScreen',
  'PrivateKeyScreen',
  'SecretPhraseScreen',
  'SettingScreen',
  'TermPrivacyScreen',
  'DomainSectionDetailScreen',
  'DashboardWalletScreen',
  'SwapTabScreen',
  'GiftSendDetailScreen',
  'GiftTokenScreen',
  'SendGiftScreen',
  'CommentScreen',
  'DetailPostViewDesktopScreen',
  'DetailPostViewScreen',
  'CreatePostNFTScreen',
  'PostNFTScreen',
  'PostMediaScreen',
  'SocialTokenSetupProcessScreen',
  'SetupSocialTokenScreen',
  'SuccessSocialTokenSetupScreen',
  'LoadNFTScreen',
  'SmartSetupScreen',
  'TopUpBalanceScreen',
  'SendHbarScreen',
  'SendDetailScreen',
]; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
type StackNavigation = StackNavigationProp<RootStackParamList>;

export const useWeb23Navigation = () => {
  const navigation = useNavigation<StackNavigation>();
  return navigation;
};

function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="CreateMnemonicScreen"
          component={CreateMnemonicScreen}
        />
        <Stack.Screen
          name="CreateWalletScreen"
          component={CreateWalletScreen}
        />
        <Stack.Screen
          name="WalletPasswordScreen"
          component={WalletPasswordScreen}
        />
        <Stack.Screen
          name="RecoveryWalletScreen"
          component={RecoveryWalletScreen}
        />
        <Stack.Screen
          name="SuccessWalletScreen"
          component={SuccessWalletScreen}
        />
        <Stack.Screen name="Web2ConfigScreen" component={Web2ConfigScreen} />
        <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
        <Stack.Screen
          name="DashboardCompassScreen"
          component={DashboardCompassScreen}
        />
        <Stack.Screen name="LoginSmartScreen" component={LoginSmartScreen} />
        <Stack.Screen name="CreateSmartScreen" component={CreateSmartScreen} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen
          name="DomainDetailScreen"
          component={DomainDetailScreen}
        />
        <Stack.Screen
          name="DashboardDomainScreen"
          component={DashboardDomainScreen}
        />
        <Stack.Screen
          name="DashboardHistoryScreen"
          component={DashboardHistoryScreen}
        />
        <Stack.Screen name="CreateNFTScreen" component={CreateNFTScreen} />
        <Stack.Screen
          name="DashboardNFTScreen"
          component={DashboardNFTScreen}
        />
        <Stack.Screen name="ConnectSiteScreen" component={ConnectSiteScreen} />
        <Stack.Screen
          name="ConnectionDetailScreen"
          component={ConnectionDetailScreen}
        />
        <Stack.Screen
          name="ContactSupportScreen"
          component={ContactSupportScreen}
        />
        <Stack.Screen
          name="ManageContactScreen"
          component={ManageContactScreen}
        />
        <Stack.Screen name="PrivateKeyScreen" component={PrivateKeyScreen} />
        <Stack.Screen
          name="SecretPhraseScreen"
          component={SecretPhraseScreen}
        />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="TermPrivacyScreen" component={TermPrivacyScreen} />
        <Stack.Screen
          name="DomainSectionDetailScreen"
          component={DomainSectionDetailScreen}
        />
        <Stack.Screen name="SendHbarScreen" component={SendHbarScreen} />

        <Stack.Screen name="SendDetailScreen" component={SendDetailScreen} />
        <Stack.Screen
          name="DashboardWalletScreen"
          component={DashboardWalletScreen}
        />
        <Stack.Screen name="SwapTabScreen" component={SwapTabScreen} />
        <Stack.Screen
          name="GiftSendDetailScreen"
          component={GiftSendDetailScreen}
        />
        <Stack.Screen name="GiftTokenScreen" component={GiftTokenScreen} />
        <Stack.Screen name="SendGiftScreen" component={SendGiftScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen
          name="DetailPostViewDesktopScreen"
          component={DetailPostViewDesktopScreen}
        />
        <Stack.Screen
          name="DetailPostViewScreen"
          component={DetailPostViewScreen}
        />
        <Stack.Screen
          name="CreatePostNFTScreen"
          component={CreatePostNFTScreen}
        />
        <Stack.Screen name="PostNFTScreen" component={PostNFTScreen} />
        <Stack.Screen name="PostMediaScreen" component={PostMediaScreen} />
        <Stack.Screen
          name="SocialTokenSetupProcessScreen"
          component={SocialTokenSetupProcessScreen}
        />
        <Stack.Screen
          name="SetupSocialTokenScreen"
          component={SetupSocialTokenScreen}
        />
        <Stack.Screen
          name="SuccessSocialTokenSetupScreen"
          component={SuccessSocialTokenSetupScreen}
        />
        <Stack.Screen name="LoadNFTScreen" component={LoadNFTScreen} />
        <Stack.Screen name="SmartSetupScreen" component={SmartSetupScreen} />
        <Stack.Screen
          name="TopUpBalanceScreen"
          component={TopUpBalanceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
