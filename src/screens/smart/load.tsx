import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen} from 'layouts';

import {ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

const LoadNFTScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [loading, setLoading] = useState<boolean>(false);
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
  const {t} = useTranslation();

  const getNFTs = async () => {
    try {
      setLoading(true);
      const {nfts} = await apiHandler('get_nfts', currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
        net: true,
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
                img: 'https://ipfs.io/ipfs/' + binData.data.image.slice(7),
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
  }, [currentUser]);

  return (
    <Screen loading={loading}>
      <ScreenTitle
        title="Add from Wallet"
        onPress={() => navigation.navigate('SmartSetupScreen')}
      />
      <Text
        style={tw`mt-4 py-[10px] font-bold text-sm text-grey-200 mb-[14px]`}>
        {t('Your') + ' NFTs '} ({countNFT})
      </Text>
      <Text style={tw`font-sm text-grey-400 font-bold mb-4`}>
        {t('NFTs that are posted already have a grey overlay')}
      </Text>
      <View style={tw`mt-4 mb-8`}>
        {nfts.map((it, ind) => (
          <FlatList
            columnWrapperStyle={tw`justify-between`}
            numColumns={2}
            data={it.nft}
            ItemSeparatorComponent={() => <View style={tw`h-2`} />}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={`${item.name}_${ind}_${index}`}
                onPress={() =>
                  index === it.nft.length - 2 &&
                  navigation.navigate('PostNFTScreen', {
                    img: item.img,
                    tokenId: item.token,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    attribute: item.attribute,
                    external_link: item.external_link,
                    collection: item.collection,
                    alternate_text: item.alternate_text,
                  })
                }
                style={tw.style(
                  index === it.nft.length - 2 ? 'opacity-100' : 'opacity-25',
                )}>
                <Image source={{uri: item.img}} alt={item.name} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item + '___' + index}
          />
        ))}
      </View>
    </Screen>
  );
};

export default LoadNFTScreen;
