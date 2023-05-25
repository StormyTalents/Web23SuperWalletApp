import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {Screen} from 'layouts';

import {
  Web23Avatar,
  Web23Button,
  Web23ChooseWallet,
  Web23Popup,
  DashboardActionBar,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import LgHBarSVG from '../../../assets/icons/lg_hbar.svg';
import ArrowDropDownSVG from '../../../assets/icons/arrow_drop_down.svg';
import FilterSVG from '../../../assets/icons/filter_list.svg';
import CircleCheckSVG from '../../../assets/icons/check_circle.svg';
import QRSVG from '../../../assets/icons/QR.svg';
import AddCircleSVG from '../../../assets/icons/control_point.svg';
import ContentCopySVG from '../../../assets/icons/content_copy.svg';

const DashboardNFTScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [showSort, setShowSort] = useState<boolean>(false);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [loading, setLoading] = useState<boolean>(false);
  // const {ToasterBox, showToast} = useToast();
  const [showReceive, setShowReceive] = useState<boolean>(false);
  const [nfts, setNFTs] = useState<
    {
      nft: {
        name: string;
        description: string;
        creator: string;
        category: string;
        img: string;
        token: string;
        attribute: string[];
        external_link: string;
        collection: string;
        alternate_text: string;
      }[];
      type: string;
    }[]
  >([]);
  const [countNFT, setCountNFT] = useState<number>(0);
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const toast = useToast();

  const getNFTs = async () => {
    try {
      setLoading(true);
      const {nfts} = await apiHandler('get_nfts', currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
        net: currentUser.net,
      });

      let count = 0;
      const resNFT = await Promise.all(
        nfts.map(async (nft: any) => {
          const bin = await Promise.all(
            nft.metaData.map(async (ipfs: any) => {
              count++;
              const binData = await axios(`https://ipfs.io/ipfs/${ipfs.meta}`);
              return {
                ...binData.data,
                img: 'https://ipfs.io/ipfs/' + binData.data.img.slice(7),
                token: ipfs.token,
              };
            }),
          );
          return {type: nft.type, nft: bin};
        }),
      );

      setCountNFT(count);
      setNFTs(resNFT);
    } catch (e) {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <>
      <Screen loading={loading}>
        <View style={tw`h-auto`}>
          <View
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between mb-[18px]`}>
            <Text style={tw`text-xl font-bold text-white`}>NFTs</Text>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-2 p-2 bg-grey-900 rounded-3xl active:bg-grey-800`}
              onPress={() => setShowWalletList(true)}>
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type="initial"
                size="sm"
              />
              <ArrowDownSVG fill="#F4F4F4" />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`mb-2 text-sm font-bold text-center uppercase text-grey-400`}>
            {t('total floor value')}
          </Text>
          <View style={tw`flex flex-row justify-center gap-2`}>
            <Text style={tw`mb-2 text-4xl font-bold text-white`}>
              <Text style={tw`text-grey-400`}>$</Text>3,800.12
            </Text>
            <LgHBarSVG />
          </View>
          <View style={tw`flex flex-row justify-center gap-2 mb-6`}>
            <View style={tw`flex flex-row items-center`}>
              <ArrowDropDownSVG style={tw`rotate-180`} fill="#9FDB7B" />
              <Text style={tw`text-xs font-bold text-green-500`}>+1.09%</Text>
            </View>
            <Text style={tw` text-grey-400`}>{t('Past 24 hours')}</Text>
          </View>
          <View style={tw`mb-4`}>
            <Web23Button
              text={t('Receive') + ' NFT'}
              icon={<QRSVG />}
              size="sm"
              iconPosition="left"
              onPress={() => setShowReceive(true)}
            />
          </View>
          <Web23Button
            text={t('Create') + ' NFT'}
            icon={<AddCircleSVG />}
            size="sm"
            iconPosition="left"
            variant="third"
            onPress={() => navigation.navigate('CreateNFTScreen')}
          />
          <View
            style={tw`flex flex-row items-center justify-between px-3 mt-6 mb-4`}>
            <Text style={tw`text-sm font-bold text-grey-200`}>
              {t('Your') + ' NFTs (' + countNFT + ')'}
            </Text>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-10 h-10 rounded-full bg-grey-900`}
              onPress={() => {
                setShowSort(true);
              }}>
              <FilterSVG fill="#9E9E9E" stroke="transparent" />
            </TouchableOpacity>
          </View>
          <View style={tw`     px-3 mb-[28px] min-h-[170px]`}>
            {nfts.map((it, index) =>
              it.nft.map(item => (
                <TouchableOpacity
                  key={`${item.name}_${index}`}
                  style={tw`pt-[14px] pb-1 flex flex-row justify-center`}
                  onPress={() =>
                    navigation.navigate('DetailNFTGalleryScreen', {
                      name: item.name,
                      description: item.description,
                      category: item.category,
                      photo: item.img,
                      token: item.token,
                      attribute: item.attribute,
                      collection: item.collection,
                      external_link: item.external_link,
                      alternate_text: item.alternate_text,
                    })
                  }>
                  <View>
                    <View
                      style={tw`bg-white border rounded-xl w-[150px] h-[150px] mb-1 flex flex-row justify-center items-center`}>
                      <Image
                        source={{uri: item.img}}
                        alt={item.name}
                        style={tw`border rounded-xl`}
                      />
                    </View>
                    <Text
                      style={tw`text-xs font-bold text-center text-grey-400`}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )),
            )}
          </View>
        </View>
        <View style={tw`px-0 pb-0`}>
          <DashboardActionBar selected={2} />
        </View>
      </Screen>
      <Web23Popup
        title={t('Sort') || 'Sort'}
        show={showSort}
        setShow={setShowSort}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800 rounded-t-xl`}>
            <Text>{t('Sort by A-Z')}</Text>
          </View>
          <View style={tw`border-grey-400 border-b-[1px]`} />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800`}>
            <Text>{t('Sort by Z-A')}</Text>
          </View>
          <View style={tw`border-grey-400 border-b-[1px]`} />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800`}>
            <Text>{t('Recently Added')}</Text>
            <CircleCheckSVG fill="#D7FC51" />
          </View>
          <View style={tw`border-grey-400 border-b-[1px]`} />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800`}>
            <Text>{t('Price: Low to High')}</Text>
          </View>
          <View style={tw`border-grey-400 border-b-[1px]`} />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800 rounded-b-xl`}>
            <Text>{t('Price: High to Low')}</Text>
          </View>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button text={t('Apply') || 'Apply'} />
        </View>
      </Web23Popup>

      <Web23Popup
        title={t('Your QR Code') || 'Your QR Code'}
        show={showReceive}
        setShow={() => setShowReceive(false)}>
        <View style={tw`mt-4`}>
          <View style={tw`flex flex-row justify-center`}>
            <View
              style={tw`w-[240px] h-[240px] rounded-[32px] bg-white mb-4 flex flex-row justify-center items-center`}>
              {/* <QRCode
                size={208}
                style={{ height: "auto", maxWidth: "100%", width: "208px" }}
                value={currentUser.accountId}
                viewBox={`0 0 208 208`}
              /> */}
            </View>
          </View>
          <Text style={tw`mb-2 text-xl font-bold text-center text-white`}>
            {currentUser.userName}
          </Text>
          <View style={tw`flex flex-row justify-center`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center gap-1 px-3 py-2 mb-6 bg-grey-800 rounded-3xl`}
              onPress={() => {
                Clipboard.setString(currentUser.accountId);
                toast.show(t('Copied to clipboard') || '');
              }}>
              <Text style={tw`text-sm font-bold text-center text-grey-50`}>
                {currentUser.accountId}
              </Text>
              <ContentCopySVG fill="#F4F4F4" />
            </TouchableOpacity>
          </View>
        </View>
      </Web23Popup>

      <Web23ChooseWallet
        extraOpt={getNFTs}
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />
    </>
  );
};

export default DashboardNFTScreen;
