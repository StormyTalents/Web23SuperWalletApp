import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Screen} from 'layouts';

import {ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

const TermPrivacyScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    // window.scroll(0, 0);
  }, []);

  return (
    <Screen>
      <ScreenTitle
        title={t('Terms and Privacy') || 'Terms and Privacy'}
        onPress={() => navigation.navigate('SettingScreen')}
      />
      <View style={tw`px-6 flex justify-center w-full`}>
        <Text style={tw`mt-4 font-bold text-xl text-white mb-3`}>
          {t('Privacy Statement')}
        </Text>
        <Text style={tw`font-medium text-xs text-grey-400 mb-4`}>
          {t(
            'This Privacy Statement describes the privacy practices of Unlabelled for data that we collect: Through the software applications made available by us for use on or through computers and mobile devices (the “Apps”). Through our social media pages that we control from which you are accessing this Privacy Statement (collectively, our “Social Media Pages”). Through HTML-formatted email messages that we send you that link to this Privacy Statement and through your communications with us. Collectively, we refer to the Websites, the Apps and our Social Media Pages, as the “Online Services” and, together with offline channels, the “Services.” By using the Services, you agree to the terms and conditions of this Privacy Statement.',
          )}
        </Text>
        <Text style={tw`font-bold text-xl text-white mb-3`}>
          {t('Collection of Personal Data')}
        </Text>
        <Text style={tw`font-medium text-xs text-grey-400 mb-4`}>
          {t(
            '“Personal Data” are data that identify you as an individual or relate to an identifiable individual. At touch points throughout your guest journey, we sometimes collect Personal Data such as: Email address',
          )}
        </Text>
        <Text style={tw`font-bold text-xl text-white mb-3`}>Cookies</Text>
        <Text style={tw`font-medium text-xs text-grey-400 mb-8`}>
          {t(
            'We collect certain data from cookies, which are pieces of data stored directly on the computer or mobile device that you are using. Cookies allow us to collect data such as browser type, time spent on the Online Services, pages visited, referring URL, language preferences, and other aggregated traffic data. We use the data for security purposes, to facilitate navigation, to display data more effectively, to collect statistical data, to personalize your experience while using the Online Services and to recognize your computer to assist your use of the Online Services. We also gather statistical data about use of the Online Services to continually improve design and functionality, understand how they are used and assist us with resolving questions.',
          )}
        </Text>
      </View>
    </Screen>
  );
};

export default TermPrivacyScreen;
