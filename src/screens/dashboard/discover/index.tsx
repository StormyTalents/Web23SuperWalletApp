import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {
  ScreenTitle,
  Web23Button,
  Web23Popup,
  DashboardActionBar,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import ArrowRightSVG from '../../../assets/icons/arrow_forward.svg';
import PageSVG from '../../../assets/icons/pages.svg';
import Web23SVG from '../../../assets/icons/Web23.svg';
import AddSVG from '../../../assets/icons/add_circle.svg';
import LinkSVG from '../../../assets/icons/link.svg';

const DashboardCompassScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [showSetup, setShowSetup] = useState<boolean>(false);

  return (
    <>
      <Screen>
        <ScreenTitle
          title={t('Discover') || 'Discover'}
          onPress={() => {
            navigation.navigate('LoginSmartScreen');
          }}
        />

        <View style={tw`px-3 h-full flex flex-row justify-center`}>
          <View style={tw`w-full`}>
            <View style={tw`px-3 pt-[18px] pb-4 mx-3 my-4 rounded-xl`}>
              <Text
                style={tw`mb-[10px] text-sm font-bold text-grey-200 text-center`}>
                {t('Smart Pages')}
              </Text>
              <View style={tw`flex flex-row justify-center mb-2`}>
                <PageSVG />
              </View>
              <Text style={tw`font-bold text-base text-white mb-1 text-center`}>
                {t('Smart Pages Setup Incomplete')}
              </Text>
              <Text style={tw`font-bold text-sm text-center mb-3`}>
                {t(
                  'Share and monetize your work with your dedicated community',
                )}
              </Text>
              <Web23Button
                text="Get Started"
                icon={<ArrowRightSVG />}
                size="sm"
                onPress={() => {
                  setShowSetup(true);
                }}
              />
            </View>
            <View style={tw`p-3 mx-3 bg-blue-800 rounded-xl mb-[55px]`}>
              <View style={tw`flex flex-row items-center gap-2 mb-6`}>
                <View>
                  <Text style={tw`mb-1 text-xl font-bold text-white`}>
                    {t('Web3 domains starting at') + ' $3.99'}
                  </Text>
                  <Text style={tw`text-xs font-medium text-grey-50`}>
                    {t(
                      'To get access to the Web3 domains, activate your Hedera wallet',
                    )}
                  </Text>
                </View>
              </View>
              <Web23Button
                text={t('Activate Hedera wallet') || 'Activate Hedera wallet'}
                icon={<ArrowRightSVG />}
                size="sm"
                variant="secondary"
              />
            </View>
          </View>
        </View>
        <View style={tw`px-0 pb-0`}>
          <DashboardActionBar selected={4} />
        </View>
      </Screen>
      <Web23Popup
        title={t('Setup Smart Page') || 'Setup Smart Page'}
        show={showSetup}
        setShow={setShowSetup}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`flex flex-row gap-[14px] px-3 py-4 border-b rounded-t-xl border-grey-800 items-center active:bg-grey-80`}
            onPress={() => {
              navigation.navigate('CreateSmartScreen');
            }}>
            <AddSVG fill="#9E9E9E" />
            <Text style={tw`font-bold text-base text-grey-50`}>
              {t('Create new smart page')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row gap-[14px] px-3 py-4 rounded-b-xl items-center active:bg-grey-80`}
            onPress={() => {
              navigation.navigate('CreateSmartScreen');
            }}>
            <LinkSVG fill="#9E9E9E" />
            <Text style={tw`font-bold text-base text-grey-50`}>
              {t('Link an existing smart page')}
            </Text>
          </TouchableOpacity>
        </View>
      </Web23Popup>
    </>
  );
};

export default DashboardCompassScreen;
