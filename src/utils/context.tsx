import type {FC, ReactNode} from 'react';
import {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IContextProvider {
  children: ReactNode;
}

export type UserData = {
  token: string;
  pubKey: string;
  privKey: string;
  mnemonic: string[];
  accountId: string;
  userName: string;
  themeColor: string;
  type: 'initial' | 'icon';
  net: boolean;
  contacts: {
    userName: string;
    accountId: string;
    type: 'initial' | 'icon';
  }[];
  currency: {label: string; symbol: string};
  smart?: boolean;
  smartUid?: string;
};

type Settings = {
  userKeyInfo: string;
  userData: UserData[];
  selectedUser: string;
  godaddyInfo: {gsecret: string; gkey: string};
  language: string;
};

type SettingsContextValue = {
  settings: Settings;
  saveSettings: (update: Settings) => void;
};

export const initialSettings = {
  userKeyInfo: '',
  userData: [
    {
      token: '',
      pubKey: '',
      privKey: '',
      mnemonic: [''],
      accountId: '',
      userName: '',
      themeColor: 'lime',
      type: 'initial' as 'initial' | 'icon',
      net: false,
      smart: false,
      currency: {label: 'USD', symbol: '$'},
      contacts: [
        {
          userName: '',
          accountId: '',
          type: 'initial' as 'initial' | 'icon',
        },
      ],
      smartUid: '',
    },
  ],
  selectedUser: '',
  godaddyInfo: {gsecret: '', gkey: ''},
  language: '',
};

const restoreSettings = async () => {
  let settings = null;
  try {
    let userKeyInfo = await AsyncStorage.getItem('userKeyInfo');
    let userData = await AsyncStorage.getItem('userData');
    let selectedUser = (await AsyncStorage.getItem('selectedUser')) || '';
    let godaddyInfo = (await AsyncStorage.getItem('godaddyInfo')) || '';
    let language = (await AsyncStorage.getItem('language')) || '';

    settings = {
      userKeyInfo:
        userKeyInfo !== null
          ? JSON.parse(userKeyInfo || '')
          : initialSettings.userKeyInfo,
      userData: userData ? JSON.parse(userData) : initialSettings.userData,
      selectedUser: userData
        ? JSON.parse(selectedUser)
        : initialSettings.selectedUser,
      godaddyInfo: godaddyInfo
        ? JSON.parse(godaddyInfo)
        : initialSettings.godaddyInfo,
      language,
    };
  } catch (e) {
    // console.log(e);
  }

  return settings;
};

const storeSettings = async (updatedSettings: Settings) => {
  await AsyncStorage.setItem(
    'userKeyInfo',
    JSON.stringify(updatedSettings.userKeyInfo),
  );
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify(updatedSettings.userData),
  );
  await AsyncStorage.setItem(
    'selectedUser',
    JSON.stringify(updatedSettings.selectedUser),
  );
  await AsyncStorage.setItem(
    'godaddyInfo',
    JSON.stringify(updatedSettings.godaddyInfo),
  );
  await AsyncStorage.setItem('language', updatedSettings.language);
};

const SettingContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
});

const ContextProvider: FC<IContextProvider> = ({children}) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    const asyncRestore = async () => {
      const restored = await restoreSettings();

      if (restored) {
        setSettings(restored);
      }
    };
    asyncRestore();
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingContext.Provider value={{settings, saveSettings}}>
      {children}
    </SettingContext.Provider>
  );
};

export {SettingContext};
export {ContextProvider};
